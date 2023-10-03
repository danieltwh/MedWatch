from fastapi import APIRouter,  Response, HTTPException, status, Depends
from pydantic import BaseModel

# Other libraries
from typing import Union, List, Tuple
from typing_extensions import Annotated
import json
import datetime

# Models
from app.database.models import DailyActivity

# Security
from app.security.authentication import oauth2_scheme, Token, Credentials, User, hash_new_password, check_password, generate_token, authenticate_user


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
    total_steps: float
    total_distance: float
    tracker_distance: float
    logged_activities_distance: float
    very_active_distance: float
    moderately_active_distance: float
    light_active_distance: float
    sedentary_active_distance: float
    very_active_minute: float
    fairly_active_minute: float
    light_active_minute: float
    sedentary_minute: float
    calories: float


@router.get(
    "/daily/{patientId}",
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
                                "date": "2016-04-12",
                                "total_steps": 13162.0,
                                "total_distance": 8.5,
                                "tracker_distance": 8.5,
                                "logged_activities_distance": 0.0,
                                "very_active_distance": 1.87999999523163,
                                "moderately_active_distance": 0.550000011920929,
                                "light_active_distance": 6.05999994277954,
                                "sedentary_active_distance": 0.0,
                                "very_active_minute": 25.0,
                                "fairly_active_minute": 13.0,
                                "light_active_minute": 328.0,
                                "sedentary_minute": 728.0,
                                "calories": 1985.0
                            },
                            {
                                "id": 1,
                                "date": "2016-04-13",
                                "total_steps": 10735.0,
                                "total_distance": 6.96999979019165,
                                "tracker_distance": 6.96999979019165,
                                "logged_activities_distance": 0.0,
                                "very_active_distance": 1.57000005245209,
                                "moderately_active_distance": 0.689999997615814,
                                "light_active_distance": 4.71000003814697,
                                "sedentary_active_distance": 0.0,
                                "very_active_minute": 21.0,
                                "fairly_active_minute": 19.0,
                                "light_active_minute": 217.0,
                                "sedentary_minute": 776.0,
                                "calories": 1797.0
                            }
                        ]
                    }
                }
            },
            "description": """Returns the list of daily activity data for the selected patient""",
        },
    },
)
async def get_daily_activity(patientId: int, user: Annotated[User, Depends(authenticate_user)]) -> List[DailyActivityResponse]:
    results = await DailyActivity.find(DailyActivity.patientId == patientId).to_list()

    data = []
    for result in results:
        data.append({
            "id": result.patientId,
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
