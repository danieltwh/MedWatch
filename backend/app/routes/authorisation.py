from fastapi import APIRouter,  Response, HTTPException, status
from fastapi import Depends, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from pydantic import parse_obj_as

# Other libraries
from typing import Union, List, Tuple
from typing_extensions import Annotated
import json
import datetime

# PostgreSQL
from app.database.database import init_postgres
import app.database.models as models

# Redis
from app.database.database import redis_conn 

# Security
from app.security.authentication import oauth2_scheme, Token, Credentials, User, hash_new_password, check_password, generate_token, authenticate_user


router = APIRouter(
    prefix="",
    tags=["Authorisation"],
    responses={
        404: {"description": "Not found"}, 
        302: {"description": "The item was moved"},
        403: {"description": "Not enough privileges"},},
)


@router.get(
    "/users",
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
            "description": """Returns the list of stocker tickers that 
            users select for more information""",
        },
    },
)
async def get_all_users():
    postgres = init_postgres()
    users = postgres.query(models.User).all()
    
    all_users = []
    for user in users:
        all_users.append(user.serialize())

    resp_body = {
        "Users": all_users
    }

    return Response(content=json.dumps(resp_body, default=str), media_type="application/json") 

@router.post(
    "/login",
    response_model=dict,
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "access_token": "pZtrr6mln-RRtvikLpc2Iu4Vl4Ky5m3M65vGWmYb-YQ",
                        "token_type": "bearer"
                    }
                }
            },
            "description": """Returns the access token and the token type.""",
        },
    },
)
async def login(email: Annotated[str, Form()], password: Annotated[str, Form()]):
    postgres = init_postgres()

    # postgres = SessionLocal()
    user_db = postgres.query(models.User).filter(models.User.email == email).first()

    if not user_db:
        raise HTTPException(status_code=400, detail="Incorrect email or password.")
    
    salted_password = user_db.salt + password 
    if not check_password(user_db.password, salted_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    session_token = generate_token()

    # pydantic_user = parse_obj_as(User, user)
    user = User.from_orm(user_db)
    print(user.model_dump())

    # redis_conn.set(session_token, json.dumps(user.model_dump()))
    redis_conn.setex(session_token, datetime.timedelta(hours = 1),json.dumps(user.model_dump()))

    resp_body = {
        "access_token": session_token,
        "token_type": "Bearer"
        # "Users": user.serialize()
    }

    return Response(content=json.dumps(resp_body, default=str), media_type="application/json")


@router.post(
    "/logout",
    response_model=dict,
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "access_token": "pZtrr6mln-RRtvikLpc2Iu4Vl4Ky5m3M65vGWmYb-YQ",
                        "token_type": "bearer"
                    }
                }
            },
            "description": """Returns the access token and the token type.""",
        },
    },
)
async def logout(token: Annotated[str, Depends(oauth2_scheme)], user: Annotated[User, Depends(authenticate_user)]):
    if user and redis_conn.exists(token):
        redis_conn.delete(token)

    return Response(content=json.dumps("OK", default=str), media_type="application/json")


@router.post(
    "/validate-token",
    response_model=dict,
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "id": 2,
                        "firstname": "Les",
                        "lastname": "Goh",
                        "email": "les@example.com",
                        "role": "1"
                    }
                }
            },
            "description": """Returns user information.""",
        },
    },
)
async def check_token(token: Annotated[str, Depends(oauth2_scheme)], user: Annotated[User, Depends(authenticate_user)]):
    # print(user.model_dump())
    
    ttl = redis_conn.ttl(token)

    resp_body = {
        **user.model_dump(),
        ttl: ttl
    }
    return Response(content=json.dumps(resp_body, default=str), media_type="application/json")


@router.get(
    "/test-token",
    response_model=dict,
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "id": 2,
                        "firstname": "Les",
                        "lastname": "Goh",
                        "email": "les@example.com",
                        "role": "1"
                    }
                }
            },
            "description": """Returns user information.""",
        },
    },
)
async def test_token(user: Annotated[User, Depends(authenticate_user)]):
    # print(user.model_dump())
    resp_body = {
        **user.model_dump()
    }
    return Response(content=json.dumps(resp_body, default=str), media_type="application/json")
