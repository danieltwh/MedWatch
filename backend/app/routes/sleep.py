from fastapi import APIRouter,  Response, HTTPException, status
from pydantic import BaseModel

# Other libraries
from typing import Union, List
import json
import datetime

# Models
from app.database.models import MinuteSleep, DailySleep

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
    "/daily/{userId}",
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
async def get_daily_sleep(userId: int) -> List[DailySleepResponse]:
    results = await DailySleep.find(DailySleep.userId == userId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.userId,
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
    "/minute/{userId}",
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
async def get_minute_sleep(userId: int) -> List[MinuteSleepResponse]:
    results = await MinuteSleep.find(MinuteSleep.userId == userId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.userId,
            "time": result.time,
            "value": result.value
        })
    
    data.sort(key=lambda x: datetime.datetime.fromisoformat(x['time']))
    
    resp_body = {
        "data": data
    }

    return Response(content=json.dumps(resp_body), media_type="application/json")