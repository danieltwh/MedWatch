// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.weight.insertMany([
    {"patientId": 1, "datetime": "2016-12-04T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-07T07:25:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-09T12:22:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-11T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-15T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-19T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-20T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-20T07:27:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-20T07:33:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-20T07:37:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-23T07:51:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-24T10:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-26T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-27T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-27T07:26:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-29T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-29T07:29:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-30T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-30T11:22:00", "weight_kg": 52.5999, "bmi": 22.649999},
    {"patientId": 1, "datetime": "2016-12-31T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 1, "datetime": "2016-12-31T09:25:00", "weight_kg": 52.5999, "bmi": 22.649999},
    {"patientId": 2, "datetime": "2016-12-04T07:21:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-07T07:25:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-09T12:22:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-11T07:21:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-15T07:21:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-17T07:21:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-18T07:21:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-20T07:27:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-21T07:33:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-21T07:37:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-23T07:51:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-24T10:21:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-26T07:21:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-27T07:21:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-27T07:26:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-28T07:21:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-29T07:29:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-30T07:21:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-30T11:22:00", "weight_kg": 60.12351, "bmi": 24.21999},
    {"patientId": 2, "datetime": "2016-12-31T07:21:00", "weight_kg": 60.12351, "bmi": 24.21999}, 
    {"patientId": 2, "datetime": "2016-12-31T08:10:00", "weight_kg": 60.12351, "bmi": 24.21999},
    {"patientId": 3, "datetime": "2016-12-02T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-04T07:25:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-05T12:22:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-07T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-08T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-10T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-12T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-13T07:27:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-16T07:33:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-17T07:37:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-19T07:51:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-20T10:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-22T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-24T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-25T07:26:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-26T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-27T07:29:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-28T07:21:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-30T11:22:00", "weight_kg": 52.5999, "bmi": 22.649999},
    {"patientId": 3, "datetime": "2016-12-31T07:28:00", "weight_kg": 52.5999, "bmi": 22.649999}, 
    {"patientId": 3, "datetime": "2016-12-31T11:12:00", "weight_kg": 52.5999, "bmi": 22.649999}
])