// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.daily_activity.insertMany([
    {
        "patientId": 1,
        "date": "2016-12-04",
        "total_steps": 1,
        "total_distance": 1,
        "tracker_distance": 1,
        "logged_activities_distance": 1,
        "very_active_distance": 1,
        "moderately_active_distance": 1,
        "light_active_distance": 1,
        "sedentary_active_distance": 1,
        "very_active_minute": 1,
        "fairly_active_minute": 1,
        "light_active_minute": 1,
        "sedentary_minute": 1,
        "calories": 1
    }
])