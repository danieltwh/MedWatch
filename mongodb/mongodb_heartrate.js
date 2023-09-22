// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.heartrate.insertMany([
    {"patientId": 1, "time": "2016-12-04T07:21:00", "value": 97}, 
    {"patientId": 1, "time": "2016-12-04T07:21:05", "value": 102}, 
    {"patientId": 1, "time": "2016-12-04T07:21:10", "value": 105}, 
    {"patientId": 1, "time": "2016-12-04T07:21:20", "value": 103}, 
    {"patientId": 1, "time": "2016-12-04T07:21:25", "value": 101}, 
    {"patientId": 1, "time": "2016-12-04T07:22:05", "value": 95}, 
    {"patientId": 1, "time": "2016-12-04T07:22:10", "value": 91}, 
    {"patientId": 1, "time": "2016-12-04T07:22:15", "value": 93}, 
    {"patientId": 1, "time": "2016-12-04T07:22:20", "value": 94}, 
    {"patientId": 1, "time": "2016-12-04T07:22:25", "value": 93}, 
    {"patientId": 1, "time": "2016-12-04T07:22:35", "value": 92}, 
    {"patientId": 1, "time": "2016-12-04T07:22:40", "value": 89}, 
    {"patientId": 1, "time": "2016-12-04T07:22:50", "value": 83}, 
    {"patientId": 1, "time": "2016-12-04T07:22:55", "value": 61}, 
    {"patientId": 1, "time": "2016-12-04T07:23:00", "value": 60}, 
    {"patientId": 1, "time": "2016-12-04T07:23:10", "value": 61}, 
    {"patientId": 1, "time": "2016-12-04T07:23:25", "value": 61}, 
    {"patientId": 1, "time": "2016-12-04T07:23:30", "value": 57}, 
    {"patientId": 1, "time": "2016-12-04T07:23:40", "value": 54},
    {"patientId": 1, "time": "2016-12-04T07:23:50", "value": 55}, 
    {"patientId": 1, "time": "2016-12-04T07:24:00", "value": 58}
])