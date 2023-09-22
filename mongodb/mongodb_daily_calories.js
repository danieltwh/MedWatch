// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.daily_calories.insertMany([
    {"patientId": 1, "date": "2016-12-04", "value": 97}, 
    {"patientId": 1, "date": "2016-12-04", "value": 102}, 
    {"patientId": 1, "date": "2016-12-04", "value": 105}, 
    {"patientId": 1, "date": "2016-12-04", "value": 103}, 
    {"patientId": 1, "date": "2016-12-04", "value": 101}, 
    {"patientId": 1, "date": "2016-12-04", "value": 95}, 
    {"patientId": 1, "date": "2016-12-04", "value": 91}, 
    {"patientId": 1, "date": "2016-12-04", "value": 93}, 
    {"patientId": 1, "date": "2016-12-04", "value": 94}, 
    {"patientId": 1, "date": "2016-12-04", "value": 93}, 
    {"patientId": 1, "date": "2016-12-04", "value": 92}, 
    {"patientId": 1, "date": "2016-12-04", "value": 89}, 
    {"patientId": 1, "date": "2016-12-04", "value": 83}, 
    {"patientId": 1, "date": "2016-12-04", "value": 61}, 
    {"patientId": 1, "date": "2016-12-04", "value": 60}, 
    {"patientId": 1, "date": "2016-12-04", "value": 61}, 
    {"patientId": 1, "date": "2016-12-04", "value": 61}, 
    {"patientId": 1, "date": "2016-12-04", "value": 57}, 
    {"patientId": 1, "date": "2016-12-04", "value": 54},
    {"patientId": 1, "date": "2016-12-04", "value": 55}, 
    {"patientId": 1, "date": "2016-12-04", "value": 58}
])