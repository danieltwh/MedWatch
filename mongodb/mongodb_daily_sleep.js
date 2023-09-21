// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.daily_sleep.insertMany([
    {"patientId": 1, "date": "2016-12-04T00:00:00", "sleeprecords": 2, "minutesasleep": 263, "totaltimeinbed": 275}, 
    {"patientId": 1, "date": "2016-12-05T00:00:00", "sleeprecords": 1, "minutesasleep": 312, "totaltimeinbed": 332}, 
    {"patientId": 1, "date": "2016-12-06T00:00:00", "sleeprecords": 1, "minutesasleep": 324, "totaltimeinbed": 364}, 
    {"patientId": 1, "date": "2016-12-07T00:00:00", "sleeprecords": 2, "minutesasleep": 299, "totaltimeinbed": 312}, 
    {"patientId": 1, "date": "2016-12-08T00:00:00", "sleeprecords": 3, "minutesasleep": 400, "totaltimeinbed": 421}, 
])