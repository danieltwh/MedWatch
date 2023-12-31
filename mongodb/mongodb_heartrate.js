// use medwatch

const conn = connect('mongodb://localhost:27017')

// Create collection
var db = conn.getSiblingDB("medwatch")

// Insert documents
db.heartrate.insertMany([
    {'patientId': 1, 'time': '2016-04-12T07:21:00', 'value': 97, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:21:05', 'value': 102, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:21:10', 'value': 105, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:21:20', 'value': 103, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:21:25', 'value': 101, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:22:05', 'value': 95, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:22:10', 'value': 91, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:22:15', 'value': 93, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:22:20', 'value': 94, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:22:25', 'value': 93, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:22:35', 'value': 92, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:22:40', 'value': 89, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:22:50', 'value': 83, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:22:55', 'value': 61, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:23:00', 'value': 60, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:23:10', 'value': 61, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:23:25', 'value': 61, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:23:30', 'value': 57, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:23:40', 'value': 54, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:23:50', 'value': 55, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:24:00', 'value': 58, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:24:10', 'value': 60, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:24:20', 'value': 59, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:24:30', 'value': 57, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:24:40', 'value': 56, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:24:50', 'value': 58, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:25:05', 'value': 57, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:25:10', 'value': 58, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:25:15', 'value': 60, 'isAnomaly': 'False'}, 
    {'patientId': 1, 'time': '2016-04-12T07:25:20', 'value': 60, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:25:35', 'value': 58, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:25:40', 'value': 57, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:25:45', 'value': 55, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:25:50', 'value': 54, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:25:55', 'value': 52, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:26:00', 'value': 53, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:26:15', 'value': 53, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:26:20', 'value': 53, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:26:30', 'value': 54, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:26:40', 'value': 53, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:26:50', 'value': 53, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:27:00', 'value': 53, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:27:15', 'value': 53, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:27:25', 'value': 54, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:27:30', 'value': 55, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:27:45', 'value': 56, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:27:50', 'value': 57, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:27:55', 'value': 58, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:28:00', 'value': 60, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:28:05', 'value': 62, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:28:15', 'value': 64, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:28:20', 'value': 66, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:28:30', 'value': 67, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:28:35', 'value': 68, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:28:40', 'value': 68, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:28:45', 'value': 68, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:28:50', 'value': 68, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:29:05', 'value': 68, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:29:20', 'value': 68, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:29:25', 'value': 70, 'isAnomaly': 'False'},
    {'patientId': 2, 'time': '2016-04-12T07:29:30', 'value': 1, 'isAnomaly': 'False'}, 
    {'patientId': 2, 'time': '2016-04-12T07:29:35', 'value': 2, 'isAnomaly': 'False'},
    {'patientId': 3, 'time': '2016-04-12T07:29:30', 'value': 74, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:29:35', 'value': 75, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:29:40', 'value': 76, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:29:45', 'value': 76, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:29:50', 'value': 74, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:29:55', 'value': 76, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:30:00', 'value': 78, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:35:00', 'value': 67, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:35:05', 'value': 68, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:35:10', 'value': 83, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:35:15', 'value': 70, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:35:20', 'value': 71, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:35:25', 'value': 72, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:36:05', 'value': 82, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:36:15', 'value': 81, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:36:25', 'value': 83, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:36:30', 'value': 81, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:36:35', 'value': 79, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:36:40', 'value': 82, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:36:45', 'value': 83, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:36:50', 'value': 82, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:36:55', 'value': 83, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:37:05', 'value': 84, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:37:10', 'value': 86, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:37:15', 'value': 87, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:37:20', 'value': 88, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:37:25', 'value': 87, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:37:30', 'value': 86, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:37:35', 'value': 84, 'isAnomaly': 'False'}, 
    {'patientId': 3, 'time': '2016-04-12T07:37:45', 'value': 82, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:37:50', 'value': 81, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:37:55', 'value': 80, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:38:10', 'value': 80, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:38:15', 'value': 80, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:38:20', 'value': 78, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:38:25', 'value': 77, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:38:35', 'value': 76, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:38:40', 'value': 79, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:38:55', 'value': 79, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:39:10', 'value': 81, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:39:15', 'value': 81, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:39:20', 'value': 81, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:39:30', 'value': 83, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:39:35', 'value': 87, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:39:40', 'value': 90, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:39:45', 'value': 91, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:39:50', 'value': 89, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:39:55', 'value': 89, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:40:10', 'value': 91, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:40:15', 'value': 92, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:40:20', 'value': 91, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:40:25', 'value': 85, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:40:30', 'value': 86, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:40:35', 'value': 90, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:40:40', 'value': 92, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:40:45', 'value': 93, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:40:55', 'value': 92, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:41:00', 'value': 92, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:41:05', 'value': 93, 'isAnomaly': 'False'}, 
    {'patientId': 4, 'time': '2016-04-12T07:41:10', 'value': 95, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:41:25', 'value': 95, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:41:30', 'value': 93, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:41:35', 'value': 92, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:41:50', 'value': 92, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:42:05', 'value': 92, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:42:15', 'value': 91, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:42:20', 'value': 89, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:42:30', 'value': 89, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:42:45', 'value': 85, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:42:50', 'value': 82, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:43:05', 'value': 82, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:43:10', 'value': 84, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:43:15', 'value': 85, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:43:20', 'value': 85, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:43:25', 'value': 87, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:43:40', 'value': 87, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:43:45', 'value': 86, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:43:55', 'value': 85, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:44:10', 'value': 85, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:44:15', 'value': 86, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:44:30', 'value': 86, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:44:40', 'value': 85, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:44:45', 'value': 85, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:44:55', 'value': 84, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:45:00', 'value': 83, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:45:05', 'value': 82, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:45:10', 'value': 84, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:45:20', 'value': 86, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:45:30', 'value': 87, 'isAnomaly': 'False'}, 
    {'patientId': 5, 'time': '2016-04-12T07:45:45', 'value': 87, 'isAnomaly': 'False'}
])