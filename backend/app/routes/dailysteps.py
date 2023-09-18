from fastapi import APIRouter,  Response, HTTPException, status
from pydantic import BaseModel

# Other libraries
from typing import Union, List
import json
import datetime

# Models
from app.database.models import DailySteps


router = APIRouter(
    prefix="/dailysteps",
    tags=["Daily Steps"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)

class DailyStepsResponse(BaseModel):
    id: int
    time: str
    value: int


@router.get(
    "/{userId}",
    response_model=List[str],
    tags=["Daily Steps Data for User ID"],
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
            "description": """Daily steps data for given userID""",
        },
    },
)
async def get_dailysteps(userId: int) -> List[DailyStepsResponse]:
    results = await DailySteps.find(DailySteps.userId == userId).to_list()

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
