import asyncio
from typing import Optional
import os
from dotenv import load_dotenv
from pydantic import BaseModel

# MongoDB
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import Document, Indexed, init_beanie


from .models import HeartRate, DailyCalories, HourlyCalories, MinuteCalories, DailyActivity, \
                    DailyIntensity, HourlyIntensity, MinuteIntensity, DailyStep, HourlyStep, \
                    MinuteStep, MET, DailySleep, MinuteSleep, WeightLog

# PostgreSQL
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Redis
import redis

from .models import HeartRate


dotenv_path = os.path.join(".env")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path = dotenv_path)

ENV = os.environ.get('ENV')
print(ENV)

dotenv_path = os.path.join(".secret")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path = dotenv_path)

EMAIL_ADDRESS = os.environ.get("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD")

if ENV == "DEV":
    mongodb_path = 'mongodb://localhost:27020'
    postgres_path = "postgresql://user:password@localhost:5455/MedWatchDB"
    redis_path = "localhost"
else:
    mongodb_path = 'mongodb://mongodb:27017'
    postgres_path = "postgresql://user:password@postgres:5455/MedWatchDB"
    redis_path = "redis"

# Initialise MongoDB Connection
async def init_mongodb():
    # Beanie uses Motor async client under the hood 
    client = AsyncIOMotorClient(mongodb_path)

    # Initialize beanie with the Product document class
    await init_beanie(database=client.medwatch, document_models=[HeartRate, DailyCalories, 
                                                                 HourlyCalories, MinuteCalories, 
                                                                 DailyActivity, DailyIntensity, 
                                                                 HourlyIntensity, MinuteIntensity,
                                                                 DailyStep, HourlyStep, MinuteStep,
                                                                 MET, DailySleep, MinuteSleep, 
                                                                 WeightLog])


# Initialise PostgreSQL Connection
engine = create_engine(
    postgres_path
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_postgres():
    postgres = SessionLocal()
    try:
        return postgres
    finally:
        postgres.close()

# Init redis
redis_conn = redis.Redis(host=redis_path, port=6379, db=0)