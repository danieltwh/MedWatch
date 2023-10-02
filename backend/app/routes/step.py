from fastapi import APIRouter,  Response, HTTPException, status, Depends
from pydantic import BaseModel

# Other libraries
from typing import Union, List, Tuple
from typing_extensions import Annotated
import json
import datetime

# Models
from app.database.models import HourlyStep, DailyStep, MinuteStep

# Security
from app.security.authentication import oauth2_scheme, Token, Credentials, User, hash_new_password, check_password, generate_token, authenticate_user

router = APIRouter(
    prefix="/step",
    tags=["Step"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)

class HourlyStepResponse(BaseModel):
    id: int
    time: str
    value: float

class DailyStepsResponse(BaseModel):
    id: int
    time: str
    value: int

class MinuteStepsResponse(BaseModel):
    id: int
    time: str
    value: float


@router.get(
    "/hourly/{patientId}",
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
            "description": """Returns the list of hourly step data for the selected patient""",
        },
    },
)
async def get_hourly_calories(patientId: int, user: Annotated[User, Depends(authenticate_user)]) -> List[HourlyStepResponse]:
    results = await HourlyStep.find(HourlyStep.patientId == patientId).to_list()

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
    "/daily/{patientId}",
    response_model=List[str],
    tags=["Health Data"],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "data": [
                            {"id": 500, "time": "2016-12-04T07:21:00", "value": 10102}, 
                            {"id": 500, "time": "2016-12-05T07:21:00", "value": 11250}
                            ]
                    }
                }
            },
            "description": """Returns the list of daily step data for the selected user""",
        },
    },
)
async def get_daily_steps(patientId: int, user: Annotated[User, Depends(authenticate_user)]) -> List[DailyStepsResponse]:
    results = await DailyStep.find(DailyStep.patientId == patientId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.patientId, 
            "time": result.time,
            "value": result.value 
            })
    
    data.sort(key=lambda x: datetime.datetime.fromisoformat(x['time']))
    
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
                            {"id": 500, "time": "2016-12-04T07:21:00", "value": 10102}, 
                            {"id": 500, "time": "2016-12-04T07:22:00", "value": 10280}
                            ]
                    }
                }
            },
            "description": """Returns the list of step data by minute for the selected user""",
        },
    },
)
async def get_minute_steps(patientId: int, user: Annotated[User, Depends(authenticate_user)]) -> List[MinuteStepsResponse]:
    results = await MinuteStep.find(MinuteStep.patientId == patientId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.patientId, 
            "time": result.time,
            "value": result.value 
            })
    
    data.sort(key=lambda x: datetime.datetime.fromisoformat(x['time']))
    
    resp_body = {
        "data": data
    }

    return Response(content=json.dumps(resp_body), media_type="application/json")





