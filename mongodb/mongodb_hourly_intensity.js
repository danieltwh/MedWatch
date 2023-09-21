// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.hourly_intensity.insertMany([
    {"patientId": 1, "time": "2016-12-04T07:21:00", "total_intensity": 97, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:21:05", "total_intensity": 102, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:21:10", "total_intensity": 105, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:21:20", "total_intensity": 103, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:21:25", "total_intensity": 101, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:22:05", "total_intensity": 95, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:22:10", "total_intensity": 91, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:22:15", "total_intensity": 93, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:22:20", "total_intensity": 94, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:22:25", "total_intensity": 93, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:22:35", "total_intensity": 92, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:22:40", "total_intensity": 89, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:22:50", "total_intensity": 83, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:22:55", "total_intensity": 61, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:23:00", "total_intensity": 60, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:23:10", "total_intensity": 61, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:23:25", "total_intensity": 61, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:23:30", "total_intensity": 57, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:23:40", "total_intensity": 54, "average_intensity": 100},
    {"patientId": 1, "time": "2016-12-04T07:23:50", "total_intensity": 55, "average_intensity": 100}, 
    {"patientId": 1, "time": "2016-12-04T07:24:00", "total_intensity": 58, "average_intensity": 100}
])