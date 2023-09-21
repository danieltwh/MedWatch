from .authorisation import router as authorisation_routes
from .heartrate import router as heartrate_routes


routes = [
    authorisation_routes,
    heartrate_routes   
]
