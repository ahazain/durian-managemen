require("dotenv").config();
require("./src/utils/cron");
const express = require("express");
const app = express();
const cors = require("cors");
const autentifikasiRoute = require("./src/routes/autentifikasi-route");
const profilRoute = require("./src/routes/profil-route");
const penjadwalanRoute = require("./src/routes/penjadwalan-route");
const absensiRoute = require("./src/routes/absensi-route");
const predictRoute = require("./src/routes/predict-route");

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/v1/predict", predictRoute);
app.use("/api/v1/autentifikasi", autentifikasiRoute);
app.use("/api/v1", profilRoute),
  app.use("/api/v1/penjadwalan", penjadwalanRoute);
app.use("/api/v1/absensi", absensiRoute);
app.use((error, req, res, next) => {
  console.log(error.stack);
  res.status(error.status || 500).send({
    error: {
      message: error.message || "Internal server error",
    },
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
