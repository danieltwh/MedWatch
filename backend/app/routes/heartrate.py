from fastapi import APIRouter,  Response, HTTPException, status, Depends
from pydantic import BaseModel

# Other libraries
from typing import Union, List, Tuple
from typing_extensions import Annotated
import json
import datetime
import os

# Models
from app.database.models import HeartRate

# Security
from app.security.authentication import oauth2_scheme, Token, Credentials, User, hash_new_password, check_password, generate_token, authenticate_user


router = APIRouter(
    prefix="/heartrate",
    tags=["Heart Rate"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)

class HeartRateResponse(BaseModel):
    id: int
    time: str
    value: float
    isAnomaly: bool


@router.get(
    "/{patientId}",
    response_model=List[str],
    tags=["Health Data"],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "data": [
                            {
                                "id": 1,
                                "time": "2016-04-12T07:21:00",
                                "value": 97.0
                            },
                            {
                                "id": 1,
                                "time": "2016-04-12T07:21:05",
                                "value": 102.0
                            }
                        ]
                    }
                }
            },
            "description": """Returns heartrate details for the patient""",
        },
    },
)
async def get_heartrate(patientId: int, user: Annotated[User, Depends(authenticate_user)]) -> List[HeartRateResponse]:
    results = await HeartRate.find(HeartRate.patientId == patientId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.patientId,
            "time": result.time,
            "value": result.value,
            "isAnomaly": result.isAnomaly
        })

    for d in data:
        # d['time'] = datetime.datetime.strptime(d['time'], "%d/%m/%Y %I:%M:%S %p")
        d['time'] = datetime.datetime.fromisoformat(d['time'])
    
    data.sort(key=lambda x: (x['time'], x["id"]))

    for d in data:
        d['time'] = d['time'].isoformat()
    
    resp_body = {
        "data": data
    }

    return Response(content=json.dumps(resp_body), media_type="application/json")


@router.get(
    "/{patientId}/{detail_level}",
    response_model=List[str],
    tags=["Health Data"],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "data": [
                            {
                                "id": 1,
                                "time": "2016-04-12T07:21:00",
                                "value": 97.0
                            },
                            {
                                "id": 1,
                                "time": "2016-04-12T07:21:05",
                                "value": 102.0
                            }
                        ]
                    }
                }
            },
            "description": """Returns heartrate details for the patient""",
        },
    },
)
async def get_heartrate_hour(patientId: int, detail_level: str, user: Annotated[User, Depends(authenticate_user)]) -> List[HeartRateResponse]:
    # curr_now = datetime.datetime.utcnow() + datetime.timedelta(minutes=480)

    curr_now = datetime.datetime.utcnow() + datetime.timedelta(minutes=480) - datetime.timedelta(days=1)

    # curr_now = datetime.datetime(year=2023, month=10, day=15, hour = 12, minute=0, second=0)


    switcher = {
        "1min": 1,
        "3min": 3,
        "5min": 5,
        "10min": 10,
        "30min": 30,
        "1hour": 60,
        "Today": 1440,
    }

    if detail_level not in switcher:
        raise HTTPException(400, detail="Invalid detail level")

    num_minutes = switcher.get(detail_level)
    
    start_time = curr_now - datetime.timedelta(minutes=num_minutes)
    end_time = curr_now
    print(start_time, )
    results = await HeartRate.find(
            HeartRate.patientId == patientId,
            HeartRate.time >= start_time.isoformat(),
            HeartRate.time <= end_time.isoformat()
            ).to_list()


    data = []
    for result in results:
        data.append({
            "id": result.patientId,
            "time": result.time,
            "value": result.value,
            "isAnomaly": result.isAnomaly
        })

    for d in data:
        # d['time'] = datetime.datetime.strptime(d['time'], "%d/%m/%Y %I:%M:%S %p")
        d['time'] = datetime.datetime.fromisoformat(d['time'])
    
    data.sort(key=lambda x: (x['time'], x["id"]))

    for d in data:
        d['time'] = d['time'].isoformat()
    
    resp_body = {
        "data": data
    }

    return Response(content=json.dumps(resp_body), media_type="application/json")