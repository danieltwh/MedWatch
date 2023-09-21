from fastapi import APIRouter,  Response, HTTPException, status
from pydantic import BaseModel

# Other libraries
from typing import Union, List
import json
import datetime

# Models
from app.database.models import WeightLog

router = APIRouter(
    prefix="/weight",
    tags=["Weight"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)

class WeightResponse(BaseModel):
    id: int
    datetime: str
    weight_kg: float
    #weight_pounds: float
    bmi: float

@router.get(
    "/{patientId}",
    response_model=List[str],
    tags=["Health Data"],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "Users": [{"id": 1503960366, "datetime": "2016-12-04T07:21:00", "weight_kg": 52.934934,
                                    "bmi": 22.653234}, 
                                  {"id": 1503960366, "datetime": "2016-12-05T07:21:00", "weight_kg": 52.934934,
                                    "bmi": 22.653234}]
                    }
                }
            },
            "description": """Returns the list of weight values for the selected user""",
        },
    },
)
async def get_weight(patientId: int) -> List[WeightResponse]:
    results = await WeightLog.find(WeightLog.patientId == patientId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.patientId,
            "datetime": result.datetime,
            "weight_kg": result.weight_kg,
            "bmi":  result.bmi
        })
    
    data.sort(key=lambda x: datetime.datetime.fromisoformat(x['datetime']))
    
    resp_body = {
        "data": data
    }

    return Response(content=json.dumps(resp_body), media_type="application/json")

