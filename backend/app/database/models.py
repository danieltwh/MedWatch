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

#heartrate
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

#calories
class DailyCalories(Document):
    userId: int
    date: str
    value: int

    class Settings:
        name = "daily_calories"

class HourlyCalories(Document):
    userId: int
    time: str
    value: int

    class Settings:
        name = "hourly_calories"

class MinuteCalories(Document):
    userId: int
    time: str
    value: int

    class Settings:
        name = "minute_calories"

#activity
class DailyActivity(Document):
    userId: int
    date: str
    total_steps: int
    total_distance: int
    tracker_distance: int
    logged_activities_distance: int
    very_active_distance: int
    moderately_active_distance: int
    light_active_distance: int
    sedentary_active_distance: int
    very_active_minute: int
    fairly_active_minute: int
    light_active_minute: int
    sedentary_minute: int
    calories: int

    class Settings:
        name = "daily_activity"

#weight
class WeightLog(Document):
    userId: int
    datetime: str
    weight_kg: float
    #weight_pounds: float
    bmi: float

    class Settings:
        name = "weight"

#intensity
class DailyIntensity(Document):
    userId: int
    date: str
    sedentary_minute: int
    lightly_active_minute: int
    fairly_active_minute: int
    very_active_minute: int
    sedentary_active_distance: int
    light_active_distance: int
    moderately_active_distance: int
    very_active_distance: int

    class Settings:
        name = "daily_intensity"

class HourlyIntensity(Document):
    userId: int
    time: str
    total_intensity: int
    average_intensity: int

    class Settings:
        name = "hourly_intensity"

class MinuteIntensity(Document):
    userId: int
    time: str
    intensity: int

    class Settings:
        name = "minute_intensity"

#steps
class DailyStep(Document):
    userId: int
    time: str
    value: int
    
    class Settings:
        name = "daily_step"

class HourlyStep(Document):
    userId: int
    time: str
    value: int

    class Settings:
        name = "hourly_step"

class MinuteStep(Document):
    userId: int
    time: str
    value: int

    class Settings:
        name = "minute_step"

#MET (metabolic equivalent of task)
class MET(Document):
    userId: int
    time: str
    metvalue: int

    class Settings:
        name = "met"

#Sleep (metabolic equivalent of task)
class MinuteSleep(Document):
    userId: int
    time: str
    value: int

    class Settings:
        name = "minute_sleep"

class DailySleep(Document):
    userId: int
    date: str
    sleeprecords: int
    minutesasleep: int
    totaltimeinbed: int

    class Settings:
        name = "daily_sleep"


    