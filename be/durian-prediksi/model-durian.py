import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models 
from sklearn.preprocessing import LabelEncoder
from sqlalchemy import create_engine

import pandas as pd
import numpy as np
import os
from PIL import Image

# Konfigurasi
IMG_SIZE = (128, 128)
DATA_DIR = "dataset/"
CSV_PATH = "labels.csv"

# Load label
engine = create_engine('postgresql://postgres:12345@localhost:5432/durian-management')
df = pd.read_sql_table('DurianData', engine)

# Encode label
jenis_map = {'Musang King': 0, 'Montong': 1}
grade_map = {'A': 0, 'B': 1}
if df['jenis'].isnull().any():
    print("❌ Ada nilai 'jenis' yang tidak dikenali:")
    print(df[df['jenis'].isnull()])
    exit()


df['jenis'] = df['jenis'].map(jenis_map)
df['grade'] = df['grade'].map(grade_map)

# Load gambar & preprocess
X = []
for fname in df['filename']:
    img = Image.open(os.path.join(DATA_DIR, fname)).convert('RGB')
    img = img.resize(IMG_SIZE)
    X.append(np.array(img) / 255.0)
X = np.array(X)


y_jenis = tf.keras.utils.to_categorical(df['jenis'], num_classes=2)
y_grade = tf.keras.utils.to_categorical(df['grade'], num_classes=2)
y_harga = np.array(df['harga']) / 100000  

# Model
input_layer = layers.Input(shape=(128, 128, 3))

x = layers.Conv2D(16, (3, 3), activation='relu')(input_layer)
x = layers.MaxPooling2D()(x)
x = layers.Conv2D(32, (3, 3), activation='relu')(x)
x = layers.MaxPooling2D()(x)
x = layers.Flatten()(x)
x = layers.Dense(64, activation='relu')(x)

output_jenis = layers.Dense(2, activation='softmax', name='jenis_output')(x)
output_grade = layers.Dense(2, activation='softmax', name='grade_output')(x)
output_harga = layers.Dense(1, activation='linear', name='harga_output')(x)

model = models.Model(inputs=input_layer, outputs=[output_jenis, output_grade, output_harga])

model.compile(
    optimizer='adam',
    loss={
        'jenis_output': 'categorical_crossentropy',
        'grade_output': 'categorical_crossentropy',
        'harga_output': 'mse'
    },
    metrics={
        'jenis_output': 'accuracy',
        'grade_output': 'accuracy',
        'harga_output': 'mae'
    }
)

model.summary()

# Train
model.fit(X, [y_jenis, y_grade, y_harga], epochs=10)