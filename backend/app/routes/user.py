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
from app.security.authentication import User as auth_user
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
                "application/json":
                    {"example": 
                        {
                            "id": 1,
                            "firstName": "Chad",
                            "lastName": "Richman",
                            "email": "chad@example.com",
                            "salt": "abcde",
                            "password": "123456",
                            "role": "0",
                            "date_created": "2023-03-13 20:46:43.902410"
                        }
                    }
            },
            "description": """Returns the details for the selected user""",
        },
    },
)
async def get_user_details(userId: int, user: Annotated[auth_user, Depends(authenticate_user)]):
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
                "application/json":
                    {"example": 
                        {
                            "id": 4,
                            "firstName": "Alex",
                            "lastName": "Tan",
                            "email": "alex@gmail.com",
                            "salt": "abcde",
                            "password": "12345",
                            "role": "Family",
                            "date_created": "2023-10-02 06:22:51.188309"
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

    user_details = postgres.query(models.User).filter(models.User.email == new_user.email).first()
    if user_details:
        raise HTTPException(status_code=409, detail="Email already taken.")
  
    postgres.add(new_user)
    postgres.commit()
    return Response(content=json.dumps(new_user.serialize(), default=str), media_type="application/json")
