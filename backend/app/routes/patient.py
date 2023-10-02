from fastapi import APIRouter,  Response, HTTPException, status, Depends, Form
from pydantic import BaseModel

# Other libraries
from typing import Union, List, Tuple
from typing_extensions import Annotated
import json
import datetime

# Models
from app.database.models import Patient

# Security
from app.security.authentication import oauth2_scheme, Token, Credentials, User, hash_new_password, check_password, generate_token, authenticate_user
import app.database.models as models
from app.database.database import init_postgres


router = APIRouter(
    prefix="/patient",
    tags=["Patient"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)

@router.get(
    "/{patientId}",
    response_model=List[str],
    responses={
        200: {
            "content": {
                "application/json":
                    {"example": 
                        {
                            "id": 1,
                            "firstName": "Ben",
                            "lastName": "White",
                            "underProfessionalCare": True,
                            "age": 29,
                            "isMale": True
                        }
                    }
            },
            "description": """Returns the details for the selected patient""",
        },
    },
)
async def get_patient_details(patientId: int, user: Annotated[User, Depends(authenticate_user)]):
    postgres = init_postgres()
    patient_details = postgres.query(models.Patient).filter(models.Patient.id == patientId).first()
    if not patient_details:
        raise HTTPException(status_code=400, detail="Patient does not exist.")
    return Response(content=json.dumps(patient_details.serialize(), default=str), media_type="application/json")

@router.post(
    "/add",
    response_model=List[str],
    responses={
        200: {
            "content": {
                "application/json":
                    {"example": 
                        {
                            "id": 5,
                            "firstName": "Hong",
                            "lastName": "Eunchae",
                            "underProfessionalCare": False,
                            "age": 20,
                            "isMale": False
                        }
                    }
            },
            "description": """Add a new patient""",
        },
    },
)
async def add_patient(
    firstname: Annotated[str, Form()], 
    lastname: Annotated[str, Form()],
    under_professional_care: Annotated[bool, Form()],
    age: Annotated[int, Form()],
    is_male: Annotated[bool, Form()], 
    user: Annotated[User, Depends(authenticate_user)]
    ):
    postgres = init_postgres()
    new_patient = Patient(firstname, lastname, under_professional_care, age, is_male)
    postgres.add(new_patient)
    postgres.commit()
    return Response(content=json.dumps(new_patient.serialize(), default=str), media_type="application/json")
