from .authorisation import router as authorisation_routes
from .heartrate import router as heartrate_routes
from .calories import router as calories_routes
from .activity import router as activity_routes
from .intensity import router as intensity_routes
from .step import router as step_routes

routes = [
    authorisation_routes,
    heartrate_routes,
    calories_routes,
    activity_routes,
    intensity_routes,
    step_routes
]
