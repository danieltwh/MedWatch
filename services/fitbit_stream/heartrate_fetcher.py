import requests

# MongoDB
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import Document, Indexed, init_beanie
from beanie import BulkWriter
from beanie.odm.operators.update.general import Set

# PostgreSQL
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import Patient, HeartRate

import datetime
import time
import asyncio


mongodb_path = 'mongodb://localhost:27020'
postgres_path = "postgresql://user:password@localhost:5455/MedWatchDB"

# Initialise MongoDB Connection
async def init_mongodb():
    # Beanie uses Motor async client under the hood 
    client = AsyncIOMotorClient(mongodb_path)

    # Initialize beanie with the Product document class
    await init_beanie(database=client.medwatch, document_models=[HeartRate])

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

async def update_mongodb(ls, start):
    temp_ls = []

    for heartrate in ls[:]:
        dt = datetime.datetime.strptime(heartrate['time'], "%H:%M:%S").replace(year=start.year, month=start.month, day=start.day)
        curr = HeartRate(patientId=1, time=dt.isoformat(), value=heartrate['value'])
        temp_ls.append(curr)

    async with BulkWriter() as bulk_writer:
        for heartrate in temp_ls:
            await HeartRate \
                .find_one({HeartRate.patientId: heartrate.patientId, HeartRate.time: heartrate.time}) \
                    .upsert(Set({HeartRate.value: heartrate.value}), on_insert=heartrate)
            await bulk_writer.commit()   

async def fetch_user_heartrate(patient_id, patient_access_token, heart_rate_url, start):
    try:
        ls = await get_heartrate(patient_id, patient_access_token, heart_rate_url)
        if ls:
            await update_mongodb(ls, start)
        
    except Exception as err:
        print(f"Error with fetchin patient {patient_id}")
        print(err)


async def fetch_heartrate():
    # end = datetime.datetime.utcnow() + datetime.timedelta(minutes=480)

    end = datetime.datetime.utcnow() + datetime.timedelta(minutes=480) - datetime.timedelta(days=1)

    # end = datetime.datetime(year = 2023, month = 10, day = 15, 
    #                         hour = curr_now.hour, minute=curr_now.minute, second=curr_now.second)
    
    # end = datetime.datetime(year = 2023, month = 10, day = 15, 
    #                     hour = 12, minute=0, second=0)
    
    # end = datetime.datetime.utcnow() + datetime.timedelta(minutes=480) - datetime.timedelta(days=2)

    # end = datetime.datetime.utcnow() + datetime.timedelta(minutes=480)

    start = end - datetime.timedelta(minutes=1)

    # Get the date and specific time
    start_time = start.strftime("%H:%M")
    end_time = end.strftime("%H:%M")

    start_date = start.strftime("%Y-%m-%d")

    print(start_date)
    print(start_time, end_time)

    # Set up the Fitbit Endpoint
    FITBIT_URL = "https://api.fitbit.com"
    heart_rate_url = f"{FITBIT_URL}/1/user/-/activities/heart/date/{start_date}/1d/1sec/time/{start_time}/{end_time}.json"

    postgres = init_postgres()

    patients= postgres.query(Patient).filter(Patient.access_token != "").all()

    del postgres

    tasks = set()
    for patient in patients:
        print( "Patient ID:", patient.id)
        task = asyncio.create_task(fetch_user_heartrate(patient.id, patient.access_token, heart_rate_url, start))
        
        tasks.add(task)


    await asyncio.wait(tasks)


async def main():
    await init_mongodb()
    while True:
        curr_now = datetime.datetime.utcnow() + datetime.timedelta(minutes=480)
        try:
            await fetch_heartrate()
            print(f"{curr_now.isoformat()} - Completed")
        except Exception as err:
            print(f"{curr_now.isoformat()} - Failed to fetch all heartrate")
            print(err)
        finally:
            time.sleep(10)
            # asyncio.sleep(10)

if __name__ == "__main__":
    asyncio.run(main())
        




