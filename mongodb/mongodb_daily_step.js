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
    {"patientId": 1, "time": "2016-12-24T07:21:00", "value": 10258},
    {"patientId": 2, "time": "2016-12-04T07:21:00", "value": 11485}, 
    {"patientId": 2, "time": "2016-12-05T07:21:00", "value": 12501}, 
    {"patientId": 2, "time": "2016-12-06T07:21:00", "value": 8204}, 
    {"patientId": 2, "time": "2016-12-07T07:21:00", "value": 7610}, 
    {"patientId": 2, "time": "2016-12-08T07:21:00", "value": 11204}, 
    {"patientId": 2, "time": "2016-12-09T07:21:00", "value": 9523}, 
    {"patientId": 2, "time": "2016-12-10T07:21:00", "value": 3829}, 
    {"patientId": 2, "time": "2016-12-11T07:21:00", "value": 8995}, 
    {"patientId": 2, "time": "2016-12-12T07:21:00", "value": 9210}, 
    {"patientId": 2, "time": "2016-12-13T07:21:00", "value": 9440}, 
    {"patientId": 2, "time": "2016-12-14T07:21:00", "value": 9750}, 
    {"patientId": 2, "time": "2016-12-15T07:21:00", "value": 8980}, 
    {"patientId": 2, "time": "2016-12-16T07:21:00", "value": 10192}, 
    {"patientId": 2, "time": "2016-12-17T07:21:00", "value": 14959}, 
    {"patientId": 2, "time": "2016-12-18T07:21:00", "value": 12967}, 
    {"patientId": 2, "time": "2016-12-19T07:21:00", "value": 13928}, 
    {"patientId": 2, "time": "2016-12-20T07:21:00", "value": 11029}, 
    {"patientId": 2, "time": "2016-12-21T07:21:00", "value": 6049}, 
    {"patientId": 2, "time": "2016-12-22T07:21:00", "value": 2009},
    {"patientId": 2, "time": "2016-12-23T07:21:00", "value": 5068}, 
    {"patientId": 2, "time": "2016-12-24T07:21:00", "value": 7353},
    {"patientId": 3, "time": "2016-12-04T07:21:00", "value": 8265}, 
    {"patientId": 3, "time": "2016-12-05T07:21:00", "value": 9757}, 
    {"patientId": 3, "time": "2016-12-06T07:21:00", "value": 10372}, 
    {"patientId": 3, "time": "2016-12-07T07:21:00", "value": 10332}, 
    {"patientId": 3, "time": "2016-12-08T07:21:00", "value": 16283}, 
    {"patientId": 3, "time": "2016-12-09T07:21:00", "value": 7401}, 
    {"patientId": 3, "time": "2016-12-10T07:21:00", "value": 8203}, 
    {"patientId": 3, "time": "2016-12-11T07:21:00", "value": 9115}, 
    {"patientId": 3, "time": "2016-12-12T07:21:00", "value": 10123}, 
    {"patientId": 3, "time": "2016-12-13T07:21:00", "value": 3028}, 
    {"patientId": 3, "time": "2016-12-14T07:21:00", "value": 7493}, 
    {"patientId": 3, "time": "2016-12-15T07:21:00", "value": 9820}, 
    {"patientId": 3, "time": "2016-12-16T07:21:00", "value": 7445}, 
    {"patientId": 3, "time": "2016-12-17T07:21:00", "value": 6229}, 
    {"patientId": 3, "time": "2016-12-18T07:21:00", "value": 5392}, 
    {"patientId": 3, "time": "2016-12-19T07:21:00", "value": 2874}, 
    {"patientId": 3, "time": "2016-12-20T07:21:00", "value": 7129}, 
    {"patientId": 3, "time": "2016-12-21T07:21:00", "value": 10123}, 
    {"patientId": 3, "time": "2016-12-22T07:21:00", "value": 11205},
    {"patientId": 3, "time": "2016-12-23T07:21:00", "value": 9573}, 
    {"patientId": 3, "time": "2016-12-24T07:21:00", "value": 8693}
])