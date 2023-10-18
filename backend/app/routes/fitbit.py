from fastapi import APIRouter,  Response, HTTPException, status, Depends, Form
from pydantic import BaseModel

# Other libraries
from typing import Union, List, Tuple
from typing_extensions import Annotated
import json
import datetime
import os
import base64
import requests

# Fitbit
from app.database.database import FITBIT_CLIENT_ID, FITBIT_CLIENT_SECRET

# Patient
import app.database.models as models
from app.database.database import init_postgres

# Security
from app.security.authentication import oauth2_scheme, Token, Credentials, User, hash_new_password, check_password, generate_token, authenticate_user
# import app.database.models as models
# from app.database.database import init_postgres

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

def retrieve_token(code: str, client_id: str = FITBIT_CLIENT_ID, client_secret: str = FITBIT_CLIENT_SECRET):

    credentials = base64.b64encode(f"{client_id}:{client_secret}".encode("ascii")).decode("ascii")

    headers = {
        "Authorization": f"Basic {credentials}",
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    req_body = {
        "code": code,
        "grant_type": "authorization_code",
        "client_id": client_id
    }

    resp = requests.post(f"{FITBIT_URL}/oauth2/token", data = req_body, headers=headers)

    data = resp.json()
    if(resp.status_code == 400 and not data['success'] and data['errors'][0]['errorType'] == 'invalid_grant'):
        print(f"Invalid code : {code}")
        raise HTTPException(400, detail=data['errors'][0]['message'])

    return data

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


@router.post(
    "/oauth2/token",
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
    include_in_schema=False
)
async def fitbit_token(code: Annotated[str, Form()], patientId: Annotated[int, Form()], user: Annotated[User, Depends(authenticate_user)],
                       client_id: Annotated[str, Form()] = FITBIT_CLIENT_ID , client_secret: Annotated[str, Form()] = FITBIT_CLIENT_SECRET
                       ):
    postgres = init_postgres()
    patient_details = postgres.query(models.Patient).filter(models.Patient.id == patientId).first()
    if not patient_details:
        print(f"Unidentified patient {patientId}")
        raise HTTPException(status_code=400, detail=f"Patient {patientId} does not exist.")

    print(code, client_id, client_secret)

    data = retrieve_token(code, client_id, client_secret)

    # Update patient access_token and refresh_token
    patient_details.access_token = data['access_token']
    patient_details.refresh_token = data['refresh_token']
    
    postgres.commit()


    # print(resp_body)
    # return 
    return Response(content="OK")