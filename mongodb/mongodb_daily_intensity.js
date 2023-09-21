// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.daily_intensity.insertMany([
    {
        "userId": 1,
        "date": "2016-12-04",
        "sedentary_minute": 1,
        "lightly_active_minute": 1,
        "fairly_active_minute": 1,
        "very_active_minute": 1,
        "sedentary_active_distance": 1,
        "light_active_distance": 1,
        "moderately_active_distance": 1,
        "very_active_distance": 1
    }
])