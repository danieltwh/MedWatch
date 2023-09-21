// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.minute_sleep.insertMany([
    {"patientId": 1, "time": "2016-12-04T07:21:00", "value": 2}, 
    {"patientId": 1, "time": "2016-12-04T07:22:00", "value": 2}, 
    {"patientId": 1, "time": "2016-12-04T07:23:00", "value": 1}, 
    {"patientId": 1, "time": "2016-12-04T07:24:00", "value": 2}, 
    {"patientId": 1, "time": "2016-12-04T07:25:00", "value": 1}, 
    {"patientId": 1, "time": "2016-12-04T07:26:00", "value": 2}, 
    {"patientId": 1, "time": "2016-12-04T07:27:00", "value": 2}, 
    {"patientId": 1, "time": "2016-12-04T07:28:00", "value": 1}, 
    {"patientId": 1, "time": "2016-12-04T07:29:00", "value": 3}, 
    {"patientId": 1, "time": "2016-12-04T07:30:00", "value": 2}, 
    {"patientId": 1, "time": "2016-12-04T07:31:00", "value": 2}, 
    {"patientId": 1, "time": "2016-12-04T07:32:00", "value": 2}, 
    {"patientId": 1, "time": "2016-12-04T07:33:00", "value": 3}, 
    {"patientId": 1, "time": "2016-12-04T07:34:00", "value": 3}, 
    {"patientId": 1, "time": "2016-12-04T07:35:00", "value": 1}, 
    {"patientId": 1, "time": "2016-12-04T07:36:00", "value": 2}, 
    {"patientId": 1, "time": "2016-12-04T07:37:00", "value": 1}, 
    {"patientId": 1, "time": "2016-12-04T07:38:00", "value": 1}, 
    {"patientId": 1, "time": "2016-12-04T07:39:00", "value": 3},
    {"patientId": 1, "time": "2016-12-04T07:40:00", "value": 2}, 
    {"patientId": 1, "time": "2016-12-04T07:41:00", "value": 1}
])