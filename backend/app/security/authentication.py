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
import os

# PostgreSQL
from app.database.database import init_postgres
import app.database.models as models

# Redis
from app.database.database import redis_conn 

# Security
import hashlib
import hmac
import secrets
import os

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class Token(BaseModel):
    access_token: str
    token_type: str

class Credentials(BaseModel):
    email: str
    password: str

class User(BaseModel):
    id: int
    firstname: str
    lastname: str
    email: str
    role: str

    class Config:
        orm_mode = True
        from_attributes=True

def hash_new_password(password: str) -> Tuple[str, str]:
    # salt = os.urandom(16).hex()
    salt = secrets.token_hex(16)
    hashed_password = hashlib.sha256((salt + password).encode("utf-8")).hexdigest()
    return salt, hashed_password

def check_password(stored_password, salted_password):
    hashed_password = hashlib.sha256(salted_password.encode("utf-8")).hexdigest()
    return hmac.compare_digest(
        stored_password, hashed_password
    )

def generate_token():
    return secrets.token_urlsafe(32)

def authenticate_user(token: Annotated[str, Depends(oauth2_scheme)]) -> User:
    user_json_str = redis_conn.get(token)
    if not user_json_str:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_json = json.loads(user_json_str)
    try:
        user = User(**user_json)
    except Exception as err:
        print(err)
        print("Failed to initialise User BaseModel.")
    return user