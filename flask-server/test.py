import requests

CLARIFAI_HEADERS = {
    "Content-Type": "application/json",
    "Authorization": "Key d4a8050a95d043aba98fb21a2f68c087"
}

CLARIFAI_URL = "https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs"
# CLARIFAI_URL = "https://requestb.in/129uzc51"

import base64

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


with open("image.jpg", 'rb') as f:
    contents = (base64.b64encode(f.read())).decode('utf-8')

res = requests.post(CLARIFAI_URL, json=get_clarifai_payload(contents), headers=CLARIFAI_HEADERS)
print(res.text)

