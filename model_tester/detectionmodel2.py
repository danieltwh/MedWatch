import math
from ultralytics import YOLO
import cv2
import numpy as np


class KeyPoint:
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


class Person:
    def __init__(self, initial_keypoints, topX, topY, botX, botY):
        self.current_keypoints = KeyPoint(initial_keypoints)
        self.keypoints_history = [self.current_keypoints]

        self.initial_angle = self.compute_initial_angle()
        self.direction_of_travel = None

        if self.is_full_body_entry():
            self.initial_distance = self.compute_vertical_distance()

        # Bounding box coordinates
        self.topX = topX
        self.topY = topY
        self.botX = botX
        self.botY = botY

    @property
    def keypoints(self):
        return self.current_keypoints.compiled

    def update_keypoints(self, new_keypoints):
        self.current_keypoints = KeyPoint(new_keypoints)
        self.keypoints_history.append(self.current_keypoints)

    def get_recent_keypoints(self, n):
        return self.keypoints_history[-n:]

    def compute_initial_angle(self):
        eye_midpoint = self._midpoint(self.keypoints['LEFT_EYE'], self.keypoints['RIGHT_EYE'])
        ankle_midpoint = self._midpoint(self.keypoints['LEFT_ANKLE'], self.keypoints['RIGHT_ANKLE'])
        center_line = (eye_midpoint[0] - ankle_midpoint[0], eye_midpoint[1] - ankle_midpoint[1])

        # Dot product with vertical line
        cos_theta = center_line[1] / math.sqrt(center_line[0] ** 2 + center_line[1] ** 2)
        return math.degrees(math.acos(cos_theta))

    def _midpoint(self, point1, point2):
        return ((point1[0] + point2[0]) / 2, (point1[1] + point2[1]) / 2)

    def is_full_body_entry(self):
        upper_height = self.keypoints['LEFT_SHOULDER'][1] - self.keypoints['LEFT_EYE'][1]
        lower_height = self.keypoints['LEFT_HIP'][1] - self.keypoints['LEFT_KNEE'][1]
        return abs(upper_height - lower_height) < max(upper_height, lower_height) * 0.1

    def get_upper_torso_midpoint(self):
        return self._midpoint(self.keypoints['LEFT_SHOULDER'], self.keypoints['RIGHT_SHOULDER'])

    def get_lower_torso_midpoint(self):
        return self._midpoint(self.keypoints['LEFT_HIP'], self.keypoints['RIGHT_HIP'])

    def compute_vertical_distance(self):
        upper_midpoint = self.get_upper_torso_midpoint()
        lower_midpoint = self.get_lower_torso_midpoint()
        return abs(upper_midpoint[1] - lower_midpoint[1])

    def capture_initial_distance(self):
        if not hasattr(self, 'initial_distance') and self.is_full_body_entry():
            self.initial_distance = self.compute_vertical_distance()


class FallDetection:
    def __init__(self, person):
        self.person = person

    def detect_fall_rule1(self):
        """Detect fall based on deviation from initial body angle."""
        current_angle = self.person.compute_initial_angle()
        return abs(self.person.initial_angle - current_angle) > 45

    def compute_direction(self, point_prev, point_current):
        """Compute the angle direction between two points."""
        delta_x = point_current[0] - point_prev[0]
        delta_y = point_current[1] - point_prev[1]
        angle = math.atan2(delta_y, delta_x)
        return math.degrees(angle)

    def detect_fall_rule2(self):
        """Detect fall based on deviation from the direction of travel."""
        recent_keypoints = self.person.get_recent_keypoints(2)
        if len(recent_keypoints) < 2:
            return False

        joint_names = ['LEFT_SHOULDER', 'RIGHT_SHOULDER', 'LEFT_HIP', 'RIGHT_HIP']

        current_direction = sum(
            self.compute_direction(
                recent_keypoints[1].compiled[joint],
                recent_keypoints[0].compiled[joint]
            ) for joint in joint_names
        ) / len(joint_names)

        # If the direction of travel for the person is not yet initialized, store the current direction
        if self.person.direction_of_travel is None:
            self.person.direction_of_travel = current_direction
            return False

        # Check if the current direction deviates significantly from the previous direction of travel
        if abs(self.person.direction_of_travel - current_direction) > 180:
            return True

        # Update the person's direction of travel to the current direction
        self.person.direction_of_travel = current_direction
        return False

    def detect_fall_rule3(self):
        """Detect fall based on the relative positioning of the upper torso to the lower torso."""
        if not hasattr(self.person, 'initial_distance'):
            self.person.capture_initial_distance()
            return False

        current_distance = self.person.compute_vertical_distance()
        return current_distance < 0.5 * self.person.initial_distance

    def detect_fall(self):
        """Overall fall detection that checks all rules."""

        if self.detect_fall_rule1():
            print("Fall detected by Rule 1")
            return True
        elif self.detect_fall_rule2():
            print("Fall detected by Rule 2")
            return True
        elif self.detect_fall_rule3():
            print("Fall detected by Rule 3")
            return True
        return False


