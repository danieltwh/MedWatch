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

class HourlyStep(Document):
    userId: int
    time: str
    value: int

    class Settings:
        name = "hourly_step"
