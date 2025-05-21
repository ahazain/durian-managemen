import pandas as pd
import numpy as np
import os
from PIL import Image
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
from tensorflow.keras import layers, models
from sklearn.utils import shuffle

IMG_SIZE = (128, 128)

# === Load Dataset === #
path_jenis = "/content/drive/MyDrive/ppl-adpl-gendar/jenis_durian"
df_jenis = pd.read_csv(os.path.join(path_jenis, "_annotations.csv"))[['filename', 'class']].drop_duplicates()
df_jenis.rename(columns={'class': 'class_jenis'}, inplace=True)

path_grade = "/content/drive/MyDrive/ppl-adpl-gendar/grade_durian"
df_grade = pd.read_csv(os.path.join(path_grade, "_annotations.csv"))[['filename', 'class']].drop_duplicates()
df_grade.rename(columns={'class': 'class_grade'}, inplace=True)

path_negatif = "/content/drive/MyDrive/ppl-adpl-gendar/negatif_durian"
df_negatif = pd.read_csv(os.path.join(path_negatif, "_annotations.csv"))[['filename', 'class']].drop_duplicates()
df_negatif['class_jenis'] = 'bukan_durian'
df_negatif['class_grade'] = 'bukan_durian'
df_negatif = df_negatif.drop(columns=['class'])

# === Gabungkan dataset berdasarkan filename ===
# Merge jenis dan grade berdasarkan filename (outer join untuk mengakomodasi semua)
df = pd.merge(df_jenis, df_grade, on='filename', how='outer')

# Tambahkan data negatif durian
df = pd.concat([df, df_negatif[['filename', 'class_jenis', 'class_grade']]], ignore_index=True)

# Hilangkan duplikat jika ada
df = df.drop_duplicates(subset=['filename']).reset_index(drop=True)

# === Buat kolom filepath lengkap ===
# Karena file bisa ada di folder berbeda, buat fungsi untuk resolve filepath sesuai label
def resolve_filepath(row):
    # Cek apakah file ada di folder jenis_durian
    jenis_path = os.path.join(path_jenis, row['filename'])
    grade_path = os.path.join(path_grade, row['filename'])
    negatif_path = os.path.join(path_negatif, row['filename'])

    if os.path.exists(jenis_path):
        return jenis_path
    elif os.path.exists(grade_path):
        return grade_path
    elif os.path.exists(negatif_path):
        return negatif_path
    else:
        return None  # file tidak ditemukan

df['filepath'] = df.apply(resolve_filepath, axis=1)

# Buang data yang file-nya tidak ketemu
df = df[df['filepath'].notnull()].reset_index(drop=True)

# Isi NaN dengan label khusus 'unknown' agar konsisten
df['class_jenis'] = df['class_jenis'].fillna('unknown')
df['class_grade'] = df['class_grade'].fillna('unknown')

print("Jumlah data setelah merge:", len(df))

# === Label Encoding ===
le_jenis = LabelEncoder()
df['class_jenis_encoded'] = le_jenis.fit_transform(df['class_jenis'])

le_grade = LabelEncoder()
df['class_grade_encoded'] = le_grade.fit_transform(df['class_grade'])

print("Label Jenis Durian:", le_jenis.classes_)
print("Label Grade Durian:", le_grade.classes_)

# === Load Gambar === #
X = []
for filepath in df['filepath']:
    img = Image.open(filepath).convert('RGB').resize(IMG_SIZE)
    X.append(np.array(img) / 255.0)
X = np.array(X)

# Target (One-hot)
y_jenis = tf.keras.utils.to_categorical(df['class_jenis_encoded'], num_classes=len(le_jenis.classes_))
y_grade = tf.keras.utils.to_categorical(df['class_grade_encoded'], num_classes=len(le_grade.classes_))

# === MODEL MULTI-OUTPUT === #
input_layer = layers.Input(shape=(IMG_SIZE[0], IMG_SIZE[1], 3))
x = layers.Conv2D(32, (3, 3), activation='relu')(input_layer)
x = layers.MaxPooling2D()(x)
x = layers.Conv2D(64, (3, 3), activation='relu')(x)
x = layers.MaxPooling2D()(x)
x = layers.Flatten()(x)
x = layers.Dense(128, activation='relu')(x)

output_jenis = layers.Dense(len(le_jenis.classes_), activation='softmax', name='jenis')(x)
output_grade = layers.Dense(len(le_grade.classes_), activation='softmax', name='grade')(x)

model = models.Model(inputs=input_layer, outputs=[output_jenis, output_grade])
model.compile(optimizer='adam',
              loss={'jenis': 'categorical_crossentropy', 'grade': 'categorical_crossentropy'},
              metrics={'jenis': 'accuracy', 'grade': 'accuracy'})

model.summary()

# === TRAINING === #
model.fit(X, {'jenis': y_jenis, 'grade': y_grade}, epochs=10, batch_size=32)


def predict_image_multi(path, threshold_jenis=0.7, threshold_grade=0.6):
    img = Image.open(path).convert('RGB').resize(IMG_SIZE)
    img_arr = np.expand_dims(np.array(img) / 255.0, axis=0)

    pred_jenis, pred_grade = model.predict(img_arr)
    max_prob_jenis = np.max(pred_jenis)
    max_prob_grade = np.max(pred_grade)

    label_jenis = le_jenis.inverse_transform([np.argmax(pred_jenis)])[0]
    label_grade = le_grade.inverse_transform([np.argmax(pred_grade)])[0]

    if max_prob_jenis < threshold_jenis or label_jenis == 'bukan_durian' :
        return 'bukan_durian', '-'

    elif label_jenis == 'unknown':
        return '-', '-'

    else:
        if max_prob_grade >= threshold_grade:
            return label_jenis, label_grade
        else:
            return label_jenis, '-'
        # Simpan model
model.save('model_durian.h5')

# Download ke lokal
from google.colab import files
files.download('model_durian.h5')

