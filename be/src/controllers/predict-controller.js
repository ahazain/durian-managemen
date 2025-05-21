const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

exports.predictDurian = async (req, res) => {
  try {
    const imagePath = req.file.path;

    const form = new FormData();
    form.append("file", fs.createReadStream(imagePath));

    const response = await axios.post("http://localhost:8000/predict", form, {
      headers: form.getHeaders(),
    });

    const { jenis, grade } = response.data;

    // Simpan ke database jika perlu
    const newPrediksi = await prisma.prediksi.create({
      data: {
        imageUrl: imagePath, // atau simpan ke cloud lalu URL-nya
        user_id: req.user.id, // pastikan user sudah login
        kualitas: jenis,
        harga: grade !== "-" ? 50000 : null, // misalnya
      },
    });

    res.json({
      message: "Prediksi berhasil",
      prediksi: newPrediksi,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memproses prediksi" });
  }
};
