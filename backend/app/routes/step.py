from fastapi import APIRouter,  Response, HTTPException, status
from pydantic import BaseModel

# Other libraries
from typing import Union, List
import json
import datetime

# Models
from app.database.models import HourlyStep


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
    value: int


@router.get(
    "/hourly/{userId}",
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
            "description": """Returns the list of hourly step data for the selected user""",
        },
    },
)
async def get_hourly_calories(userId: int) -> List[HourlyStepResponse]:
    results = await HourlyStep.find(HourlyStep.userId == userId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.userId,
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