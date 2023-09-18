
from .heartrate import router as heartrate_routes
from .dailysteps import router as dailysteps_routes


routes = [
    heartrate_routes,
    dailysteps_routes  
]
