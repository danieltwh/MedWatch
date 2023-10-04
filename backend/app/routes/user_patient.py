from fastapi import APIRouter,  Response, HTTPException, status, Depends, Form
from pydantic import BaseModel

# Other libraries
from typing import Union, List, Tuple
from typing_extensions import Annotated
import json
import datetime

# Models
from app.database.models import UserPatientRelation, Patient

# Security
from app.security.authentication import oauth2_scheme, Token, Credentials, hash_new_password, check_password, generate_token, authenticate_user
from app.security.authentication import User as auth_user
import app.database.models as models
from app.database.database import init_postgres


router = APIRouter(
    prefix="/user_patient",
    tags=["User_Patient"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)

@router.get(
    "/patient/{userId}",
    response_model=List[str],
    responses={
        200: {
            "content": {
                "application/json":
                    {"example": 
                        [
                            {
                                "id": 4,
                                "firstName": "Minji",
                                "lastName": "Kim",
                                "underProfessionalCare": False,
                                "age": 21,
                                "isMale": False
                            },
                            {
                                "id": 5,
                                "firstName": "Hong",
                                "lastName": "Eunchae",
                                "underProfessionalCare": False,
                                "age": 20,
                                "isMale": False
                            }
                        ]
                    }
            },
            "description": """Returns the all patients under selected user""",
        },
    },
)
async def get_related_patients(userId: int, user: Annotated[auth_user, Depends(authenticate_user)]):
    postgres = init_postgres()
    user = postgres.query(models.User).filter(models.User.id == userId).first()

    if not user:
        raise HTTPException(status_code=400, detail="User does not exist.")
    
    all_related_patients = []
    for patient in user.patient_list:
        all_related_patients.append(patient.serialize())

    return Response(content=json.dumps(all_related_patients, default=str), media_type="application/json")

@router.get(
    "/user/{patientId}",
    response_model=List[str],
    responses={
        200: {
            "content": {
                "application/json":
                    {"example": 
                        [
                            {
                                "id": 1,
                                "firstName": "Chad",
                                "lastName": "Richman",
                                "email": "chad@example.com",
                                "salt": "abcde",
                                "password": "12345 ",
                                "role": "0",
                                "date_created": "2023-03-13 20:46:43.902410"
                            }
                        ]
                    }
            },
            "description": """Returns the all user under selected patient""",
        },
    },
)
async def get_related_users(patientId: int, user: Annotated[auth_user, Depends(authenticate_user)]):
    postgres = init_postgres()
    patient = postgres.query(models.Patient).filter(models.Patient.id == patientId).first()

    if not patient:
        raise HTTPException(status_code=400, detail="Patient does not exist.")
    
    all_related_users = []
    for user in patient.user_list:
        all_related_users.append(user.serialize())

    return Response(content=json.dumps(all_related_users, default=str), media_type="application/json")

@router.post(
    "/link",
    response_model=List[str],
    responses={
        200: {
            "content": {
                "application/json":
                    {"example": 
                        {
                            "Status": "Success",
                            "User": {
                                "id": 1,
                                "firstName": "Chad",
                                "lastName": "Richman",
                                "email": "chad@example.com",
                                "salt": "abcde",
                                "password": "12345 ",
                                "role": "0",
                                "date_created": "2023-03-13 20:46:43.902410"
                            },
                            "Patient": {
                                "id": 4,
                                "firstName": "Minji",
                                "lastName": "Kim",
                                "underProfessionalCare": False,
                                "age": 21,
                                "isMale": False
                            }
                        }
                    }
            },
            "description": """Links patient to user""",
        },
    },
)
async def link_patient_to_user(
    user_id: Annotated[int, Form()], 
    patient_id: Annotated[int, Form()],
    user: Annotated[auth_user, Depends(authenticate_user)]
    ):
    postgres = init_postgres()
    user = postgres.query(models.User).filter(models.User.id == user_id).first()
    patient = postgres.query(models.Patient).filter(models.Patient.id == patient_id).first()
    user.patient_list.append(patient)
    postgres.commit()
    response = {
        "Status": "Success",
        "User": user.serialize(),
        "Patient": patient.serialize()
    }
    
    return Response(content=json.dumps(response, default=str), media_type="application/json")
