-- Insert values into users
INSERT INTO users
	(firstname, lastname, email, salt, password, role, date_created)
	VALUES
    ('Chad', 'Richman', 'chad@example.com', 'a67afa5b26eca0a9', '615b3f2ef6e0c48bb7eba737a771c5a79c66ccdfa1243ce0018df9279ba2b337 ', '0', '2023-03-13 20:46:43.90241'),
    ('Les', 'Goh', 'les@example.com', '73a188834b4c81b2', '043e9f7838da54d7a3712a8a219a24c8db086bcf8f4df48b6ec19a30d31a8f23', '1', '2023-03-13 20:46:43.90241'),
	('Jack', 'Pot', 'jack@example.com', '6240a232521611d0', '44089b94713d7fcf488d1e45982d24ec6ce7744cbfccde6486c1a0adbf001f60', '2', '2023-03-13 20:46:43.90241'),
	('Capstone', 'Team5', 'nuscapstonegroup5@gmail.com', '6240a232521611d0', '44089b94713d7fcf488d1e45982d24ec6ce7744cbfccde6486c1a0adbf001f60', '1', '2023-03-13 20:46:43.90241'),
	
	ON CONFLICT (email) DO UPDATE
	SET
		firstname = excluded.firstname,
		lastname = excluded.lastname,
		email = excluded.email,
		salt = excluded.salt,
		password = excluded.password,
		role = excluded.role,
		date_created = excluded.date_created
;

-- Insert values into patients
INSERT INTO patients
	(firstname, lastname, under_professional_care, age, is_male, access_token, refresh_token)
	VALUES
    ('Ben', 'White', TRUE, 79, TRUE, '', ''),
	('Aaron', 'Ramsdale', FALSE, 74, TRUE, '', ''),
	('Hanni', 'Pham', FALSE, 70, FALSE, '', ''),
	('Minji', 'Kim', FALSE, 71, FALSE, '', ''),
	('Anne', 'Teak', FALSE, 79, FALSE, '', ''),
	('Mary', 'Gold', TRUE, 79, FALSE, '', ''),
	('Emily', 'Hills', TRUE, 79, FALSE, '', ''),
	('Don', 'Keigh', FALSE, 84, TRUE, '', ''),
	('Jay', 'Walker', FALSE, 74, TRUE, '', ''),
	('Chris', 'Cross', FALSE, 84, TRUE, '', ''),
	('Hazle', 'Nutt', FALSE, 84, FALSE, '', ''),
	('Jerome', 'Fadel', FALSE, 80, TRUE, '', ''),
	('Arthur', 'Low', FALSE, 64, TRUE, '', ''),
	('Anna', 'Conda', FALSE, 74, FALSE, '', ''),
	('Ben', 'Dover', FALSE, 70, TRUE, '', '')
;


-- Insert values into user_patient_relation
INSERT INTO user_patient_relation
	(user_id, patient_id)
	VALUES
    (1, 1),
	(1, 2),
	(1, 3),
	(1, 4),
	(1, 5),
	(1, 6),
	(1, 7),
	(1, 8),
	(1, 9),
	(1, 10),
	(1, 11),
	(1, 12),
	(1, 13),
	(1, 14),
	(1, 15),
	(2, 1),
	(2, 2),
	(2, 3),
	(2, 4),
	(2, 5),
	(2, 6),
	(2, 7),
	(2, 8),
	(2, 9),
	(2, 10),
	(2, 11),
	(2, 12),
	(2, 13),
	(2, 14),
	(2, 15),
	(3, 1),
	(3, 4),
	(4, 1),
	(4, 4)
;