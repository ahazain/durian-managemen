require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const autentifikasiRoute = require("./src/routes/autentifikasi-route")
const profilRoute = require("./src/routes/profil-route")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/autentifikasi", autentifikasiRoute);
app.unsubscribe("/api/v1", profilRoute)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
