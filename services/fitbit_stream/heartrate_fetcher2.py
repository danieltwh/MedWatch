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
import json

import numpy as np

MEDWATCH_URL = "http://localhost:5050"

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

async def trigger_heartrate_detection(patient_id, new_heartrate_ls):
    heart_rate_anomaly_url = f"{MEDWATCH_URL}/anomaly_detection/{patient_id}"


# async def get_mean_and_std(patiend_id):
#     results = await HeartRate.find(HeartRate.patientId == patiend_id).to_list()
#     if len(results) > 360:
#         results = results[-360: ]
#     print(f'Results: {results}')

#     data = []
#     new_data = []
#     for result in results:
#         if result.value > 0:
#             data.append(result.value)


#     mean = np.mean(data)
#     std_dev = np.std(data)

#     return (mean, std_dev)

async def send_email(patient_id):
    email_url = f"{MEDWATCH_URL}/email/patient/{patient_id}"

    requests.get(email_url)

async def send_new_heartrate(patient_id, new_heart_rate):
    new_heart_rate_url = f"{MEDWATCH_URL}/anomaly_detection/{patient_id}"

    data = []

    for heartrate in new_heart_rate:
        data.append({
            "patientId": heartrate.patientId,
            "time": heartrate.time,
            "value": heartrate.value,
            "isAnomaly": heartrate.isAnomaly
        })

    print(data)
    resp = requests.post(
        url=new_heart_rate_url,
        # json = json.dumps(new_heart_rate)
        # json=json.dumps(data)
        json=data
    )

    # print(resp)
    # print(resp.json())


async def update_mongodb(patient_id, ls, start):
    # mean, std_dev = await get_mean_and_std(patient_id)
    # thresold = 2

    # contains_anomaly = False

    temp_ls = []

    for heartrate in ls[:]:
        # dt = datetime.datetime.strptime(heartrate['time'], "%H:%M:%S").replace(year=start.year, month=start.month, day=start.day)
        # z_score =(heartrate['value'] - mean) / std_dev
        # isAnomaly = z_score > thresold
        curr = HeartRate(patientId=patient_id, time=heartrate['time'].isoformat(), value=heartrate['value'], 
                        #  isAnomaly= "True" if ("isAnomaly" in heartrate) else "False" 
                         isAnomaly= "False"
                         )
        temp_ls.append(curr)

        # if isAnomaly:
        #     contains_anomaly = True

    async with BulkWriter() as bulk_writer:
        for heartrate in temp_ls:
            await HeartRate \
                .find_one({HeartRate.patientId: heartrate.patientId, HeartRate.time: heartrate.time}) \
                    .upsert(Set({HeartRate.value: heartrate.value}), on_insert=heartrate)
            await bulk_writer.commit()   
    
    await send_new_heartrate(patient_id, temp_ls)
    
    # if contains_anomaly:
    #     print('Sending email')
    #     send_email(patient_id)




