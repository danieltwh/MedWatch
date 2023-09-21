// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.daily_step.insertMany([
    {"userId": 1, "time": "2016-12-04T07:21:00", "value": 10205}, 
    {"userId": 1, "time": "2016-12-05T07:21:00", "value": 10206}, 
    {"userId": 1, "time": "2016-12-06T07:21:00", "value": 10524}, 
    {"userId": 1, "time": "2016-12-07T07:21:00", "value": 10312}, 
    {"userId": 1, "time": "2016-12-08T07:21:00", "value": 10112}, 
    {"userId": 1, "time": "2016-12-09T07:21:00", "value": 9523}, 
    {"userId": 1, "time": "2016-12-10T07:21:00", "value": 9126}, 
    {"userId": 1, "time": "2016-12-11T07:21:00", "value": 9347}, 
    {"userId": 1, "time": "2016-12-12T07:21:00", "value": 9468}, 
    {"userId": 1, "time": "2016-12-13T07:21:00", "value": 9393}, 
    {"userId": 1, "time": "2016-12-14T07:21:00", "value": 9206}, 
    {"userId": 1, "time": "2016-12-15T07:21:00", "value": 8934}, 
    {"userId": 1, "time": "2016-12-16T07:21:00", "value": 8322}, 
    {"userId": 1, "time": "2016-12-17T07:21:00", "value": 6137}, 
    {"userId": 1, "time": "2016-12-18T07:21:00", "value": 6078}, 
    {"userId": 1, "time": "2016-12-19T07:21:00", "value": 6123}, 
    {"userId": 1, "time": "2016-12-20T07:21:00", "value": 6112}, 
    {"userId": 1, "time": "2016-12-21T07:21:00", "value": 5746}, 
    {"userId": 1, "time": "2016-12-22T07:21:00", "value": 5468},
    {"userId": 1, "time": "2016-12-23T07:21:00", "value": 5513}, 
    {"userId": 1, "time": "2016-12-24T07:21:00", "value": 10258}
])