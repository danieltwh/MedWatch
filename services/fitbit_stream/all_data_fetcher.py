import requests

# MongoDB
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import Document, Indexed, init_beanie
from beanie import BulkWriter
from beanie.odm.operators.update.general import Set

# PostgreSQL
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import Patient, HeartRate, MinuteCalories, MinuteStep

import datetime
import time
import asyncio


FITBIT_URL = "https://api.fitbit.com"
mongodb_path = 'mongodb://localhost:27020'
postgres_path = "postgresql://user:password@localhost:5455/MedWatchDB"

# Initialise MongoDB Connection
async def init_mongodb():
    # Beanie uses Motor async client under the hood 
    client = AsyncIOMotorClient(mongodb_path)

    # Initialize beanie with the Product document class
    await init_beanie(database=client.medwatch, document_models=[
        HeartRate,
        MinuteCalories,
        MinuteStep
        ])

# Initialise PostgreSQL Connection
engine = create_engine(
    postgres_path
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_postgres():
    postgres = SessionLocal()
    try:
        return postgres
    finally:
        postgres.close()



async def get_heartrate(patient_id, access_token, heart_rate_url):
    headers = {
        'Authorization': f"Bearer {access_token}"
        # 'Authorization': f"Bearer {expired_token}"
    }

    resp = requests.get(
        heart_rate_url,
        headers=headers
    )
    data = resp.json()
    if(resp.status_code == 401 and not data['success'] and data['errors'][0]['errorType'] == 'expired_token'):
        print(f"Token expired for patient {patient_id}")
        return 
    
    heartrates = data['activities-heart-intraday']['dataset']

    return heartrates

async def query_fitbit(patient_id, access_token, data_url):
    headers = {
        'Authorization': f"Bearer {access_token}"
        # 'Authorization': f"Bearer {expired_token}"
    }

    resp = requests.get(
        data_url,
        headers=headers
    )
    data = resp.json()
    if(resp.status_code == 401 and not data['success'] and data['errors'][0]['errorType'] == 'expired_token'):
        print(f"Token expired for patient {patient_id}")
        return 
    
    return data



async def update_mongodb(patient_id, ls, start, DataClass):
    temp_ls = []

    for data in ls[:]:
        dt = datetime.datetime.strptime(data['time'], "%H:%M:%S").replace(year=start.year, month=start.month, day=start.day)
        # print(patient_id, dt, data['value'])
        curr = DataClass(patientId=patient_id, time=dt.isoformat(), value=data['value'])
        # curr = MinuteCalories(patientId = patient_id, time = dt.isoformat(), value=data['value'])
        # curr = MinuteCalories(patientId=1, time="00:50:00", value=0.86)
        # print('here')
        temp_ls.append(curr)

    

    async with BulkWriter() as bulk_writer:
        for  dataClass in temp_ls:
            await DataClass \
                .find_one({DataClass.patientId: dataClass.patientId, DataClass.time: dataClass.time}) \
                    .upsert(Set({DataClass.value: dataClass.value}), on_insert=dataClass)
            await bulk_writer.commit()   


async def update_mongodb_heartrate(patient_id, ls, start, DataClass):
    temp_ls = []

    for data in ls[:]:
        dt = datetime.datetime.strptime(data['time'], "%H:%M:%S").replace(year=start.year, month=start.month, day=start.day)
        # print(patient_id, dt, data['value'])
        curr = DataClass(patientId=patient_id, time=dt.isoformat(), value=data['value'], isAnomaly = "False")
        # curr = MinuteCalories(patientId = patient_id, time = dt.isoformat(), value=data['value'])
        # curr = MinuteCalories(patientId=1, time="00:50:00", value=0.86)
        # print('here')
        temp_ls.append(curr)

    

    async with BulkWriter() as bulk_writer:
        for  dataClass in temp_ls:
            await DataClass \
                .find_one({DataClass.patientId: dataClass.patientId, DataClass.time: dataClass.time}) \
                    .upsert(Set({DataClass.value: dataClass.value}), on_insert=dataClass)
            await bulk_writer.commit() 


async def fetch_user_calories(patient_id, patient_access_token, data_url, start):
    try:
        data = await query_fitbit(patient_id, patient_access_token, data_url)

        ls = data['activities-calories-intraday']['dataset']

        if ls:
            await update_mongodb(patient_id, ls, start, MinuteCalories)
        
    except Exception as err:
        print(f"Error with fetching patient {patient_id}")
        print(err)

async def fetch_user_steps(patient_id, patient_access_token, data_url, start):
    try:
        data = await query_fitbit(patient_id, patient_access_token, data_url)

        ls = data['activities-steps-intraday']['dataset']

        if ls:
            await update_mongodb(patient_id, ls, start, MinuteStep)
        
    except Exception as err:
        print(f"Error with fetching patient {patient_id}")
        print(err)


async def fetch_user_heartrate(patient_id, patient_access_token, data_url, start):
    try:
        data = await query_fitbit(patient_id, patient_access_token, data_url)

        ls = data['activities-heart-intraday']['dataset']

        if ls:
            await update_mongodb_heartrate(patient_id, ls, start, HeartRate)
        
    except Exception as err:
        print(f"Error with fetching patient {patient_id}")
        print(err)


async def fetch_health_data():
    # end = datetime.datetime.utcnow() + datetime.timedelta(minutes=480)

    end = datetime.datetime.utcnow() + datetime.timedelta(minutes=480) - datetime.timedelta(days=1)

    start = end - datetime.timedelta(minutes=1)

    # Get the date and specific time
    start_time = start.strftime("%H:%M")
    end_time = end.strftime("%H:%M")

    start_date = start.strftime("%Y-%m-%d")

    print(start_date)
    # print(start_time, end_time)

    # Set up the Fitbit Endpoint
    
    
    # heart_rate_url = f"{FITBIT_URL}/1/user/-/activities/heart/date/{start_date}/1d/1sec.json"
    # heart_rate_url = f"{FITBIT_URL}/1/user/-/activities/heart/date/{start_date}/1d/1sec/time/{start_time}/{end_time}.json"
    heart_rate_url = f"{FITBIT_URL}/1/user/-/activities/heart/date/{start_date}/1d/1sec.json"

    # calories_url = f"{FITBIT_URL}/1/user/-/activities/calories/date/{start_date}/1d/1min/time/{start_time}/{end_time}.json"
    calories_url = f"{FITBIT_URL}/1/user/-/activities/calories/date/{start_date}/1d/1min.json"

    steps_url = f"{FITBIT_URL}/1/user/-/activities/steps/date/{start_date}/1d/1min.json"

    postgres = init_postgres()

    patients= postgres.query(Patient).filter(Patient.access_token != "").all()

    del postgres

    tasks = set()
    for patient in patients:
        print( "Patient ID:", patient.id)
        task_calories = asyncio.create_task(fetch_user_calories(patient.id, patient.access_token, calories_url, start))
        tasks.add(task_calories)

        task_steps = asyncio.create_task(fetch_user_steps(patient.id, patient.access_token, steps_url, start))
        tasks.add(task_steps)

        task_heart = asyncio.create_task(fetch_user_heartrate(patient.id, patient.access_token, heart_rate_url, start))
        tasks.add(task_heart)

    await asyncio.wait(tasks)


async def main():
    await init_mongodb()
    # while True:
    #     curr_now = datetime.datetime.utcnow() + datetime.timedelta(minutes=480)
    #     try:
    #         await fetch_heartrate()
    #         print(f"{curr_now.isoformat()} - Completed")
    #     except Exception as err:
    #         print(f"{curr_now.isoformat()} - Failed to fetch all heartrate")
    #         print(err)
    #     finally:
    #         time.sleep(10)
    #         # asyncio.sleep(10)

    curr_now = datetime.datetime.utcnow() + datetime.timedelta(minutes=480)
    try:
        await fetch_health_data()
        print(f"{curr_now.isoformat()} - Completed")
    except Exception as err:
        print(f"{curr_now.isoformat()} - Failed to fetch all heartrate")
        print(err)

if __name__ == "__main__":
    asyncio.run(main())
        




