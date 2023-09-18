// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.calories.insertMany([
    {"userId": 1, "date": "2016-12-04", "value": 97}, 
    {"userId": 1, "date": "2016-12-04", "value": 102}, 
    {"userId": 1, "date": "2016-12-04", "value": 105}, 
    {"userId": 1, "date": "2016-12-04", "value": 103}, 
    {"userId": 1, "date": "2016-12-04", "value": 101}, 
    {"userId": 1, "date": "2016-12-04", "value": 95}, 
    {"userId": 1, "date": "2016-12-04", "value": 91}, 
    {"userId": 1, "date": "2016-12-04", "value": 93}, 
    {"userId": 1, "date": "2016-12-04", "value": 94}, 
    {"userId": 1, "date": "2016-12-04", "value": 93}, 
    {"userId": 1, "date": "2016-12-04", "value": 92}, 
    {"userId": 1, "date": "2016-12-04", "value": 89}, 
    {"userId": 1, "date": "2016-12-04", "value": 83}, 
    {"userId": 1, "date": "2016-12-04", "value": 61}, 
    {"userId": 1, "date": "2016-12-04", "value": 60}, 
    {"userId": 1, "date": "2016-12-04", "value": 61}, 
    {"userId": 1, "date": "2016-12-04", "value": 61}, 
    {"userId": 1, "date": "2016-12-04", "value": 57}, 
    {"userId": 1, "date": "2016-12-04", "value": 54},
    {"userId": 1, "date": "2016-12-04", "value": 55}, 
    {"userId": 1, "date": "2016-12-04", "value": 58}
])