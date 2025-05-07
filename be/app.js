require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const autentifikasiRoute = require("./src/routes/autentifikasi-route")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/autentifikasi", autentifikasiRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
