from .authorisation import router as authorisation_routes
from .heartrate import router as heartrate_routes
from .calories import router as calories_routes
from .activity import router as activity_routes
from .intensity import router as intensity_routes
from .step import router as step_routes
from .patient import router as patient_routes
from .user import router as user_routes
from .user_patient import router as user_patient_routes
from .met import router as met_routes
from .sleep import router as sleep_routes
from .weight import router as weight_routes


routes = [
    heartrate_routes,
    authorisation_routes,
    user_routes,
    patient_routes,
    user_patient_routes,
    calories_routes,
    activity_routes,
    intensity_routes,
    step_routes,
    met_routes,
    sleep_routes,
    weight_routes  
]
