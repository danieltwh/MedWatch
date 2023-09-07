import asyncio
from typing import Optional
import os
from dotenv import load_dotenv

from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel

from beanie import Document, Indexed, init_beanie

from .models import HeartRate

dotenv_path = os.path.join(".env")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path = dotenv_path)

ENV = os.environ.get('ENV')
print(ENV)
if ENV == "DEV":
    mongodb_path = 'mongodb://localhost:27017'
else:
    mongodb_path = 'mongodb://mongodb:27017'

# mongodb_path = 'mongodb://localhost:27017'

async def init_mongodb():
    # Beanie uses Motor async client under the hood 
    client = AsyncIOMotorClient(mongodb_path)

    # Initialize beanie with the Product document class
    await init_beanie(database=client.medwatch, document_models=[HeartRate])