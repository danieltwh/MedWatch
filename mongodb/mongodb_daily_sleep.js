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
    {"patientId": 1, "date": "2016-12-09T00:00:00", "sleeprecords": 1, "minutesasleep": 312, "totaltimeinbed": 324}, 
    {"patientId": 1, "date": "2016-12-10T00:00:00", "sleeprecords": 3, "minutesasleep": 325, "totaltimeinbed": 337}, 
    {"patientId": 1, "date": "2016-12-11T00:00:00", "sleeprecords": 1, "minutesasleep": 298, "totaltimeinbed": 315}, 
    {"patientId": 1, "date": "2016-12-12T00:00:00", "sleeprecords": 2, "minutesasleep": 400, "totaltimeinbed": 408}, 
    {"patientId": 1, "date": "2016-12-13T00:00:00", "sleeprecords": 3, "minutesasleep": 410, "totaltimeinbed": 421}, 
    {"patientId": 1, "date": "2016-12-14T00:00:00", "sleeprecords": 3, "minutesasleep": 440, "totaltimeinbed": 451}, 
    {"patientId": 1, "date": "2016-12-15T00:00:00", "sleeprecords": 1, "minutesasleep": 495, "totaltimeinbed": 512}, 
    {"patientId": 1, "date": "2016-12-16T00:00:00", "sleeprecords": 1, "minutesasleep": 310, "totaltimeinbed": 321}, 
    {"patientId": 1, "date": "2016-12-17T00:00:00", "sleeprecords": 2, "minutesasleep": 250, "totaltimeinbed": 308}, 
    {"patientId": 1, "date": "2016-12-18T00:00:00", "sleeprecords": 3, "minutesasleep": 249, "totaltimeinbed": 270}, 
    {"patientId": 1, "date": "2016-12-19T00:00:00", "sleeprecords": 2, "minutesasleep": 292, "totaltimeinbed": 313}, 
    {"patientId": 1, "date": "2016-12-20T00:00:00", "sleeprecords": 1, "minutesasleep": 395, "totaltimeinbed": 412}, 
    {"patientId": 1, "date": "2016-12-21T00:00:00", "sleeprecords": 1, "minutesasleep": 387, "totaltimeinbed": 410}, 
    {"patientId": 1, "date": "2016-12-22T00:00:00", "sleeprecords": 1, "minutesasleep": 345, "totaltimeinbed": 356}, 
    {"patientId": 1, "date": "2016-12-23T00:00:00", "sleeprecords": 2, "minutesasleep": 291, "totaltimeinbed": 312}, 
    {"patientId": 2, "date": "2016-12-04T00:00:00", "sleeprecords": 1, "minutesasleep": 295, "totaltimeinbed": 311}, 
    {"patientId": 2, "date": "2016-12-05T00:00:00", "sleeprecords": 2, "minutesasleep": 308, "totaltimeinbed": 325}, 
    {"patientId": 2, "date": "2016-12-06T00:00:00", "sleeprecords": 2, "minutesasleep": 299, "totaltimeinbed": 320}, 
    {"patientId": 2, "date": "2016-12-07T00:00:00", "sleeprecords": 3, "minutesasleep": 311, "totaltimeinbed": 319}, 
    {"patientId": 2, "date": "2016-12-08T00:00:00", "sleeprecords": 1, "minutesasleep": 386, "totaltimeinbed": 395},
    {"patientId": 2, "date": "2016-12-09T00:00:00", "sleeprecords": 2, "minutesasleep": 375, "totaltimeinbed": 381}, 
    {"patientId": 2, "date": "2016-12-10T00:00:00", "sleeprecords": 1, "minutesasleep": 344, "totaltimeinbed": 359}, 
    {"patientId": 2, "date": "2016-12-11T00:00:00", "sleeprecords": 1, "minutesasleep": 391, "totaltimeinbed": 409}, 
    {"patientId": 2, "date": "2016-12-12T00:00:00", "sleeprecords": 1, "minutesasleep": 280, "totaltimeinbed": 299}, 
    {"patientId": 2, "date": "2016-12-13T00:00:00", "sleeprecords": 3, "minutesasleep": 312, "totaltimeinbed": 325}, 
    {"patientId": 2, "date": "2016-12-14T00:00:00", "sleeprecords": 1, "minutesasleep": 355, "totaltimeinbed": 381}, 
    {"patientId": 2, "date": "2016-12-15T00:00:00", "sleeprecords": 2, "minutesasleep": 377, "totaltimeinbed": 390}, 
    {"patientId": 2, "date": "2016-12-16T00:00:00", "sleeprecords": 1, "minutesasleep": 385, "totaltimeinbed": 401}, 
    {"patientId": 2, "date": "2016-12-17T00:00:00", "sleeprecords": 3, "minutesasleep": 399, "totaltimeinbed": 410}, 
    {"patientId": 2, "date": "2016-12-18T00:00:00", "sleeprecords": 3, "minutesasleep": 401, "totaltimeinbed": 415}, 
    {"patientId": 2, "date": "2016-12-19T00:00:00", "sleeprecords": 2, "minutesasleep": 396, "totaltimeinbed": 408}, 
    {"patientId": 2, "date": "2016-12-20T00:00:00", "sleeprecords": 1, "minutesasleep": 381, "totaltimeinbed": 412}, 
    {"patientId": 2, "date": "2016-12-21T00:00:00", "sleeprecords": 2, "minutesasleep": 375, "totaltimeinbed": 398}, 
    {"patientId": 2, "date": "2016-12-22T00:00:00", "sleeprecords": 2, "minutesasleep": 344, "totaltimeinbed": 371}, 
    {"patientId": 2, "date": "2016-12-23T00:00:00", "sleeprecords": 1, "minutesasleep": 330, "totaltimeinbed": 342},
    {"patientId": 3, "date": "2016-12-04T00:00:00", "sleeprecords": 3, "minutesasleep": 295, "totaltimeinbed": 310}, 
    {"patientId": 3, "date": "2016-12-05T00:00:00", "sleeprecords": 2, "minutesasleep": 397, "totaltimeinbed": 408}, 
    {"patientId": 3, "date": "2016-12-06T00:00:00", "sleeprecords": 2, "minutesasleep": 410, "totaltimeinbed": 425}, 
    {"patientId": 3, "date": "2016-12-07T00:00:00", "sleeprecords": 2, "minutesasleep": 412, "totaltimeinbed": 427}, 
    {"patientId": 3, "date": "2016-12-08T00:00:00", "sleeprecords": 1, "minutesasleep": 400, "totaltimeinbed": 411},
    {"patientId": 3, "date": "2016-12-09T00:00:00", "sleeprecords": 1, "minutesasleep": 430, "totaltimeinbed": 449}, 
    {"patientId": 3, "date": "2016-12-10T00:00:00", "sleeprecords": 2, "minutesasleep": 412, "totaltimeinbed": 425}, 
    {"patientId": 3, "date": "2016-12-11T00:00:00", "sleeprecords": 1, "minutesasleep": 408, "totaltimeinbed": 420}, 
    {"patientId": 3, "date": "2016-12-12T00:00:00", "sleeprecords": 1, "minutesasleep": 250, "totaltimeinbed": 259}, 
    {"patientId": 3, "date": "2016-12-13T00:00:00", "sleeprecords": 1, "minutesasleep": 410, "totaltimeinbed": 421}, 
    {"patientId": 3, "date": "2016-12-14T00:00:00", "sleeprecords": 2, "minutesasleep": 280, "totaltimeinbed": 301}, 
    {"patientId": 3, "date": "2016-12-15T00:00:00", "sleeprecords": 1, "minutesasleep": 420, "totaltimeinbed": 432}, 
    {"patientId": 3, "date": "2016-12-16T00:00:00", "sleeprecords": 1, "minutesasleep": 415, "totaltimeinbed": 427}, 
    {"patientId": 3, "date": "2016-12-17T00:00:00", "sleeprecords": 3, "minutesasleep": 399, "totaltimeinbed": 410}, 
    {"patientId": 3, "date": "2016-12-18T00:00:00", "sleeprecords": 1, "minutesasleep": 365, "totaltimeinbed": 388}, 
    {"patientId": 3, "date": "2016-12-19T00:00:00", "sleeprecords": 1, "minutesasleep": 380, "totaltimeinbed": 397}, 
    {"patientId": 3, "date": "2016-12-20T00:00:00", "sleeprecords": 2, "minutesasleep": 391, "totaltimeinbed": 408}, 
    {"patientId": 3, "date": "2016-12-21T00:00:00", "sleeprecords": 1, "minutesasleep": 400, "totaltimeinbed": 410}, 
    {"patientId": 3, "date": "2016-12-22T00:00:00", "sleeprecords": 3, "minutesasleep": 403, "totaltimeinbed": 421}, 
    {"patientId": 3, "date": "2016-12-23T00:00:00", "sleeprecords": 1, "minutesasleep": 410, "totaltimeinbed": 429},
])