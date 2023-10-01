from fastapi import APIRouter,  Response, HTTPException, status, Depends, Form
from pydantic import BaseModel

# Other libraries
from typing import Union, List, Tuple
from typing_extensions import Annotated
import json
import datetime

# Models
from app.database.models import User

# Security
from app.security.authentication import oauth2_scheme, Token, Credentials, hash_new_password, check_password, generate_token, authenticate_user
import app.database.models as models
from app.database.database import init_postgres


router = APIRouter(
    prefix="/user",
    tags=["User"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)

@router.get(
    "/{userId}",
    response_model=List[str],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "Users": [{"time": 0, "value": 97}, {"time": 0, "value": 102}]
                    }
                }
            },
            "description": """Returns the details for the selected user""",
        },
    },
)
async def get_user_details(userId: int):
    postgres = init_postgres()
    patient_details = postgres.query(models.User).filter(models.User.id == userId).first()
    if not patient_details:
        raise HTTPException(status_code=400, detail="Patient does not exist.")
    return Response(content=json.dumps(patient_details.serialize(), default=str), media_type="application/json")

@router.post(
    "/add",
    response_model=List[str],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "Users": [{"time": 0, "value": 97}, {"time": 0, "value": 102}]
                    }
                }
            },
            "description": """Add a new user""",
        },
    },
)
async def add_user(
    firstname: Annotated[str, Form()], 
    lastname: Annotated[str, Form()],
    email: Annotated[str, Form()],
    password: Annotated[str, Form()],
    role: Annotated[str, Form()],
    ):
    date_created = datetime.datetime.now()
    salt, hashed_password = hash_new_password(password)

    postgres = init_postgres()
    new_user = User(firstname, lastname, email, salt, hashed_password, role, date_created)
  
    postgres.add(new_user)
    postgres.commit()
    return Response(content=json.dumps(new_user.serialize(), default=str), media_type="application/json")
