from beanie import Document
from pydantic import BaseModel
from typing import Optional

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

class Calories(Document):
    userId: int
    date: str
    value: int

    class Settings:
        name = "calories"