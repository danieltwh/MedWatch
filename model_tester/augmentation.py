import cv2
import numpy as np
import random
import time

class FootagePreprocessor:
    def __init__(self, frames):
        self.frames = frames
        self.target_brightness = 100 
        self.target_kernel_size = (5,5)
    
    def preprocess_footage(self):
        processed_frames = []

        for frame in self.frames:
            #Match images used to train YOLOv8 model
            updated_frame = cv2.resize(frame,(640,640))
            updated_frame = self.denoise_image(updated_frame)
            updated_frame = self.adjust_saturation(updated_frame)
            updated_frame = self.augment_brightness(updated_frame)

            #normalise image
            #updated_frame = updated_frame/255.0

            processed_frames.append(updated_frame) 
        
        return processed_frames

    def augment_brightness(self,frame):
        avg_brightness = np.mean(frame)
        brightness_diff = self.target_brightness - avg_brightness
        adjusted_frame = np.clip(frame + brightness_diff,0,255).astype(np.uint8)

        return adjusted_frame

    #higher the kernel size, the less the noise but the greater the blur
    def denoise_image(self,frame):
        blurred_frame = cv2.GaussianBlur(frame,self.target_kernel_size,0)
        
        return blurred_frame

    def adjust_saturation(self,frame):
        if len(frame.shape) == 3:
            gray_image = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        else:
            gray_image = frame
            
        equalized_image = cv2.equalizeHist(gray_image)

        if len(frame.shape) == 3:
            equalized_image = cv2.cvtColor(equalized_image, cv2.COLOR_GRAY2BGR)
                    
        return equalized_image


class SingleFootageAugmenter:
    def __init__(self, frame):
        self.frame = frame
    def augment_brightness(self, target_brightness=random.uniform(50, 200)):
        frame = self.frame
        avg_brightness = np.mean(frame)
        brightness_diff = target_brightness - avg_brightness
        adjusted_frame = np.clip(frame + brightness_diff, 0, 255).astype(np.uint8)
        self.frame = adjusted_frame

    # Constant image noise in all frames
    def add_image_noise(self, noise_mean=0, noise_stdev=25):
        frame = self.frame
        image_noise = np.random.normal(noise_mean, noise_stdev, frame.shape).astype(np.uint8)

        noisy_frame = cv2.add(frame, image_noise)
        noisy_frame = np.clip(noisy_frame, 0, 255).astype(np.uint8)

        self.frame = noisy_frame

    # higher the kernel size, the less the noise but the greater the blur
    def adjust_image_blur(self, kernel_size=(5, 5)):
        frame = self.frame

        blurred_frame = cv2.GaussianBlur(frame, kernel_size, 0)

        self.frame = blurred_frame

    def adjust_camera_rotation(self, angle=45):

        frame = self.frame

        image_height, image_width = frame.shape[0], frame.shape[1]
        centerY, centerX = image_height // 2, image_width // 2
        rotationMatrix = cv2.getRotationMatrix2D((centerY, centerX), angle, 1)
        cos_of_rotation_matrix = np.abs(rotationMatrix[0][0])
        sin_of_rotation_matrix = np.abs(rotationMatrix[0][1])

        newImageHeight = int((image_height * sin_of_rotation_matrix) + (image_width * cos_of_rotation_matrix))
        newImageWidth = int((image_height * cos_of_rotation_matrix) + (image_width * sin_of_rotation_matrix))

        rotationMatrix[0][2] += (newImageWidth / 2) - centerX
        rotationMatrix[1][2] += (newImageHeight / 2) - centerY

        rotating_image = cv2.warpAffine(frame, rotationMatrix, (newImageWidth, newImageHeight))

        self.frame = rotating_image

    def output_augmented_frame(self):
        return self.frame


