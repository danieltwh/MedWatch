from fastapi import APIRouter,  Response, HTTPException, status, Depends
from pydantic import BaseModel

# Other libraries
from typing import Union, List
from typing_extensions import Annotated
import json
import datetime

# Models
from app.database.models import MinuteSleep, DailySleep

# Security
from app.security.authentication import oauth2_scheme, Token, Credentials, User, hash_new_password, check_password, generate_token, authenticate_user

router = APIRouter(
    prefix="/sleep",
    tags=["Sleep"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)

class DailySleepResponse(BaseModel):
    id: int
    date: str
    sleeprecords: int
    minutesasleep: int
    totaltimeinbed: int

class MinuteSleepResponse(BaseModel):
    id: int
    time: str
    value: int

@router.get(
    "/daily/{patientId}",
    response_model=List[str],
    tags=["Health Data"],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "Users": [{"id": 1503960366, "date": "2016-12-04T00:00:00", "sleeprecords": 1,
                                    "minutesasleep": 327, "totaltimeinbed": 346}, 
                                  {"id": 1503960366, "date": "2016-12-05T00:00:00", "sleeprecords": 2,
                                    "minutesasleep": 354, "totaltimeinbed": 370}]
                    }
                }
            },
            "description": """Returns the list of daily sleep data for the selected user""",
        },
    },
)
async def get_daily_sleep(patientId: int, user: Annotated[User, Depends(authenticate_user)]) -> List[DailySleepResponse]:
    results = await DailySleep.find(DailySleep.patientId == patientId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.patientId,
            "date": result.date,
            "sleeprecords": result.sleeprecords,
            "minutesasleep":  result.minutesasleep,
            "totaltimeinbed":  result.totaltimeinbed,
        })
    
    data.sort(key=lambda x: datetime.datetime.fromisoformat(x['date']))
    
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
                        "Users": [{"id": 1503960366, "time": "2016-12-04T00:00:00", "value": 1}, 
                                  {"id": 1503960366, "time": "2016-12-05T00:00:00", "value": 2}]
                    }
                }
            },
            "description": """Returns the list of sleep data by minute for the selected user""",
        },
    },
)
async def get_minute_sleep(patientId: int, user: Annotated[User, Depends(authenticate_user)]) -> List[MinuteSleepResponse]:
    results = await MinuteSleep.find(MinuteSleep.patientId == patientId).to_list()

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