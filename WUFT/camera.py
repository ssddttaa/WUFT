import cv2
import urllib 
import numpy as np


ip_address = 'http://165.123.237.108:8000/camera/mjpeg'


cap = cv2.VideoCapture(ip_address)

i = 0
while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()
    if ret and i%30 == 0:
        cv2.imwrite('static/current.jpg', frame);
    i= i+1