class Processor:
    def __init__(self, model):
        self.people = []
        self.model = YOLO(model)
        self.fall_logo = cv2.imread('fall_logo.png')
        self.size = 50
        self.fall_logo = cv2.resize(self.fall_logo, (self.size, self.size))

        # Tracking properties
        self.human_detection_count_in_frames = 0
        self.total_frames = 0
        self.fall_frames = 0

        img2gray = cv2.cvtColor(self.fall_logo, cv2.COLOR_BGR2GRAY)  # Construction of Mask
        self.ret, self.mask = cv2.threshold(img2gray, 1, 255, cv2.THRESH_BINARY)

    def get_body_coordinates_from_frame(self, frame):
        results = self.model(frame, conf=0.3, classes=0, verbose=True)

        detected_people = []
        for keypoints, box in zip(results[0].keypoints.xyn, results[0].boxes.xyxy):
            detected_people.append({'keypoints': keypoints.numpy(), 'box': box.numpy()})
        return detected_people

    def draw_bounding_box(self, frame, person, fall_detected):
        if fall_detected:
            colour = (0, 0, 255)  # Red color
        else:
            colour = (0, 255, 0)  # Green color
        frame = cv2.rectangle(frame, (int(person.topX), int(person.topY)), (int(person.botX), int(person.botY)), colour,
                              2)
        return frame

    def draw_direction_arrow(self, frame, person, direction, color, label):
        """Draw direction arrow based on the direction value."""
        # Define the center point from which the arrow will be drawn
        center_x = int((person.topX + person.botX) / 2)
        center_y = int((person.topY + person.botY) / 2)

        # Compute the end point of the arrow using the direction angle
        length = 40  # length of the arrow
        end_x = center_x + length * math.cos(math.radians(direction))
        end_y = center_y - length * math.sin(
            math.radians(direction))  # Subtract because the y-axis is inverted in image coordinates

        frame = cv2.arrowedLine(frame, (center_x, center_y), (int(end_x), int(end_y)), color, 2)

        # Add the label for the arrow
        cv2.putText(frame, label, (center_x, center_y - 50), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
        return frame

    def add_fall_logo(self, frame, person):
        fallTopX = person.topX + (person.botX - person.topX) // 2 - self.size // 2
        fallTopY = person.topY + (person.botY - person.topY) // 2 - self.size // 2

        # Boundary checks for logo placement
        if (fallTopX < 0) or (fallTopY < 0) or (fallTopX + self.size > frame.shape[1]) or (
                fallTopY + self.size > frame.shape[0]):
            return frame  # Skip adding the logo for this frame if it's too close to the edges

        roi = frame[int(fallTopY):int(fallTopY + self.size), int(fallTopX):int(fallTopX + self.size)]
        roi[np.where(self.mask)] = 0
        roi += self.fall_logo
        frame[int(fallTopY):int(fallTopY + self.size), int(fallTopX):int(fallTopX + self.size)] = roi

        return frame

    def fall_detection_processor(self, person):
        fall_detector = FallDetection(person)
        return fall_detector.detect_fall()

    def process(self, frame):
        detected_people = self.get_body_coordinates_from_frame(frame)
        self.total_frames += 1

        if detected_people:  # If humans are detected in the frame
            self.human_detection_count_in_frames += 1

        for idx, detected in enumerate(detected_people):
            if idx < len(self.people):
                # Update keypoints for existing person
                self.people[idx].update_keypoints(detected['keypoints'])
                self.people[idx].topX, self.people[idx].topY, self.people[idx].botX, self.people[idx].botY = detected[
                    'box']
            else:
                # Create new person with keypoints AND bounding box coordinates
                person = Person(detected['keypoints'], *detected['box'])
                self.people.append(person)

            fall_detected = self.fall_detection_processor(self.people[idx])
            frame = self.draw_bounding_box(frame, self.people[idx], fall_detected)

            # ------------ Direction Arrow Drawing (Begin) ------------
            # Comment/Uncomment this block if you don't want to see the arrows
            if hasattr(self.people[idx], 'direction_of_travel') and self.people[idx].direction_of_travel is not None:
                frame = self.draw_direction_arrow(frame, self.people[idx], self.people[idx].direction_of_travel,
                                                  (0, 255, 0), "Current")
                # Assuming you store the previous direction of travel in another attribute called 'previous_direction_of_travel'
                if hasattr(self.people[idx], 'previous_direction_of_travel'):
                    frame = self.draw_direction_arrow(frame, self.people[idx],
                                                      self.people[idx].previous_direction_of_travel, (0, 0, 255),
                                                      "Previous")
            # ------------ Direction Arrow Drawing (End) --------------

            if fall_detected:
                self.fall_frames += 1  # Increase the fall_frames count when a fall is detected
                frame = self.add_fall_logo(frame, self.people[idx])

        return frame

    def output_stats(self):
        human_detection = self.human_detection_count_in_frames >= (0.35 * self.total_frames)
        fall_detection = self.fall_frames >= 15

        return {
            'Human Detection': human_detection,
            'Fall Detection': fall_detection,
            'Human Detection Frame Count': self.human_detection_count_in_frames,
            'Fall Detection Frame Count': self.fall_frames,
            'Total Frame Count': self.total_frames
        }



def video_fall_detection(video_path, model):
    cap = cv2.VideoCapture(str(video_path))

    if not cap.isOpened():
        print("Cannot open video")
        exit()

    # Define the codec and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    out = cv2.VideoWriter('output.avi', fourcc, 20.0, (int(cap.get(3)), int(cap.get(4))))

    # Create an instance of Processor
    processor = Processor(model)

    while True:
        success, frame = cap.read()
        if not success:
            break

        # Process the frame using the Processor class
        frame = processor.process(frame)

        # Write the processed frame into the output video
        out.write(frame)

        # Display the processed frame
        cv2.imshow("Fall Detection", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    out.release()
    cv2.destroyAllWindows()

    # Return the statistics using the output_stats method from the Processor instance
    return processor.output_stats()


