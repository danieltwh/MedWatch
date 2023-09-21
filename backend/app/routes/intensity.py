from fastapi import APIRouter,  Response, HTTPException, status
from pydantic import BaseModel

# Other libraries
from typing import Union, List
import json
import datetime

# Models
from app.database.models import DailyIntensity, HourlyIntensity, MinuteIntensity

router = APIRouter(
    prefix="/intensity",
    tags=["Intensity"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)

class DailyIntensityResponse(BaseModel):
    id: int
    date: str
    sedentary_minute: int
    lightly_active_minute: int
    fairly_active_minute: int
    very_active_minute: int
    sedentary_active_distance: int
    light_active_distance: int
    moderately_active_distance: int
    very_active_distance: int

class HourlyIntensityResponse(BaseModel):
    id: int
    time: str
    total_intensity: int
    average_intensity: int

class MinuteIntensityResponse(BaseModel):
    id: int
    time: str
    intensity: int


@router.get(
    "/daily/{userId}",
    response_model=List[str],
    tags=["Health Data"],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "Users": [{"time": 0, "value": 97}, {"time": 0, "value": 102}]
                    }
                }
            },
            "description": """Returns the list of daily intensity data for the selected user""",
        },
    },
)
async def get_daily_intensity(userId: int) -> List[DailyIntensityResponse]:
    results = await DailyIntensity.find(DailyIntensity.userId == userId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.userId,
            "date": result.date,
            "sedentary_minute": result.sedentary_minute,
            "lightly_active_minute": result.lightly_active_minute,
            "fairly_active_minute": result.fairly_active_minute,
            "very_active_minute": result.very_active_minute,
            "sedentary_active_distance": result.sedentary_active_distance,
            "light_active_distance": result.light_active_distance,
            "moderately_active_distance": result.moderately_active_distance,
            "very_active_distance": result.very_active_distance
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
    "/hourly/{userId}",
    response_model=List[str],
    tags=["Health Data"],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "Users": [{"id": 159382, "time": "2016-12-04T07:21:00", "intensity": 0}, 
                                  {"id": 159382, "time": "2016-12-04T08:21:00", "intensity": 1}]
                    }
                }
            },
            "description": """Returns the list of hourly intensity data for the selected user""",
        },
    },
)
async def get_hourly_intensity(userId: int) -> List[HourlyIntensityResponse]:
    results = await HourlyIntensity.find(HourlyIntensity.userId == userId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.userId,
            "time": result.time,
            "total_intensity": result.total_intensity,
            "average_intensity": result.average_intensity
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
    "/minute/{userId}",
    response_model=List[str],
    tags=["Health Data"],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "Users": [{"id": 159382, "time": "2016-12-04T07:21:00", "intensity": 0}, 
                                  {"id": 159382, "time": "2016-12-04T07:22:00", "intensity": 1}]
                    }
                }
            },
            "description": """Returns the list of intensity data by minute for the selected user""",
        },
    },
)
async def get_minute_intensity(userId: int) -> List[MinuteIntensityResponse]:
    results = await MinuteIntensity.find(MinuteIntensity.userId == userId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.userId,
            "time": result.time,
            "intensity": result.intensity,
        })

    data.sort(key=lambda x: datetime.datetime.fromisoformat(x['time']))
    
    resp_body = {
        "data": data
    }

    return Response(content=json.dumps(resp_body), media_type="application/json")

