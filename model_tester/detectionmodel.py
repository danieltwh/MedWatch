from ultralytics import YOLO
from pydantic import BaseModel
import numpy as np
import pandas as pd
import pickle
import cv2
import math
from collections import deque
import time


class KeyPoint():
    def __init__(self, coordinates):
        self.NOSE = coordinates[0]
        self.LEFT_EYE = coordinates[1]
        self.RIGHT_EYE = coordinates[2]
        self.LEFT_EAR = coordinates[3]
        self.RIGHT_EAR = coordinates[4]
        self.LEFT_SHOULDER = coordinates[5]
        self.RIGHT_SHOULDER = coordinates[6]
        self.LEFT_ELBOW = coordinates[7]
        self.RIGHT_ELBOW = coordinates[8]
        self.LEFT_WRIST = coordinates[9]
        self.RIGHT_WRIST = coordinates[10]
        self.LEFT_HIP = coordinates[11]
        self.RIGHT_HIP = coordinates[12]
        self.LEFT_KNEE = coordinates[13]
        self.RIGHT_KNEE = coordinates[14]
        self.LEFT_ANKLE = coordinates[15]
        self.RIGHT_ANKLE = coordinates[16]

        self.compiled = {
            'NOSE': self.NOSE,
            'LEFT_EYE': self.LEFT_EYE,
            'RIGHT_EYE': self.RIGHT_EYE,
            'LEFT_EAR': self.LEFT_EAR,
            'RIGHT_EAR': self.RIGHT_EAR,
            'LEFT_SHOULDER': self.LEFT_SHOULDER,
            'RIGHT_SHOULDER': self.RIGHT_SHOULDER,
            'LEFT_ELBOW': self.LEFT_ELBOW,
            'RIGHT_ELBOW': self.RIGHT_ELBOW,
            'LEFT_WRIST': self.LEFT_WRIST,
            'RIGHT_WRIST': self.RIGHT_WRIST,
            'LEFT_HIP': self.LEFT_HIP,
            'RIGHT_HIP': self.RIGHT_HIP,
            'LEFT_KNEE': self.LEFT_KNEE,
            'RIGHT_KNEE': self.RIGHT_KNEE,
            'LEFT_ANKLE': self.LEFT_ANKLE,
            'RIGHT_ANKLE': self.RIGHT_ANKLE
        }



