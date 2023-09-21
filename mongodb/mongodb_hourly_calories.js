// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.hourly_calories.insertMany([
    {"userId": 1, "time": "2016-12-04T07:21:00", "value": 97}, 
    {"userId": 1, "time": "2016-12-04T07:21:05", "value": 102}, 
    {"userId": 1, "time": "2016-12-04T07:21:10", "value": 105}, 
    {"userId": 1, "time": "2016-12-04T07:21:20", "value": 103}, 
    {"userId": 1, "time": "2016-12-04T07:21:25", "value": 101}, 
    {"userId": 1, "time": "2016-12-04T07:22:05", "value": 95}, 
    {"userId": 1, "time": "2016-12-04T07:22:10", "value": 91}, 
    {"userId": 1, "time": "2016-12-04T07:22:15", "value": 93}, 
    {"userId": 1, "time": "2016-12-04T07:22:20", "value": 94}, 
    {"userId": 1, "time": "2016-12-04T07:22:25", "value": 93}, 
    {"userId": 1, "time": "2016-12-04T07:22:35", "value": 92}, 
    {"userId": 1, "time": "2016-12-04T07:22:40", "value": 89}, 
    {"userId": 1, "time": "2016-12-04T07:22:50", "value": 83}, 
    {"userId": 1, "time": "2016-12-04T07:22:55", "value": 61}, 
    {"userId": 1, "time": "2016-12-04T07:23:00", "value": 60}, 
    {"userId": 1, "time": "2016-12-04T07:23:10", "value": 61}, 
    {"userId": 1, "time": "2016-12-04T07:23:25", "value": 61}, 
    {"userId": 1, "time": "2016-12-04T07:23:30", "value": 57}, 
    {"userId": 1, "time": "2016-12-04T07:23:40", "value": 54},
    {"userId": 1, "time": "2016-12-04T07:23:50", "value": 55}, 
    {"userId": 1, "time": "2016-12-04T07:24:00", "value": 58}
])