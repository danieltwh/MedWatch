// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.met.insertMany([
    {"patientId": 1, "time": "2016-12-04T07:21:00", "metvalue": 97}, 
    {"patientId": 1, "time": "2016-12-04T07:22:00", "metvalue": 102}, 
    {"patientId": 1, "time": "2016-12-04T07:23:00", "metvalue": 105}, 
    {"patientId": 1, "time": "2016-12-04T07:24:00", "metvalue": 103}, 
    {"patientId": 1, "time": "2016-12-04T07:25:00", "metvalue": 101}, 
    {"patientId": 1, "time": "2016-12-04T07:26:00", "metvalue": 95}, 
    {"patientId": 1, "time": "2016-12-04T07:27:00", "metvalue": 91}, 
    {"patientId": 1, "time": "2016-12-04T07:28:00", "metvalue": 93}, 
    {"patientId": 1, "time": "2016-12-04T07:29:00", "metvalue": 94}, 
    {"patientId": 1, "time": "2016-12-04T07:30:00", "metvalue": 93}, 
    {"patientId": 1, "time": "2016-12-04T07:31:00", "metvalue": 92}, 
    {"patientId": 1, "time": "2016-12-04T07:32:00", "metvalue": 89}, 
    {"patientId": 1, "time": "2016-12-04T07:33:00", "metvalue": 83}, 
    {"patientId": 1, "time": "2016-12-04T07:34:00", "metvalue": 61}, 
    {"patientId": 1, "time": "2016-12-04T07:35:00", "metvalue": 60}, 
    {"patientId": 1, "time": "2016-12-04T07:36:00", "metvalue": 61}, 
    {"patientId": 1, "time": "2016-12-04T07:37:00", "metvalue": 61}, 
    {"patientId": 1, "time": "2016-12-04T07:38:00", "metvalue": 57}, 
    {"patientId": 1, "time": "2016-12-04T07:39:00", "metvalue": 54},
    {"patientId": 1, "time": "2016-12-04T07:40:00", "metvalue": 55}, 
    {"patientId": 1, "time": "2016-12-04T07:41:00", "metvalue": 58}
])