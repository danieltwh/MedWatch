from fastapi import APIRouter,  Response, HTTPException, status
from pydantic import BaseModel

# Other libraries
from typing import Union, List
import json
import datetime

# Models
from app.database.models import DailyActivity


router = APIRouter(
    prefix="/activity",
    tags=["Activity"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)

class DailyActivityResponse(BaseModel):
    id: int
    date: str
    total_steps: int
    total_distance: int
    tracker_distance: int
    logged_activities_distance: int
    very_active_distance: int
    moderately_active_distance: int
    light_active_distance: int
    sedentary_active_distance: int
    very_active_minute: int
    fairly_active_minute: int
    light_active_minute: int
    sedentary_minute: int
    calories: int


@router.get(
    "/daily/{userId}",
    response_model=List[str],
    tags=["Health Data"],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "Users": [{"userId": 1,
                        "date": "2016-12-04",
                        "total_steps": 1,
                        "total_distance": 1,
                        "tracker_distance": 1,
                        "logged_activities_distance": 1,
                        "very_active_distance": 1,
                        "moderately_active_distance": 1,
                        "light_active_distance": 1,
                        "sedentary_active_distance": 1,
                        "very_active_minute": 1,
                        "fairly_active_minute": 1,
                        "light_active_minute": 1,
                        "sedentary_minute": 1,
                        "calories": 1}]
                    }
                }
            },
            "description": """Returns the list of daily activity data for the selected user""",
        },
    },
)
async def get_daily_activity(userId: int) -> List[DailyActivityResponse]:
    results = await DailyActivity.find(DailyActivity.userId == userId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.userId,
            "date": result.date,
            "total_steps": result.total_steps,
            "total_distance": result.total_distance,
            "tracker_distance": result.tracker_distance,
            "logged_activities_distance": result.logged_activities_distance,
            "very_active_distance": result.very_active_distance,
            "moderately_active_distance": result.moderately_active_distance,
            "light_active_distance": result.light_active_distance,
            "sedentary_active_distance": result.sedentary_active_distance,
            "very_active_minute": result.very_active_minute,
            "fairly_active_minute": result.fairly_active_minute,
            "light_active_minute": result.light_active_minute,
            "sedentary_minute": result.sedentary_minute,
            "calories": result.calories
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
