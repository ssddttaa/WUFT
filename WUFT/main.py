from flask import Flask, request, send_from_directory
import urllib
import cv2
import numpy as np
from wuft import main_function
from flask_cors import CORS, cross_origin

# ip_address = 'http://i.vimeocdn.com/portrait/58832_300x300'
ip_address = 'http://165.123.237.108:8000/camera/jpeg'

app = Flask(__name__, static_url_path='')
CORS(app)

@app.route("/")
def hello():
	returned = main_function(cv2.imread('static/current.jpg'))
        return "{\"path\":\"http://54.89.49.5:8000/img/"+returned+"\",\"name\":\""+returned+"\"}"

@app.route("/index/")
def test():
	return "hello world"
	#
@app.route("/img/<path:path>")
def serveImage(path):
        return send_from_directory('data', path)

@app.route("/static")
def serveImageStatic():
        return send_from_directory('static', 'current.jpg')
if __name__ == '__main__':
    app.run(host='0.0.0.0', threaded=True, debug=True, port=8000) 