async def fetch_user_heartrate(patient_id, patient_access_token, heart_rate_url, start):
    try:
        # ls = await get_heartrate(patient_id, patient_access_token, heart_rate_url)

        ls2 = [
           {
                "time": "06:45:54",
                "value": 70
            },
            {
                "time": "06:46:09",
                "value": 70
            },
            {
                "time": "06:46:19",
                "value": 80
            },
            {
                "time": "06:46:24",
                "value": 86
            },
            {
                "time": "06:46:29",
                "value": 87
            },
            {
                "time": "06:46:34",
                "value": 88
            },
            {
                "time": "06:46:39",
                "value": 93
            },
            {
                "time": "06:46:44",
                "value": 94
            },
            {
                "time": "06:46:59",
                "value": 91
            },
            {
                "time": "06:47:04",
                "value": 90
            },
            {
                "time": "06:47:19",
                "value": 90
            },
            {
                "time": "06:47:34",
                "value": 91
            },
            {
                "time": "06:47:44",
                "value": 91
            },
            {
                "time": "06:47:54",
                "value": 90
            },
            {
                "time": "06:48:09",
                "value": 89
            },
            {
                "time": "06:48:14",
                "value": 88
            },
            {
                "time": "06:48:29",
                "value": 88
            },
            {
                "time": "06:48:34",
                "value": 87
            },
            {
                "time": "06:48:44",
                "value": 130,
                "isAnomaly": "True"
            },
            {
                "time": "06:48:54",
                "value": 132,
                "isAnomaly": "True"
            },
            {
                "time": "06:48:59",
                "value": 135,
                "isAnomaly": "True"
            },
            {
                "time": "06:49:14",
                "value": 131, 
                "isAnomaly": "True"
            },
            {
                "time": "06:49:29",
                "value": 134,
                "isAnomaly": "True"
            },
            {
                "time": "06:49:44",
                "value": 132,
                "isAnomaly": "True"
            },
            {
                "time": "06:49:59",
                "value": 110,
                "isAnomaly": "True"
            },
            {
                "time": "06:50:14",
                "value": 90
            },
            {
                "time": "06:50:19",
                "value": 84
            },
            {
                "time": "06:50:24",
                "value": 85
            },
            {
                "time": "06:50:29",
                "value": 86
            },
            {
                "time": "06:50:39",
                "value": 85
            },
            {
                "time": "06:50:44",
                "value": 86
            },
            {
                "time": "06:50:54",
                "value": 87
            },
            {
                "time": "06:50:59",
                "value": 86
            },
            {
                "time": "06:51:05",
                "value": 85
            },
            {
                "time": "06:51:20",
                "value": 85
            },
            {
                "time": "06:51:35",
                "value": 85
            },
            {
                "time": "06:51:45",
                "value": 87
            },
            {
                "time": "06:51:50",
                "value": 91
            },
            {
                "time": "06:52:00",
                "value": 90
            },
            {
                "time": "06:52:05",
                "value": 89
            },
            {
                "time": "06:52:10",
                "value": 91
            },
            {
                "time": "06:52:15",
                "value": 91
            },
            {
                "time": "06:52:20",
                "value": 94
            },
            {
                "time": "06:52:25",
                "value": 97
            },
            {
                "time": "06:52:30",
                "value": 103
            },
            {
                "time": "06:52:35",
                "value": 110
            },
            {
                "time": "06:52:40",
                "value": 111
            },
            {
                "time": "06:52:45",
                "value": 112
            },
            {
                "time": "06:52:55",
                "value": 113
            },
            {
                "time": "06:53:00",
                "value": 114
            },
            {
                "time": "06:53:05",
                "value": 116
            },
            {
                "time": "06:53:10",
                "value": 115
            },
            {
                "time": "06:53:15",
                "value": 113
            },
            {
                "time": "06:53:25",
                "value": 110
            },
            {
                "time": "06:53:30",
                "value": 107
            },
            {
                "time": "06:53:35",
                "value": 105
            },
            {
                "time": "06:53:40",
                "value": 103
            },
            {
                "time": "06:53:45",
                "value": 102
            },
            {
                "time": "06:53:50",
                "value": 99
            },
            {
                "time": "06:53:55",
                "value": 97
            },
            {
                "time": "06:54:00",
                "value": 95
            },
            {
                "time": "06:54:05",
                "value": 94
            },
            {
                "time": "06:54:10",
                "value": 89
            },
            {
                "time": "06:54:15",
                "value": 87
            },
            {
                "time": "06:54:30",
                "value": 87
            },
            {
                "time": "06:54:45",
                "value": 89
            },
            {
                "time": "06:54:50",
                "value": 90
            },
            {
                "time": "06:54:55",
                "value": 87
            },
            {
                "time": "06:55:00",
                "value": 83
            },
            {
                "time": "06:55:10",
                "value": 84
            },
            {
                "time": "06:55:15",
                "value": 85
            },
            {
                "time": "06:55:20",
                "value": 86
            },
            {
                "time": "06:55:35",
                "value": 90
            },
            {
                "time": "06:55:40",
                "value": 92
            },
            {
                "time": "06:55:45",
                "value": 89
            },
            {
                "time": "06:55:50",
                "value": 88
            },
            {
                "time": "06:56:00",
                "value": 88
            },
            {
                "time": "06:56:05",
                "value": 89
            },
            {
                "time": "06:56:10",
                "value": 90
            },
            {
                "time": "06:56:15",
                "value": 92
            },
            {
                "time": "06:56:25",
                "value": 95
            },
            {
                "time": "06:56:30",
                "value": 96
            },
            {
                "time": "06:56:35",
                "value": 97
            },
            {
                "time": "06:56:40",
                "value": 96
            },
            {
                "time": "06:56:55",
                "value": 96
            },
            {
                "time": "06:57:05",
                "value": 92
            },
            {
                "time": "06:57:10",
                "value": 91
            },
            {
                "time": "06:57:15",
                "value": 91
            },
            {
                "time": "06:57:25",
                "value": 90
            },
            {
                "time": "06:57:35",
                "value": 91
            },
            {
                "time": "06:57:50",
                "value": 91
            },
            {
                "time": "06:57:55",
                "value": 95
            },
            {
                "time": "06:58:00",
                "value": 96
            },
            {
                "time": "06:58:05",
                "value": 96
            },
            {
                "time": "06:58:10",
                "value": 95
            },
            {
                "time": "06:58:20",
                "value": 93
            },
            {
                "time": "06:58:25",
                "value": 92
            },
            {
                "time": "06:58:30",
                "value": 92
            },
            {
                "time": "06:58:35",
                "value": 91
            },
            {
                "time": "06:58:40",
                "value": 88
            },
            {
                "time": "06:58:45",
                "value": 86
            },
            {
                "time": "06:58:50",
                "value": 84
            },
            {
                "time": "06:58:55",
                "value": 83
            },
            {
                "time": "06:59:10",
                "value": 83
            },
        ]
        
        ls = []

        for i in range(30):
            ls.append({
                "time": start + datetime.timedelta(seconds= 10 * i),
                "value": ls2[i]['value']
            })

        if ls:
            await update_mongodb(patient_id, ls, start)
        
    except Exception as err:
        print(f"Error with fetching patient {patient_id}")
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

    start = end - datetime.timedelta(minutes=5)

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
        await fetch_heartrate()
        print(f"{curr_now.isoformat()} - Completed")
    except Exception as err:
        print(f"{curr_now.isoformat()} - Failed to fetch all heartrate")
        print(err)

if __name__ == "__main__":
    asyncio.run(main())
        




