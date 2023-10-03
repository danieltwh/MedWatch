from fastapi import APIRouter,  Response, HTTPException, status, Depends
from pydantic import BaseModel

# Other libraries
from typing import Union, List, Tuple
from typing_extensions import Annotated
import json
import datetime

# Models
from app.database.models import DailyIntensity, HourlyIntensity, MinuteIntensity

# Security
from app.security.authentication import oauth2_scheme, Token, Credentials, User, hash_new_password, check_password, generate_token, authenticate_user

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
    sedentary_minute: float
    lightly_active_minute: float
    fairly_active_minute: float
    very_active_minute: float
    sedentary_active_distance: float
    light_active_distance: float
    moderately_active_distance: float
    very_active_distance: float

class HourlyIntensityResponse(BaseModel):
    id: int
    time: str
    total_intensity: float
    average_intensity: float

class MinuteIntensityResponse(BaseModel):
    id: int
    time: str
    intensity: int

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
                                "sedentary_minute": 728.0,
                                "lightly_active_minute": 328.0,
                                "fairly_active_minute": 13.0,
                                "very_active_minute": 25.0,
                                "sedentary_active_distance": 0.0,
                                "light_active_distance": 6.05999994277954,
                                "moderately_active_distance": 0.550000011920929,
                                "very_active_distance": 1.87999999523163
                            },
                            {
                                "id": 1,
                                "date": "2016-04-13",
                                "sedentary_minute": 776.0,
                                "lightly_active_minute": 217.0,
                                "fairly_active_minute": 19.0,
                                "very_active_minute": 21.0,
                                "sedentary_active_distance": 0.0,
                                "light_active_distance": 4.71000003814697,
                                "moderately_active_distance": 0.689999997615814,
                                "very_active_distance": 1.57000005245209
                            }
                        ]
                    }
                }
            },
            "description": """Returns the list of daily intensity data for the selected patient""",
        },
    },
)
async def get_daily_intensity(patientId: int, user: Annotated[User, Depends(authenticate_user)]) -> List[DailyIntensityResponse]:
    results = await DailyIntensity.find(DailyIntensity.patientId == patientId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.patientId,
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
                                "total_intensity": 20.0,
                                "average_intensity": 0.333333
                            },
                            {
                                "id": 1,
                                "time": "2016-04-12T01:00:00",
                                "total_intensity": 8.0,
                                "average_intensity": 0.133333
                            }
                        ]
                    }
                }
            },
            "description": """Returns the list of hourly intensity data for the selected patient""",
        },
    },
)
async def get_hourly_intensity(patientId: int, user: Annotated[User, Depends(authenticate_user)]) -> List[HourlyIntensityResponse]:
    results = await HourlyIntensity.find(HourlyIntensity.patientId == patientId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.patientId,
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
    "/minute/{patientId}",
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
async def get_minute_intensity(patientId: int, user: Annotated[User, Depends(authenticate_user)]) -> List[MinuteIntensityResponse]:
    results = await MinuteIntensity.find(MinuteIntensity.patientId == patientId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.patientId,
            "time": result.time,
            "intensity": result.intensity,
        })

    data.sort(key=lambda x: datetime.datetime.fromisoformat(x['time']))
    
    resp_body = {
        "data": data
    }

    return Response(content=json.dumps(resp_body), media_type="application/json")

