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
    curr_now = datetime.datetime.utcnow() + datetime.timedelta(minutes=480) - datetime.timedelta(days=1)

    start_time = curr_now.replace(hour=0, minute=00, second=1)
    end_time = curr_now.replace(hour=23, minute=59, second=59)

    results = await MinuteCalories.find(
        MinuteCalories.patientId == patientId,
        MinuteCalories.time >= start_time.isoformat(),
        MinuteCalories.time <= end_time.isoformat()
        ).to_list()

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
    "/minute/{patientId}/{detail_level}",
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
async def get_minute_calories_detail(patientId: int, detail_level: str, user: Annotated[User, Depends(authenticate_user)]) -> List[MinuteCaloriesResponse]:
    curr_now = datetime.datetime.utcnow() + datetime.timedelta(minutes=480) - datetime.timedelta(days=1)

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

    results = await MinuteCalories.find(
        MinuteCalories.patientId == patientId,
        MinuteCalories.time >= start_time.isoformat(),
        MinuteCalories.time <= end_time.isoformat()
        ).to_list()

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
    "/total/{patientId}/",
    response_model=List[str],
    tags=["Health Data"],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "id": 1,
                        "time": "2016-04-12T00:00:00",
                        "value": 0.786499977111816
                    }
                }
            },
            "description": """Returns the total calories burned for the selected patient today""",
        },
    },
)
async def get_total_calories_today(patientId: int, user: Annotated[User, Depends(authenticate_user)]) -> List[MinuteCaloriesResponse]:
    curr_now = datetime.datetime.utcnow() + datetime.timedelta(minutes=480) - datetime.timedelta(days=1)


    start_time = curr_now.replace(hour=0, minute=0, second=0, microsecond=0)
    end_time = curr_now

    results = await MinuteCalories.find(
        MinuteCalories.patientId == patientId,
        MinuteCalories.time >= start_time.isoformat(),
        MinuteCalories.time <= end_time.isoformat()
        ).to_list()

    totalCalories = 0
    for result in results:
        # data.append({
        #     "id": result.patientId,
        #     "time": result.time,
        #     "value": result.value
        # })
        totalCalories += result.value

    # Round to the nearest integer
    totalCalories = round(totalCalories)

    resp_body = {
        "id": patientId,
        "time": end_time.isoformat(),
        "value": totalCalories
    }

    return Response(content=json.dumps(resp_body), media_type="application/json")