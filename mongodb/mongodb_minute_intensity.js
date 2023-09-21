// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.minute_intensity.insertMany([
    {"patientId": 1, "time": "2016-12-04T07:21:00", "intensity": 97}, 
    {"patientId": 1, "time": "2016-12-04T07:22:00", "intensity": 102}, 
    {"patientId": 1, "time": "2016-12-04T07:23:00", "intensity": 105}, 
    {"patientId": 1, "time": "2016-12-04T07:24:00", "intensity": 103}, 
    {"patientId": 1, "time": "2016-12-04T07:25:00", "intensity": 101}, 
    {"patientId": 1, "time": "2016-12-04T07:26:00", "intensity": 95}, 
    {"patientId": 1, "time": "2016-12-04T07:27:00", "intensity": 91}, 
    {"patientId": 1, "time": "2016-12-04T07:28:00", "intensity": 93}, 
    {"patientId": 1, "time": "2016-12-04T07:29:00", "intensity": 94}, 
    {"patientId": 1, "time": "2016-12-04T07:30:00", "intensity": 93}, 
    {"patientId": 1, "time": "2016-12-04T07:31:00", "intensity": 92}, 
    {"patientId": 1, "time": "2016-12-04T07:32:00", "intensity": 89}, 
    {"patientId": 1, "time": "2016-12-04T07:33:00", "intensity": 83}, 
    {"patientId": 1, "time": "2016-12-04T07:34:00", "intensity": 82}, 
    {"patientId": 1, "time": "2016-12-04T07:35:00", "intensity": 78}, 
    {"patientId": 1, "time": "2016-12-04T07:36:00", "intensity": 74}, 
    {"patientId": 1, "time": "2016-12-04T07:37:00", "intensity": 72}, 
    {"patientId": 1, "time": "2016-12-04T07:38:00", "intensity": 70}, 
    {"patientId": 1, "time": "2016-12-04T07:39:00", "intensity": 69},
    {"patientId": 1, "time": "2016-12-04T07:40:00", "intensity": 75}, 
    {"patientId": 1, "time": "2016-12-04T07:41:00", "intensity": 82}
])