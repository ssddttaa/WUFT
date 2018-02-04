import cv2
import dlib
import numpy as np
import os

srcDir = 'data/'

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")


images = os.listdir(srcDir);

def getBestFaceInFaceArray(faces, scores):
	maxScore = scores[0]
	bestFace = faces[0]
	for i in xrange(0, len(scores)):
		if scores[i] > maxScore:
			maxScore = scores[i]
			bestFace = faces[i]
	return bestFace

def populateDatabaseFeatures():
	databaseFeatures = []
	for image in images:
		print image
		acquiredImage = cv2.imread(srcDir + image)
		img_gray = cv2.cvtColor(acquiredImage, cv2.COLOR_BGR2GRAY)
		faces, scores, idx = detector.run(img_gray, 1, -1)
		if len(faces) == 0:
		    print "no faces :("
		else:
			bestFace = getBestFaceInFaceArray(faces, scores)
			predictorArray = predictor(img_gray, bestFace).parts()
			newList = []
			for p in predictorArray:
				newList.append((p.x, p.y))
			databaseFeatures.append(newList)
	databaseFeatures = np.array(databaseFeatures)
	return databaseFeatures

def apply_homography(H, x, y):
    matrix = np.stack((x, y, np.ones(x.shape)))
    applied_homography = H.dot(matrix)
    X = np.divide(applied_homography[0], applied_homography[2])
    Y = np.divide(applied_homography[1], applied_homography[2])
    stack = np.vstack((X.transpose(), Y.transpose())).transpose()
    return stack

def SSD_inlier(new_src_feat, tgtFeatures):
	inter = np.square(np.array(new_src_feat) - np.array(tgtFeatures))
	inter2 = np.sqrt(inter[:, 0] + inter[:, 1])
	inter2 = inter2<1
	return np.sum(inter2)

def drawFeaturesOnImage(features, imageName):
	image = cv2.imread(imageName)
	for feature in features:
		print feature
		cv2.circle(image, (feature[0], feature[1]), 5, (0, 255, 0), -1)
	cv2.imshow('test', image)
	cv2.waitKey(0)

def testInputtedPicture(databaseFeatures, testImg):
	testReadImg = testImg
	testGrayImg = cv2.cvtColor(testReadImg, cv2.COLOR_BGR2GRAY)
	faces, scores, idx = detector.run(testGrayImg, 1, -1)
	bestFace = getBestFaceInFaceArray(faces, scores)
	predictorArray = predictor(testGrayImg, bestFace).parts()
	currImgList = []
	for p in predictorArray:
		currImgList.append((p.x, p.y))
	currImgList = np.array(currImgList)

	maxInliers = -1
	minIn = -1
	for j, ft in enumerate(databaseFeatures):
		[H, temp] = cv2.findHomography(np.array(currImgList), np.array(ft));
		# print "Homography"
		# print H
		new_src_feat = apply_homography(H, np.reshape(currImgList[:,0], (-1,)), np.reshape(currImgList[:,1], (-1,)))
		# drawFeaturesOnImage(currImgList, testImg)

		num_inliers = SSD_inlier(new_src_feat, ft)
		print images[j]
		print "num inliers:" + str(num_inliers)
		# print "Num features: " + str(len(ft))
		if num_inliers > maxInliers:
			maxInliers = num_inliers
			minIn = j


	bestSrcIm = images[minIn]
	return bestSrcIm

		


def main_function(image):
        try:
            dbFeatures = populateDatabaseFeatures()
	    return testInputtedPicture(dbFeatures, image)
        except:
            print "couldnt find face"
            return "SadatShaik.jpg"
