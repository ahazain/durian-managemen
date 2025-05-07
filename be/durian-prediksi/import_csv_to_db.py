import pandas as pd
from sqlalchemy import create_engine

# Konfigurasi koneksi PostgreSQL
user = "postgres"
password = "12345"
host = "localhost"
port = "5432"
db_name = "durian-management"

# Buat koneksi ke PostgreSQL
engine = create_engine(f'postgresql://{user}:{password}@{host}:{port}/{db_name}')

# Baca CSV
df = pd.read_csv("labels.csv")

# Validasi kolom yang diperlukan
expected_cols = {'filename', 'jenis', 'grade', 'harga'}
if not expected_cols.issubset(df.columns):
    raise ValueError(f"❌ CSV tidak memiliki kolom yang sesuai: {expected_cols}")

# Tulis ke tabel "DurianData"
df.to_sql("DurianData", con=engine, if_exists="replace", index=False)

print("✅ Berhasil memasukkan data ke tabel DurianData")
