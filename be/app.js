require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const autentifikasiRoute = require("./src/routes/autentifikasi-route");
const profilRoute = require("./src/routes/profil-route");
const penjadwalanRoute = require("./src/routes/penjadwalan-route")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/autentifikasi", autentifikasiRoute);
app.use("/api/v1", profilRoute),
app.use("/api/v1/penjadwalan", penjadwalanRoute)
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
