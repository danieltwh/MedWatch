from fastapi import FastAPI, Response, HTTPException, Depends
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

from typing import Union, List

import json
import datetime

from utils import serialize_datetime


responses = {
    404: {"description": "Item not found"},
    302: {"description": "The item was moved"},
    403: {"description": "Not enough privileges"},
}

description = """
# MedWatch
## Objective
This project aims to get A+ for Capstone.

## Team Members
- Brandon Chiu
- Brendan Lim
- Calvin The
- Daniel Tan
- Samantha Lai
- Tan Kian Lin

## About The Project
xxxx

"""

tags_metadata = [
    {
        "name": "Administrative",
        "description": """Manage administrative information for patients, family & friends and devices.""",
    },
    {
        "name": "Health Data",
        "description": """Get all the latest vital signs of patients""",
    },
]

swagger_ui_parameters = {
    "defaultModelsExpandDepth": -1,
}

app = FastAPI(
    title="MedWatch",
    description=description,
    tags_metadata=tags_metadata,
    swagger_ui_parameters=swagger_ui_parameters,
)

# Enable CORS
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)


@app.get("/", include_in_schema=False)
async def home():
    return RedirectResponse(url="/redoc")


########################################
""" APIs for Administrative """


########################################
@app.get(
    "/users",
    response_model=List[str],
    tags=["Administrative"],
    responses={
        **responses,
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "Users": [
                            {
                                "userId": 0,
                                "firstname": "Chad",
                                "lastname": "Richman",
                                "email": "chad@example.com",
                            },
                            {
                                "userId": 1,
                                "firstname": "Les",
                                "lastname": "Goh",
                                "email": "les@example.com",
                            },
                        ]
                    }
                }
            },
            "description": """Returns the list of stocker tickers that 
            users select for more information""",
        },
    },
)
async def get_all_users():
    result = {
        "Users": [
            {
                "userId": 0,
                "firstname": "Chad",
                "lastname": "Richman",
                "email": "chad@example.com",
            },
            {
                "userId": 1,
                "firstname": "Les",
                "lastname": "Goh",
                "email": "les@example.com",
            },
        ]
    }
    return Response(content=json.dumps(result), media_type="application/json")


@app.get(
    "/{userId}/heartrate",
    response_model=List[str],
    tags=["Health Data"],
    responses={
        **responses,
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "Users": [{"time": 0, "value": 97}, {"time": 0, "value": 102}]
                    }
                }
            },
            "description": """Returns the list of stocker tickers that 
            users select for more information""",
        },
    },
)
async def get_all_users():
    temp = datetime.datetime.strptime("4/12/2016 7:21:00 AM", "%d/%m/%Y %I:%M:%S %p")
    print(temp)
    result = {
        "data": [
            
            {"id": 2022484408, "time": "4/12/2016 7:21:00 AM", "value": 97},
            {"id": 2022484408, "time": "4/12/2016 7:21:05 AM", "value": 102},
            {"id": 2022484408, "time": "4/12/2016 7:21:10 AM", "value": 105},
            {"id": 2022484408, "time": "4/12/2016 7:21:20 AM", "value": 103},
            {"id": 2022484408, "time": "4/12/2016 7:21:25 AM", "value": 101},
            {"id": 2022484408, "time": "4/12/2016 7:22:05 AM", "value": 95},
            {"id": 2022484408, "time": "4/12/2016 7:22:10 AM", "value": 91},
            {"id": 2022484408, "time": "4/12/2016 7:22:15 AM", "value": 93},
            {"id": 2022484408, "time": "4/12/2016 7:22:20 AM", "value": 94},
            {"id": 2022484408, "time": "4/12/2016 7:22:25 AM", "value": 93},
            {"id": 2022484408, "time": "4/12/2016 7:22:35 AM", "value": 92},
            {"id": 2022484408, "time": "4/12/2016 7:22:40 AM", "value": 89},
            {"id": 2022484408, "time": "4/12/2016 7:22:50 AM", "value": 83},
            {"id": 2022484408, "time": "4/12/2016 7:22:55 AM", "value": 61},
            {"id": 2022484408, "time": "4/12/2016 7:23:00 AM", "value": 60},
            {"id": 2022484408, "time": "4/12/2016 7:23:10 AM", "value": 61},
            {"id": 2022484408, "time": "4/12/2016 7:23:25 AM", "value": 61},
            {"id": 2022484408, "time": "4/12/2016 7:23:30 AM", "value": 57},
            {"id": 2022484408, "time": "4/12/2016 7:23:40 AM", "value": 54},
            {"id": 2022484408, "time": "4/12/2016 7:23:50 AM", "value": 55},
            {"id": 2022484408, "time": "4/12/2016 7:24:00 AM", "value": 58},
            
        ]
    }

    for data in result['data']:
        data['time'] = datetime.datetime.strptime(data['time'], "%d/%m/%Y %I:%M:%S %p")

    
    for data in result['data']:
        data['time'] = data['time'].isoformat()

    return Response(content=json.dumps(result), media_type="application/json")
