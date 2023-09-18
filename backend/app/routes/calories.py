from fastapi import APIRouter,  Response, HTTPException, status
from pydantic import BaseModel

# Other libraries
from typing import Union, List
import json
import datetime

# Models
from app.database.models import Calories


router = APIRouter(
    prefix="/calories",
    tags=["Calories"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)

class CaloriesResponse(BaseModel):
    id: int
    date: str
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
            "description": """Returns the list of calories data for the selected user""",
        },
    },
)
async def get_calories(userId: int) -> List[CaloriesResponse]:
    results = await Calories.find(Calories.userId == userId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.userId,
            "date": result.date,
            "value": result.value
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
