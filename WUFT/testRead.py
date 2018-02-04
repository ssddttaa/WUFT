import cv2
imageShow = cv2.imread('static/current.jpg')
cv2.imshow('test', imageShow)
cv2.waitKey(0)