class FootageAugmenter:
    def __init__(self, frames):
        self.frames = frames

    def augment_brightness(self,target_brightness=random.uniform(50,200)):
        adjusted_frames = []
        for frame in self.frames:
            avg_brightness = np.mean(frame)
            brightness_diff = target_brightness - avg_brightness
            adjusted_frame = np.clip(frame + brightness_diff,0,255).astype(np.uint8)
            adjusted_frames.append(adjusted_frame)
        return adjusted_frames
    
    #connection error in the form of frame lag
    def mimic_frame_lag(self,lag_probability=0.1,lag_duration=1):
        adjusted_frames = []
        for frame in self.frames:
            adjusted_frames.append(frame)

            if random.random() < lag_probability:
                lag_frame = [frame]
                adjusted_frames.extend(lag_frame * lag_duration)
                #time.sleep(lag_duration)
        
        return adjusted_frames
    
    #connection error in the form of loss of frames
    def mimic_loss_of_frames(self,loss_probability=0.05,max_consecutive_skips=3):
        adjusted_frames = []
        frameindex = 0
        consecutive_skip_count = 0

        while frameindex < len(self.frames):
            if random.random() < loss_probability:
                numoflostframes = random.randint(1,max_consecutive_skips)
                consecutive_skip_count += numoflostframes
                if (frameindex + max_consecutive_skips) < len(self.frames) and consecutive_skip_count >= max_consecutive_skips:
                    frameindex += max_consecutive_skips
                    adjusted_frames.append(self.frames[frameindex])
                    frameindex += 1
                    consecutive_skip_count = 0
                else:
                    frameindex += numoflostframes
            else:
                adjusted_frames.append(self.frames[frameindex])
                frameindex += 1
                consecutive_skip_count = 0

        return adjusted_frames
    
    #connection error in the form of noisy frames
    def mimic_connection_error_noise(self,noise_probability=0.05):
        adjusted_frames = []

        for frame in self.frames:
            if random.random() < noise_probability:
                noise = np.random.randint(0,256,frame.shape,dtype=np.uint8)
                adjusted_frame = cv2.add(frame,noise)
                adjusted_frame = np.clip(adjusted_frame,0,255).astype(np.uint8)
                adjusted_frames.append(adjusted_frame)
            else:
                adjusted_frames.append(frame)
        
        return adjusted_frames
        
    #Constant image noise in all frames
    def add_image_noise(self,noise_mean=0,noise_stdev=25):
        adjusted_frames = []
        image_noise = np.random.normal(noise_mean,noise_stdev,self.frames[0].shape).astype(np.uint8)
        
        for frame in self.frames:
            noisy_frame = cv2.add(frame,image_noise)
            noisy_frame = np.clip(noisy_frame,0,255).astype(np.uint8)
            adjusted_frames.append(noisy_frame)

        return adjusted_frames

    #higher the kernel size, the less the noise but the greater the blur
    def adjust_image_blur(self,kernel_size=(5,5)):
        adjusted_frames = []

        for frame in self.frames:
            blurred_frame = cv2.GaussianBlur(frame,kernel_size,0)
            adjusted_frames.append(blurred_frame)
        
        return adjusted_frames
    
    def adjust_camera_rotation(self,angle=45):
        adjusted_frames = []

        for frame in self.frames:
            image_height, image_width = frame.shape[0],frame.shape[1]
            centerY, centerX = image_height//2, image_width//2
            rotationMatrix = cv2.getRotationMatrix2D((centerY,centerX),angle,1)
            cos_of_rotation_matrix = np.abs(rotationMatrix[0][0])
            sin_of_rotation_matrix = np.abs(rotationMatrix[0][1])

            newImageHeight = int((image_height * sin_of_rotation_matrix) + (image_width * cos_of_rotation_matrix))
            newImageWidth = int((image_height * cos_of_rotation_matrix) + (image_width * sin_of_rotation_matrix)) 

            rotationMatrix[0][2] += (newImageWidth/2) - centerX
            rotationMatrix[1][2] += (newImageHeight/2) - centerY

            rotating_image = cv2.warpAffine(frame,rotationMatrix,(newImageWidth,newImageHeight))

            adjusted_frames.append(rotating_image)
        
        return adjusted_frames