class FallDetection:
    def __init__(self,model):
        self.CoG_history = deque(maxlen=50)  # Store up to 50 frames
        self.speed_history = deque(maxlen=20)
        self.human_detection_count_in_frames = 0
        self.total_frames = 0
        self.fall_frames = 0
        self.sampling_time = 0.1  # Time between each frame in seconds
        self.threshold_speed = 0.5  # Threshold speed for fall detection
        self.threshold_angle = 45  # Threshold angle for fall detection in degrees
        self.model = YOLO(model)  # Initiation of YOLOv8 model
        self.weights = {
            'NOSE': 0.07,
            'LEFT_EYE': 0.07,
            'RIGHT_EYE': 0.07,
            'LEFT_EAR': 0.07,
            'RIGHT_EAR': 0.07,
            'LEFT_SHOULDER': 0.06,
            'RIGHT_SHOULDER': 0.06,
            'LEFT_ELBOW': 0.06,
            'RIGHT_ELBOW': 0.06,
            'LEFT_WRIST': 0.06,
            'RIGHT_WRIST': 0.06,
            'LEFT_HIP': 0.1,
            'RIGHT_HIP': 0.1,
            'LEFT_KNEE': 0.09,
            'RIGHT_KNEE': 0.09,
            'LEFT_ANKLE': 0.09,
            'RIGHT_ANKLE': 0.09
        }

        self.fall_logo = cv2.imread('fall_logo.png')
        self.size = 50
        self.fall_logo = cv2.resize(self.fall_logo, (self.size, self.size))

        img2gray = cv2.cvtColor(self.fall_logo, cv2.COLOR_BGR2GRAY)  # Construction of Mask
        self.ret, self.mask = cv2.threshold(img2gray, 1, 255, cv2.THRESH_BINARY)

    def calculate_speed(self, x1, y1, x2, y2, delta_time):
        return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) / delta_time

    def calculate_angle(self, y1, y2, delta_time):
        return math.degrees(math.atan((y2 - y1) / delta_time))

    def calculate_CoG(self, coordinates, weights):
        sum_weighted_x = 0
        sum_weighted_y = 0
        for body_part, (x, y) in coordinates.items():
            weight = weights[body_part]
            sum_weighted_x += x * weight
            sum_weighted_y += y * weight
        return sum_weighted_x, sum_weighted_y

    def get_body_coordinates_from_frame(self, frame):
        results = self.model(frame, conf=0.6, classes=0,verbose=True)
        return (results[0].keypoints.xyn[0].numpy(), results[0].boxes.xyxy[0].numpy())

    def rotate_point(self, point, origin, angle):
        """
        Rotate a point counterclockwise by a given angle around a given origin.
        """
        x, y = point
        ox, oy = origin

        qx = ox + math.cos(angle) * (x - ox) - math.sin(angle) * (y - oy)
        qy = oy + math.sin(angle) * (x - ox) + math.cos(angle) * (y - oy)

        return qx, qy

    def normalize_tilt(self, coordinates, CoG):
        # Calculating the tilt angle
        eye_avg_x = (coordinates['LEFT_EYE'][0] + coordinates['RIGHT_EYE'][0]) / 2
        eye_avg_y = (coordinates['LEFT_EYE'][1] + coordinates['RIGHT_EYE'][1]) / 2
        ankle_avg = ((coordinates['LEFT_ANKLE'][0] + coordinates['RIGHT_ANKLE'][0]) / 2,
                     (coordinates['LEFT_ANKLE'][1] + coordinates['RIGHT_ANKLE'][1]) / 2)
        dx = ankle_avg[0] - eye_avg_x
        dy = ankle_avg[1] - eye_avg_y

        # Determine the direction of rotation
        rotation_angle = math.pi/2 - math.atan2(dy, dx)
        if eye_avg_x < CoG[0]:  # Eyes are to the left of the CoG, so rotate clockwise
            rotation_angle = -rotation_angle

        # Rotate all coordinates
        normalized_coordinates = {}
        for key, point in coordinates.items():
            normalized_coordinates[key] = self.rotate_point(point, CoG, rotation_angle)

        return normalized_coordinates

    def detect_fall(self, frame):
        try:
            self.total_frames += 1
            origin_coordinates, positional_coordinates = self.get_body_coordinates_from_frame(frame)
            self.human_detection_count_in_frames += 1
        except:
            return False
        self.positional_coordinates = positional_coordinates
        topX, topY, botX, botY = self.positional_coordinates
        # Convert to int
        self.topX = int(topX)
        self.topY = int(topY)

        self.botX = int(botX)
        self.botY = int(botY)

        # Get width and height
        self.width = botX - topX
        self.height = botY - topY

        coordinates = KeyPoint(origin_coordinates).compiled

        # Calculate the center of gravity
        CoG_x, CoG_y = self.calculate_CoG(coordinates, self.weights)

        # Add new data to history
        self.CoG_history.append((CoG_x, CoG_y))

        # normalized_coordinates = self.normalize_tilt(coordinates, (CoG_x, CoG_y))
        # coordinates = normalized_coordinates

        # -- detection --
        # Need at least 2 frames to start detecting falls
        if len(self.CoG_history) >= 2:
            # Calculate new speed
            old_CoG_y = self.CoG_history[-2][1]
            recent_CoG_y = self.CoG_history[-1][1]
            speed = (recent_CoG_y - old_CoG_y) / self.sampling_time

            # Add the speed to the deque
            self.speed_history.append(speed)

            # Condition 1: Comparing head position to all other body parts
            head_avg_y = (coordinates['NOSE'][1] + coordinates['LEFT_EYE'][1] +
                          coordinates['RIGHT_EYE'][1] + coordinates['LEFT_EAR'][1] +
                          coordinates['RIGHT_EAR'][1]) / 5.0

            # List of all other body parts
            other_body_parts = [ 'LEFT_HIP', 'RIGHT_HIP', 'LEFT_KNEE', 'RIGHT_KNEE',
                                'LEFT_ANKLE', 'RIGHT_ANKLE']

            threshold = 0.05  # 5% threshold

            # Check if head_avg_y is less than or equal to any other body part's y-coordinate increased by 5%
            for part in other_body_parts:
                if head_avg_y >= coordinates[part][1] * (1 - threshold):
                    print(f"Fall detected due to head position relative to {part}!")
                    self.fall_frames +=1
                    return True

            # Condition 2: Drastic increase in y-axis velocity
            if len(self.speed_history) >= 20:
                avg_speed_20_frames = sum(list(self.speed_history)[-20:]) / 20.0
                avg_speed_5_frames = sum(list(self.speed_history)[-5:]) / 5.0

                if (avg_speed_5_frames > 0.12) and (avg_speed_5_frames > 2 * avg_speed_20_frames):
                    print("Fall detected due to drastic change in y-axis velocity!")
                    self.fall_frames +=1
                    return True

            # Condition 3: Angle of CoG movement
            angle = self.calculate_angle(old_CoG_y, recent_CoG_y, self.sampling_time)
            if angle >= 45:
                print("Fall detected due to angle of CoG movement!")
                self.fall_frames +=1
                return True

        return False  # If none of the conditions are met

    def plot_logo(self, frame):
        fallTopX, fallTopY = (self.topX + (self.width // 2) - (self.size // 2)), self.topY + (
                    (self.height // 2) - (self.size // 2))
        roi = frame[int(fallTopY):int(fallTopY + self.size), int(fallTopX):int(fallTopX + self.size)]
        # Set an index of where the mask is
        roi[np.where(self.mask)] = 0
        roi += self.fall_logo
        return frame

    def give_top_bot_xy(self):
        return self.topX, self.topY, self.botX, self.botY

    def output_stats(self):
        human_detection = False
        fall_detection = False
        if self.human_detection_count_in_frames >= (0.35 * self.total_frames):
            human_detection = True
        if self.fall_frames >= 15:
            fall_detection = True
        return {'Human Detection':human_detection, 'Fall Detection':fall_detection,
                'Human Detection Frame Count': self.human_detection_count_in_frames,
                'Fall Detection Frame Count': self.fall_frames,
                'Total Frame Count': self.total_frames}





