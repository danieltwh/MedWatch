from fastapi import APIRouter,  Response, HTTPException, status, Depends
from pydantic import BaseModel

# Other libraries
from typing import Union, List, Tuple
from typing_extensions import Annotated
import json
import datetime
import os

# Patient
import app.database.models as models
from app.database.database import init_postgres

router = APIRouter(
    prefix="/fitbit",
    tags=["Heart Rate"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)

# Set up the Fitbit Endpoint
FITBIT_URL = "https://api.fitbit.com"

def retrieve_token(code):
    return 

@router.get(
    "/redirect_url",
    response_model=List[str],
    tags=["Fitbit"],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "data": [
                            {
                                "id": 1,
                                "time": "2016-04-12T07:21:00",
                                "value": 97.0
                            },
                            {
                                "id": 1,
                                "time": "2016-04-12T07:21:05",
                                "value": 102.0
                            }
                        ]
                    }
                }
            },
            "description": """Returns heartrate details for the patient""",
        },
    },
)
async def get_fitbit_redirect(code: str, state: str):
    data = []
    
    resp_body = {
        "data": code
    }

    patientId = int(state)

    postgres = init_postgres()
    patient_details = postgres.query(models.Patient).filter(models.Patient.id == patientId).first()
    if not patient_details:
        print(f"Unidentified patient {patientId}")
        raise HTTPException(status_code=400, detail=f"Patient {patientId} does not exist.")



    # Update patient access_token and refresh_token
    # patient_details.access_token

    # print(resp_body)
    # return 
    return Response(content=json.dumps(resp_body), media_type="application/json")
