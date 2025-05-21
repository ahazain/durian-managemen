from fastapi import FastAPI, UploadFile, File
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import uvicorn
import os

# Load model dan label encoder
model = load_model('model_durian.h5')
# load label encoder-nya juga kalau disimpan via pickle
import joblib
le_jenis = joblib.load('le_jenis.pkl')
le_grade = joblib.load('le_grade.pkl')

app = FastAPI()

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    img = Image.open(file.file).convert("RGB").resize((128, 128))
    img_arr = np.expand_dims(np.array(img) / 255.0, axis=0)

    pred_jenis, pred_grade = model.predict(img_arr)
    label_jenis = le_jenis.inverse_transform([np.argmax(pred_jenis)])[0]
    label_grade = le_grade.inverse_transform([np.argmax(pred_grade)])[0]

    return {
        "jenis": label_jenis,
        "grade": label_grade
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
