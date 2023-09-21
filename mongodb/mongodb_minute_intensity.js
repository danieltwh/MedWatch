// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.minute_intensity.insertMany([
    {"userId": 1, "time": "2016-12-04T07:21:00", "intensity": 97}, 
    {"userId": 1, "time": "2016-12-04T07:22:00", "intensity": 102}, 
    {"userId": 1, "time": "2016-12-04T07:23:00", "intensity": 105}, 
    {"userId": 1, "time": "2016-12-04T07:24:00", "intensity": 103}, 
    {"userId": 1, "time": "2016-12-04T07:25:00", "intensity": 101}, 
    {"userId": 1, "time": "2016-12-04T07:26:00", "intensity": 95}, 
    {"userId": 1, "time": "2016-12-04T07:27:00", "intensity": 91}, 
    {"userId": 1, "time": "2016-12-04T07:28:00", "intensity": 93}, 
    {"userId": 1, "time": "2016-12-04T07:29:00", "intensity": 94}, 
    {"userId": 1, "time": "2016-12-04T07:30:00", "intensity": 93}, 
    {"userId": 1, "time": "2016-12-04T07:31:00", "intensity": 92}, 
    {"userId": 1, "time": "2016-12-04T07:32:00", "intensity": 89}, 
    {"userId": 1, "time": "2016-12-04T07:33:00", "intensity": 83}, 
    {"userId": 1, "time": "2016-12-04T07:34:00", "intensity": 82}, 
    {"userId": 1, "time": "2016-12-04T07:35:00", "intensity": 78}, 
    {"userId": 1, "time": "2016-12-04T07:36:00", "intensity": 74}, 
    {"userId": 1, "time": "2016-12-04T07:37:00", "intensity": 72}, 
    {"userId": 1, "time": "2016-12-04T07:38:00", "intensity": 70}, 
    {"userId": 1, "time": "2016-12-04T07:39:00", "intensity": 69},
    {"userId": 1, "time": "2016-12-04T07:40:00", "intensity": 75}, 
    {"userId": 1, "time": "2016-12-04T07:41:00", "intensity": 82}
])