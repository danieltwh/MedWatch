from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import cv2
from starlette.middleware.cors import CORSMiddleware

from detectionmodel import FallDetection

app = FastAPI()
origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def webcam():
    cap = cv2.VideoCapture(0)
    fall_detector = FallDetection()
    if not cap.isOpened():
        print("Cannot open camera")
        exit()

    while True:
        success, frame = cap.read()
        if success:
            colour = (0, 255, 0)

            try:
                fall_indicator = fall_detector.detect_fall(frame)
                if fall_indicator:
                    colour = (0, 0, 255)
                    frame = fall_detector.plot_logo(frame)
                topX, topY, botX, botY = fall_detector.give_top_bot_xy()

                # Plot okay/fall rectangle
                frame = cv2.rectangle(frame, (topX, topY), (botX, botY), colour, 2)
            except:
                frame = frame

            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        else:
            cap.release()

@app.get("/webcam")
async def read_webcam():
    return StreamingResponse(webcam(), media_type="multipart/x-mixed-replace; boundary=frame")
