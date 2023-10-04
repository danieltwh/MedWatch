-- Create users table
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
    firstname VARCHAR(80) NOT NULL,
    lastname VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    salt VARCHAR(120) NOT NULL,
    password VARCHAR(200) NOT NULL,
    role VARCHAR(80) NOT NULL,
    date_created timestamp without time zone DEFAULT (now() at time zone 'Singapore Standard Time')
);

-- Create patients table
DROP TABLE IF EXISTS patients CASCADE;

CREATE TABLE patients (
	id SERIAL PRIMARY KEY,
    firstname VARCHAR(80) NOT NULL,
    lastname VARCHAR(80) NOT NULL,
    under_professional_care BOOLEAN NOT NULL,
    age INT NOT NULL,
    is_male BOOLEAN NOT NULL
);

-- Create user_patient_relation table
DROP TABLE IF EXISTS user_patient_relation CASCADE;

CREATE TABLE user_patient_relation (
	user_id SERIAL,
    patient_id SERIAL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(patient_id) REFERENCES patients(id)
);

-- -- Create projects table
-- DROP TABLE IF EXISTS projects CASCADE;

-- CREATE TABLE projects (
-- 	id SERIAL PRIMARY KEY,
--     name VARCHAR(80) NOT NULL,
--     status VARCHAR(80) NOT NULL,
--     deployment VARCHAR(120) NOT NULL,
--     build_environment VARCHAR(120) NOT NULL,
--     total_prediction INTEGER,
--     total_requests INTEGER,
--     cpu_usage REAL,
--     ram_usage REAL,
--     num_containers INTEGER,
--     cpu_threshold REAL,
--     owner INTEGER NOT NULL,
--     model_age  INTEGER NOT NULL,
--     date_created timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc'),
--     url VARCHAR(200) NOT NULL,
--     min_num_nodes INTEGER DEFAULT 1,
--     max_num_nodes INTEGER DEFAULT 3,
--     desired_num_nodes INTEGER DEFAULT 1,
--     CONSTRAINT fk_owner 
--         FOREIGN KEY (owner) REFERENCES users(id)
--         ON DELETE CASCADE
-- );


-- -- Create auto last_updated function
-- CREATE OR REPLACE FUNCTION trigger_update_timestamp()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.last_updated = NOW();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER set_update_timestamp
-- BEFORE UPDATE ON versions
-- FOR EACH ROW
-- EXECUTE FUNCTION trigger_update_timestamp();


-- -- Create request table
-- DROP TABLE IF EXISTS requests CASCADE;

-- CREATE TABLE requests (
--     request_id SERIAL NOT NULL UNIQUE,
--     project_id INTEGER NOT NULL,
--     version_number FLOAT NOT NULL,
--     created_time timestamp without time zone DEFAULT (now() at time zone 'utc'),
--     submit_request_comment TEXT DEFAULT NULL,
--     handle_request_comment TEXT DEFAULT NULL,
--     who_sumbit_request VARCHAR(120),
--     who_handle_request VARCHAR(120),
--     request_status VARCHAR(120),

--     PRIMARY KEY (request_id, project_id, version_number)
-- );