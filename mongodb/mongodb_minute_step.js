// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.minute_step.insertMany([
    {"userId": 1, "time": "2016-12-04T07:21:00", "value": 97}, 
    {"userId": 1, "time": "2016-12-04T07:22:00", "value": 102}, 
    {"userId": 1, "time": "2016-12-04T07:23:00", "value": 105}, 
    {"userId": 1, "time": "2016-12-04T07:24:00", "value": 103}, 
    {"userId": 1, "time": "2016-12-04T07:25:00", "value": 101}, 
    {"userId": 1, "time": "2016-12-04T07:26:00", "value": 95}, 
    {"userId": 1, "time": "2016-12-04T07:27:00", "value": 91}, 
    {"userId": 1, "time": "2016-12-04T07:28:00", "value": 93}, 
    {"userId": 1, "time": "2016-12-04T07:29:00", "value": 94}, 
    {"userId": 1, "time": "2016-12-04T07:30:00", "value": 93}, 
    {"userId": 1, "time": "2016-12-04T07:31:00", "value": 92}, 
    {"userId": 1, "time": "2016-12-04T07:32:00", "value": 89}, 
    {"userId": 1, "time": "2016-12-04T07:33:00", "value": 83}, 
    {"userId": 1, "time": "2016-12-04T07:34:00", "value": 61}, 
    {"userId": 1, "time": "2016-12-04T07:35:00", "value": 60}, 
    {"userId": 1, "time": "2016-12-04T07:36:00", "value": 61}, 
    {"userId": 1, "time": "2016-12-04T07:37:00", "value": 61}, 
    {"userId": 1, "time": "2016-12-04T07:38:00", "value": 57}, 
    {"userId": 1, "time": "2016-12-04T07:39:00", "value": 54},
    {"userId": 1, "time": "2016-12-04T07:40:00", "value": 55}, 
    {"userId": 1, "time": "2016-12-04T07:41:00", "value": 58}
])