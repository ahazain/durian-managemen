from flask import Flask, request, jsonify
import torch
import os
from PIL import Image
import cv2

app = Flask(__name__)
model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt')

def hitung_grade_dan_harga(label, xmin, ymin, xmax, ymax):
    luas = (xmax - xmin) * (ymax - ymin)

    if label == "not durian":
        return "X", 0
    elif label in ["musang king", "black thorn", "monthong", "kanyao"]:
        if luas > 50000:
            return "A", 100000
        elif luas > 30000:
            return "B", 70000
        else:
            return "C", 50000
    elif label == "bawor":
        if luas > 50000:
            return "B", 70000
        else:
            return "C", 50000
    else:
        return "C", 50000

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']
    image_path = os.path.join('temp', image_file.filename)
    image_file.save(image_path)

    results = model(image_path)
    output = []

    for r in results:
        for box in r.boxes:
            cls_id = int(box.cls)
            conf = float(box.conf)
            xyxy = box.xyxy[0].tolist()
            xmin, ymin, xmax, ymax = map(int, xyxy)
            label = model.names[cls_id]

            grade, harga = hitung_grade_dan_harga(label, xmin, ymin, xmax, ymax)

            output.append({
                "label": label,
                "confidence": conf,
                "xmin": xmin,
                "ymin": ymin,
                "xmax": xmax,
                "ymax": ymax,
                "grade": grade,
                "harga": harga
            })

    os.remove(image_path)
    return jsonify(output)

if __name__ == '__main__':
    os.makedirs('temp', exist_ok=True)
    app.run(host='0.0.0.0', port=5000)
