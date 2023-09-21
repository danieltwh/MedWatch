// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.daily_step.insertMany([
    {"patientId": 1, "time": "2016-12-04T07:21:00", "value": 10205}, 
    {"patientId": 1, "time": "2016-12-05T07:21:00", "value": 10206}, 
    {"patientId": 1, "time": "2016-12-06T07:21:00", "value": 10524}, 
    {"patientId": 1, "time": "2016-12-07T07:21:00", "value": 10312}, 
    {"patientId": 1, "time": "2016-12-08T07:21:00", "value": 10112}, 
    {"patientId": 1, "time": "2016-12-09T07:21:00", "value": 9523}, 
    {"patientId": 1, "time": "2016-12-10T07:21:00", "value": 9126}, 
    {"patientId": 1, "time": "2016-12-11T07:21:00", "value": 9347}, 
    {"patientId": 1, "time": "2016-12-12T07:21:00", "value": 9468}, 
    {"patientId": 1, "time": "2016-12-13T07:21:00", "value": 9393}, 
    {"patientId": 1, "time": "2016-12-14T07:21:00", "value": 9206}, 
    {"patientId": 1, "time": "2016-12-15T07:21:00", "value": 8934}, 
    {"patientId": 1, "time": "2016-12-16T07:21:00", "value": 8322}, 
    {"patientId": 1, "time": "2016-12-17T07:21:00", "value": 6137}, 
    {"patientId": 1, "time": "2016-12-18T07:21:00", "value": 6078}, 
    {"patientId": 1, "time": "2016-12-19T07:21:00", "value": 6123}, 
    {"patientId": 1, "time": "2016-12-20T07:21:00", "value": 6112}, 
    {"patientId": 1, "time": "2016-12-21T07:21:00", "value": 5746}, 
    {"patientId": 1, "time": "2016-12-22T07:21:00", "value": 5468},
    {"patientId": 1, "time": "2016-12-23T07:21:00", "value": 5513}, 
    {"patientId": 1, "time": "2016-12-24T07:21:00", "value": 10258}
])