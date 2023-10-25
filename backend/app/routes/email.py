from fastapi import APIRouter,  Response, HTTPException, status, Depends, Form
from pydantic import BaseModel
from dotenv import load_dotenv

# Other libraries
from typing import Union, List, Tuple
from typing_extensions import Annotated
import json
import datetime
import os
import yagmail
import app.database.models as models
from app.database.database import init_postgres, EMAIL_ADDRESS, EMAIL_PASSWORD

# Security
from app.security.authentication import oauth2_scheme, Token, Credentials, User, hash_new_password, check_password, generate_token, authenticate_user


router = APIRouter(
    prefix="/email",
    tags=["Email"],
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
    "/user/{userId}",
    response_model=List[str],
    tags=["Email"],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "Status": "Success",
                        "Target Email Address": 'target_email@gmail.com'
                    }
                }
            },
            "description": """Sends email to user for a specific patient""",
        },
    },
)
async def send_email_to_user(userId: int, patient_id: Annotated[int, Form()], user: Annotated[User, Depends(authenticate_user)]):
    postgres = init_postgres()
    patient = postgres.query(models.Patient).filter(models.Patient.id == patient_id).first().serialize()
    user = postgres.query(models.User).filter(models.User.id == userId).first().serialize()
    subject = f'Alert for {patient["firstName"]} {patient["lastName"]}'
    content = f'Please check on {patient["firstName"]} {patient["lastName"]}'

    yag = yagmail.SMTP(EMAIL_ADDRESS, EMAIL_PASSWORD)
    yag.send(user['email'], subject, content)
    response = {
        "Status": "Success",
        "Target Email Address": user['email']
    }
    return Response(content=json.dumps(response, default=str), media_type="application/json")


@router.get(
    "/patient/{patientId}",
    response_model=List[str],
    tags=["Email"],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "Status": "Success",
                        "Target Email Address": 'target_email@gmail.com'
                    }
                }
            },
            "description": """Sends email to user for a specific patient""",
        },
    },
)
async def send_email_to_user(patientId: int, user: Annotated[User, Depends(authenticate_user)]):
    response = send_email_helper(patientId)
    return Response(content=json.dumps(response, default=str), media_type="application/json")

def send_email_helper(patientId):
    postgres = init_postgres()
    patient = postgres.query(models.Patient).filter(models.Patient.id == patientId).first().serialize()
    subject = f'Alert for {patient["firstName"]} {patient["lastName"]}'
    content = f'Please check on {patient["firstName"]} {patient["lastName"]}'

    patient = postgres.query(models.Patient).filter(models.Patient.id == patientId).first()
    if not patient:
        raise HTTPException(status_code=400, detail="Patient does not exist.")
    user_emails = []
    for user in patient.user_list:
        user_emails.append(user.serialize()["email"])
    for user_email in user_emails:
        yag = yagmail.SMTP(EMAIL_ADDRESS, EMAIL_PASSWORD)
        yag.send(user_email, subject, content)
    response = {
        "Status": "Success",
        "Target Email Address": user_emails
    }
    return response