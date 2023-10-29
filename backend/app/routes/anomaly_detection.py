from fastapi import APIRouter,  Response, HTTPException, status, Depends, Form
from pydantic import BaseModel
import numpy as np

# Other libraries
from typing import Union, List, Tuple
from typing_extensions import Annotated
import json
import datetime
import os

# Models
from app.database.models import HeartRate

# Security
from app.security.authentication import oauth2_scheme, Token, Credentials, User, hash_new_password, check_password, generate_token, authenticate_user
from app.security.authentication import User as auth_user
from app.routes.email import send_email_helper

router = APIRouter(
    prefix="/anomaly_detection",
    tags=["Anomaly Detection"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)

class HeartRateResponse(BaseModel):
    id: int
    time: str
    value: float


@router.post(
    "/{patientId}",
    response_model=List[str],
    tags=["Health Data"],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "data": {
                            "id": 1,
                            "anomaly": True
                            }
                    }
                }
            },
            "description": """Detect whether a heartrate anomaly is present""",
        },
    },
)
async def link_patient_to_user(
    patientId: int,
    new_heartrate_data: List[HeartRateResponse],
    user: Annotated[User, Depends(authenticate_user)]
    ):
    print(f'Input data: {new_heartrate_data}')
    

    results = await HeartRate.find(HeartRate.patientId == patientId).to_list()

    data = []
    new_data = []
    for result in results:
        if result.value > 0:
            data.append(result.value)
    for curr in new_heartrate_data:
        if curr.value > 0:
            new_data.append(curr.value)
    
    print(f'Data: {data}')
    print(f'New data: {new_data}')
    thresold = 2
    mean = np.mean(data)
    std_dev = np.std(data)

    z_score_new_data = [(value-mean)/std_dev for value in new_data]
    print(f'z-score: {z_score_new_data}')
    contains_anomaly = any([abs(z_score) > thresold for z_score in z_score_new_data])
    print(f'Contains anomaly: {contains_anomaly}')

    if contains_anomaly:
        print('Sending email')
        send_email_helper(patientId)

    response = {
        'Patient Id': patientId,
        "Anomaly detected": contains_anomaly,
        'Sent email to linked users': contains_anomaly
    }
    
    return Response(content=json.dumps(response, default=str), media_type="application/json")
