
from .heartrate import router as heartrate_routes
from .calories import router as calories_routes


routes = [
    heartrate_routes,
    calories_routes
]
