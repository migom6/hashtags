import os
import base64
import requests
from flask import Flask, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename

import nn_checker

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
ALLOWED_EXTENSIONS = set(['py', 'png', 'jpg', 'jpeg', 'gif'])

CLARIFAI_HEADERS = {
    "Content-Type": "application/json",
    #"Authorization": "Key d4a8050a95d043aba98fb21a2f68c087"
    "Authorization": "Key ef7c1ac01e044348bc491434df22d637"

}

CLARIFAI_URL = "https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs"

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return True
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def get_clarifai_payload(contents):
    return {
        "inputs": [{
            "data": {
            "image": {
                "base64": contents
                }
            }
        }]
    }


def parse_clarfai_response(res):
    concepts = res['outputs'][0]['data']['concepts']
    hashtags = [each['name'] for each in concepts][:6]
    return hashtags


@app.route('/', methods=['GET', 'POST'])
def upload_file():
    print(request.method, request.files)
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return jsonify({'status': 400, 'message': 'No file provided'})
        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            print('no filename')
            flash('No selected file')
            return jsonify({'message': 'no filename here'})
        print(file.filename)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            encoded_string = base64.b64encode(file.read()).decode('utf-8')
            res = requests.post(CLARIFAI_URL, 
                                headers=CLARIFAI_HEADERS, 
                                json=get_clarifai_payload(encoded_string)
                                )
            print(res)
            return jsonify({
                'status': 200, 
                'hashtags': parse_clarfai_response(res.json())
            })
    return jsonify({'message': 'get not allowed'}, 200)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)