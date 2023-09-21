from .authorisation import router as authorisation_routes
from .heartrate import router as heartrate_routes
from .calories import router as calories_routes
from .activity import router as activity_routes
from .intensity import router as intensity_routes
from .step import router as step_routes
from .met import router as met_routes
from .weight import router as weight_routes
from .sleep import router as sleep_routes


routes = [
    authorisation_routes,
    heartrate_routes,
    calories_routes,
    activity_routes,
    intensity_routes,
    step_routes,
    heartrate_routes,
    met_routes,
    weight_routes,
    sleep_routes
]
