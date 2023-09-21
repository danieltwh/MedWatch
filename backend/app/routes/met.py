from fastapi import APIRouter,  Response, HTTPException, status
from pydantic import BaseModel

# Other libraries
from typing import Union, List
import json
import datetime

# Models
from app.database.models import MET

router = APIRouter(
    prefix="/met",
    tags=["MET"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)

class MinuteMETResponse(BaseModel):
    id: int
    time: str
    met: int

@router.get(
    "/minute/{userId}",
    response_model=List[str],
    tags=["Health Data"],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "Users": [{"id": 1503960366, "time": "2016-12-04T07:21:00", "met": 10}, 
                                  {"id": 1503960366, "time": "2016-12-04T07:22:00", "met": 12}]
                    }
                }
            },
            "description": """Returns the list of MET values by minute for the selected user""",
        },
    },
)
async def get_minute_met(userId: int) -> List[MinuteMETResponse]:
    results = await MET.find(MET.userId == userId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.userId,
            "time": result.time,
            "met_value": result.metvalue
        })
    
    data.sort(key=lambda x: datetime.datetime.fromisoformat(x['time']))
    
    resp_body = {
        "data": data
    }

    return Response(content=json.dumps(resp_body), media_type="application/json")

