from fastapi import APIRouter,  Response, HTTPException, status
from pydantic import BaseModel

# Other libraries
from typing import Union, List
import json
import datetime

# Models
from app.database.models import HeartRate


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
    value: int


@router.get(
    "/{userId}",
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
            "description": """Returns the list of stocker tickers that 
            users select for more information""",
        },
    },
)
async def get_heartrate(userId: int) -> List[HeartRateResponse]:
    results = await HeartRate.find(HeartRate.userId >= userId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.userId,
            "time": result.time,
            "value": result.value
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
