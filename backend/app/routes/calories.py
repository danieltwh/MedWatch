from fastapi import APIRouter,  Response, HTTPException, status, Depends
from pydantic import BaseModel

# Other libraries
from typing import Union, List, Tuple
from typing_extensions import Annotated
import json
import datetime

# Models
from app.database.models import DailyCalories, HourlyCalories, MinuteCalories

# Security
from app.security.authentication import oauth2_scheme, Token, Credentials, User, hash_new_password, check_password, generate_token, authenticate_user


router = APIRouter(
    prefix="/calories",
    tags=["Calories"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)

class DailyCaloriesResponse(BaseModel):
    id: int
    date: str
    value: float

class HourlyCaloriesResponse(BaseModel):
    id: int
    time: str
    value: float

class MinuteCaloriesResponse(BaseModel):
    id: int
    time: str
    value: float


@router.get(
    "/daily/{patientId}",
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
                                "date": "2016-04-12",
                                "value": 1985.0
                            },
                            {
                                "id": 1,
                                "date": "2016-04-13",
                                "value": 1797.0
                            }
                        ]
                    }
                }
            },
            "description": """Returns the list of daily calories data for the selected patient""",
        },
    },
)
async def get_daily_calories(patientId: int, user: Annotated[User, Depends(authenticate_user)]) -> List[DailyCaloriesResponse]:
    results = await DailyCalories.find(DailyCalories.patientId == patientId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.patientId,
            "date": result.date,
            "value": result.value
        })

    for d in data:
        d['date'] = datetime.date.fromisoformat(d['date'])
    
    data.sort(key=lambda x: (x['date'], x["id"]))

    for d in data:
        d['date'] = d['date'].isoformat()
    
    resp_body = {
        "data": data
    }

    return Response(content=json.dumps(resp_body), media_type="application/json")

@router.get(
    "/hourly/{patientId}",
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
                                "time": "2016-04-12T00:00:00",
                                "value": 81.0
                            },
                            {
                                "id": 1,
                                "time": "2016-04-12T01:00:00",
                                "value": 61.0
                            }
                        ]
                    }
                }
            },
            "description": """Returns the list of hourly calories data for the selected patient""",
        },
    },
)
async def get_hourly_calories(patientId: int, user: Annotated[User, Depends(authenticate_user)]) -> List[HourlyCaloriesResponse]:
    results = await HourlyCalories.find(HourlyCalories.patientId == patientId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.patientId,
            "time": result.time,
            "value": result.value
        })

    for d in data:
        d['time'] = datetime.datetime.fromisoformat(d['time'])
    
    data.sort(key=lambda x: (x['time'], x["id"]))

    for d in data:
        d['time'] = d['time'].isoformat()
    
    resp_body = {
        "data": data
    }

    return Response(content=json.dumps(resp_body), media_type="application/json")

@router.get(
    "/minute/{patientId}",
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
                                "time": "2016-04-12T00:00:00",
                                "value": 0.786499977111816
                            },
                            {
                                "id": 1,
                                "time": "2016-04-12T00:01:00",
                                "value": 0.786499977111816
                            }
                        ]
                    }
                }
            },
            "description": """Returns the list of minutes calories data for the selected patient""",
        },
    },
)
async def get_minute_calories(patientId: int, user: Annotated[User, Depends(authenticate_user)]) -> List[MinuteCaloriesResponse]:
    results = await MinuteCalories.find(MinuteCalories.patientId == patientId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.patientId,
            "time": result.time,
            "value": result.value
        })

    for d in data:
        d['time'] = datetime.datetime.fromisoformat(d['time'])
    
    data.sort(key=lambda x: (x['time'], x["id"]))

    for d in data:
        d['time'] = d['time'].isoformat()
    
    resp_body = {
        "data": data
    }

    return Response(content=json.dumps(resp_body), media_type="application/json")