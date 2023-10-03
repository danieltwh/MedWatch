from fastapi import APIRouter,  Response, HTTPException, status, Depends
from pydantic import BaseModel

# Other libraries
from typing import Union, List, Tuple
from typing_extensions import Annotated
import json
import datetime

# Models
from app.database.models import HourlyStep

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
                                "value": 1
                            },
                            {
                                "id": 1,
                                "time": "2016-04-12T01:00:00",
                                "value": 2
                            },
                        ]
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