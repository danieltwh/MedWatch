from beanie import Document
from pydantic import BaseModel
from typing import Optional

from datetime import datetime
import pytz

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
# from app.database.database import PostgresBase

from sqlalchemy.ext.declarative import declarative_base    
PostgresBase = declarative_base()

class User(PostgresBase):
    __tablename__ = "users"

    id = Column(Integer,  unique=True, nullable=False, primary_key=True, autoincrement=True)
    firstname = Column(String(80), nullable=False)
    lastname = Column(String(80), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    salt = Column(String(120), nullable=False)
    password = Column(String(200), nullable=False)
    role = Column(String(80), nullable=False)
    date_created = Column(DateTime, default=datetime.now(pytz.timezone("Asia/Singapore")))

    def __repr__(self):
        return f'<{self.id}: User {self.firstname}>'
    
    def __init__(self, firstname, lastname, email, salt, password, role, date_created, github_id, github_credentials):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.salt = salt
        self.password = password
        self.role = role
        self.date_created = date_created
    
    def serialize(self):
        return {
            "id": self.id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
            "salt": self.salt, 
            "password": self.password,
            "role": self.role,
            "date_created": self.date_created,
        }


class HeartRate(Document):
    userId: int
    time: str
    value: int
    
    class Settings:
        name = "heartrate"
    
    class Config:
        schema_extra = {
            "example": {
                "title": 2022484408,
                "time": "2016-12-04T07:21:00",
                "value": 97
            }
        }

class UpdateHeartRate(BaseModel):
    userId: int
    time: str
    value: int
    