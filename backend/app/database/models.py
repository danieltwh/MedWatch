from beanie import Document
from pydantic import BaseModel
from typing import Optional

from datetime import datetime
import pytz

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Table
from sqlalchemy.orm import relationship
# from app.database.database import PostgresBase

from sqlalchemy.ext.declarative import declarative_base    
PostgresBase = declarative_base()

UserPatientRelation = Table('user_patient_relation', PostgresBase.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('patient_id', Integer, ForeignKey('patients.id'))
)

class User(PostgresBase):
    __tablename__ = "users"

    id = Column(Integer, unique=True, nullable=False, primary_key=True, autoincrement=True)
    firstname = Column(String(80), nullable=False)
    lastname = Column(String(80), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    salt = Column(String(120), nullable=False)
    password = Column(String(200), nullable=False)
    role = Column(String(80), nullable=False)
    date_created = Column(DateTime, default=datetime.now(pytz.timezone("Asia/Singapore")))
    patient_list = relationship('Patient', secondary=UserPatientRelation, backref='user_list')

    def __repr__(self):
        return f'<{self.id}: User {self.firstname}>'
    
    def __init__(self, firstname, lastname, email, salt, password, role, date_created):
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
            "firstName": self.firstname,
            "lastName": self.lastname,
            "email": self.email,
            "salt": self.salt, 
            "password": self.password,
            "role": self.role,
            "date_created": self.date_created,
        }

class Patient(PostgresBase):
    __tablename__ = "patients"

    id = Column(Integer, unique=True, nullable=False, primary_key=True, autoincrement=True)
    firstname = Column(String(80), nullable=False)
    lastname = Column(String(80), nullable=False)
    under_professional_care = Column(Boolean, nullable=False)
    age = Column(Integer, nullable=False)
    is_male = Column(Boolean, nullable=False)
    access_token = Column(String)
    refresh_token = Column(String)

    def __repr__(self):
        return f'<{self.id}: User {self.firstname}>'
    
    def __init__(self, firstname, lastname, under_professional_care, age, is_male):
        self.firstname = firstname
        self.lastname = lastname
        self.under_professional_care = under_professional_care
        self.age = age
        self.is_male = is_male
    
    def serialize(self):
        return {
            "id": self.id,
            "firstName": self.firstname,
            "lastName": self.lastname,
            "underProfessionalCare": self.under_professional_care,
            "age": self.age,
            "isMale": self.is_male
        }
#heartrate
class HeartRate(Document):
    patientId: int
    time: str
    value: float
    
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
    patientId: int
    time: str
    value: int

#calories
class DailyCalories(Document):
    patientId: int
    date: str
    value: float

    class Settings:
        name = "daily_calories"

class HourlyCalories(Document):
    patientId: int
    time: str
    value: float

    class Settings:
        name = "hourly_calories"

class MinuteCalories(Document):
    patientId: int
    time: str
    value: float

    class Settings:
        name = "minute_calories"

#activity
class DailyActivity(Document):
    patientId: int
    date: str
    total_steps: float
    total_distance: float
    tracker_distance: float
    logged_activities_distance: float
    very_active_distance: float
    moderately_active_distance: float
    light_active_distance: float
    sedentary_active_distance: float
    very_active_minute: float
    fairly_active_minute: float
    light_active_minute: float
    sedentary_minute: float
    calories: float

    class Settings:
        name = "daily_activity"

#intensity
class DailyIntensity(Document):
    patientId: int
    date: str
    sedentary_minute: float
    lightly_active_minute: float
    fairly_active_minute: float
    very_active_minute: float
    sedentary_active_distance: float
    light_active_distance: float
    moderately_active_distance: float
    very_active_distance: float

    class Settings:
        name = "daily_intensity"

class HourlyIntensity(Document):
    patientId: int
    time: str
    total_intensity: float
    average_intensity: float

    class Settings:
        name = "hourly_intensity"

class MinuteIntensity(Document):
    patientId: int
    time: str
    intensity: int

    class Settings:
        name = "minute_intensity"

#steps
class DailyStep(Document):
    patientId: int
    time: str
    value: int

    class Settings:
        name = "daily_step"

class HourlyStep(Document):
    patientId: int
    time: str
    value: float

    class Settings:
        name = "hourly_step"

class MinuteStep(Document):
    patientId: int
    time: str
    value: int

    class Settings:
        name = "minute_step"
    
#met
class MET(Document):
    patientId: int
    time: str
    metvalue: int

    class Settings:
        name = "met"

#sleep
class DailySleep(Document):
    patientId: int
    date: str
    sleeprecords: int
    minutesasleep: int
    totaltimeinbed: int

    class Settings:
        name = "daily_sleep"

class MinuteSleep(Document):
    patientId: int
    time: str
    value: int

    class Settings:
        name = "minute_sleep"

#weight
class WeightLog(Document):
    patientId: int
    datetime: str
    weight_kg: float
    bmi: float

    class Settings:
        name = "weight"