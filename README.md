# MedWatch

## Table of Contents
- [MedWatch](#MedWatch)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#Requirements)
  - [Project Structure](#project-structure)
  - [Notes](#notes)
  <!-- - [Installation](#installation-/-usage) -->
  - [Usage](#usage)

## Requirements
1. Docker installed on your system
2. Docker-compose installed on your system
3. PGAdmin installed on your system

## Project Structure
```
.
├── backend                 <- FastAPI backend
│   ├── Dockerfile          <- for dockerising FastAPI backend
│   ├── main.py
│   ├── 
│   └── sql                 <- contains sql scripts
├── env.py                  <- connectors to database and other infrastructure
├── frontend                <- ReactJS frontend
│   ├── xxx
│   └── xxx
├── model_deployment_template
│   ├── dockerfile          <- dockerfile definition for deployment base image
│   ├── main.py             <- FastAPI for model deployment
│   ├── model.py            <- template for user to submit model code
│   ├── model               <- model artifacts
│   └── requirments.txt
├── services
│   ├── models              <- contains the model artifacts
│   ├── requirments.txt
│   └── xxx
├── xxx
└── docker-compose          <- docker compose file for MLOps Suite
```

## Notes

## Usage
1. Activate the virutal environment
    ```bash
    docker-compose up -d --build 
    ```

2. Connect to Postgres on PGAdmin
    - Host: localhost
    - Port: 5455
    - User: user
    - Password: password
    Keep the other settings as default
    DB available at `localhost:5455`

3. Backend API available at `localhost:5050`

4. Frontend available at `localhost:80`

5. RabbitMQ available at `localhost:5672`. RabbitMQ Web UI available at `localhost:15672`

6. To shutdown the application, run the following command.
    ```bash
    docker-compose down
    ```