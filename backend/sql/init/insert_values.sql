-- Insert values into users
INSERT INTO users
	(firstname, lastname, email, salt, password, role, date_created)
	VALUES
    ('Chad', 'Richman', 'chad@example.com', 'a67afa5b26eca0a9', '615b3f2ef6e0c48bb7eba737a771c5a79c66ccdfa1243ce0018df9279ba2b337 ', '0', '2023-03-13 20:46:43.90241'),
    ('Les', 'Goh', 'les@example.com', '73a188834b4c81b2', '043e9f7838da54d7a3712a8a219a24c8db086bcf8f4df48b6ec19a30d31a8f23', '1', '2023-03-13 20:46:43.90241'),
	('Jack', 'Pot', 'jack@example.com', '6240a232521611d0', '44089b94713d7fcf488d1e45982d24ec6ce7744cbfccde6486c1a0adbf001f60', '2', '2023-03-13 20:46:43.90241')
	
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