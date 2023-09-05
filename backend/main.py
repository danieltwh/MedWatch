from fastapi import FastAPI, Response, HTTPException, Depends
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

from typing import Union, List

import json
import datetime



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
        "description": """Manage administrative information for patients, family & friends and devices."""
    },
    {
        "name": "Health Data",
        "description": """Get all the latest vital signs of patients"""
    },
]

swagger_ui_parameters = {
    "defaultModelsExpandDepth": -1,
}

app = FastAPI(
    title = "MedWatch", 
    description = description,
    tags_metadata = tags_metadata,
    swagger_ui_parameters= swagger_ui_parameters
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins = ['*'],
    allow_methods = ['*'],
    allow_headers = ['*']
)

@app.get("/", include_in_schema= False)
async def home():
    return RedirectResponse(url="/redoc")


########################################
""" APIs for Administrative """
########################################
@app.get("/users", response_model = List[str], tags=["Administrative"], 
         responses= {
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
                                    "email": "chad@example.com"
                                },
                                {
                                    "userId": 1,
                                    "firstname": "Les",
                                    "lastname": "Goh",
                                    "email": "les@example.com"
                                }
                            ]
                    }
                    }}, 
            "description": """Returns the list of stocker tickers that 
            users select for more information"""
             }
         })
async def get_all_users():
    result = {
        "Users": [
            {
                "userId": 0,
                "firstname": "Chad",
                "lastname": "Richman",
                "email": "chad@example.com"
            },
            {
                "userId": 1,
                "firstname": "Les",
                "lastname": "Goh",
                "email": "les@example.com"
            }
        ]
    }
    return Response(content=json.dumps(result), media_type="application/json")