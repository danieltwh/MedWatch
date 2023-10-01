-- Insert values into users
INSERT INTO users
	(firstname, lastname, email, salt, password, role, date_created)
	VALUES
    ('Chad', 'Richman', 'chad@example.com', 'a67afa5b26eca0a9', 'pbkdf2:sha256:260000$947yJFGdC3eZ336t$db70ec5df6a68e825898e4a6894c9b1d88101a9ab19caf9692ef2114537b179d', '0', '2023-03-13 20:46:43.90241'),
    ('Les', 'Gohhh', 'les@example.com', '73a188834b4c81b2', 'pbkdf2:sha256:260000$cNK3ISYTp3K2dEO1$daa09bab36ad366f8bf1c468bb3f851875205de21ec406527ec073c998e37635', '1', '2023-03-13 20:46:43.90241'),
	('Jack', 'Pot', 'jack@example.com', '6240a232521611d0', 'pbkdf2:sha256:260000$LdWINhPBouzCt6PJ$8ee93b1ed06a390fd0eec6f246ebca73a386d7959a7c950afab51951e9eaf72f', '2', '2023-03-13 20:46:43.90241')
	
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
	(firstname, lastname, underProfessionalCare, age, isMale)
	VALUES
    ('Ben', 'White', TRUE, 29, TRUE),
	('Aaron', 'Ramsdale', FALSE, 24, TRUE),
	('Hanni', 'Pham', FALSE, 20, FALSE),
	('Minji', 'Kim', FALSE, 21, FALSE)
;
