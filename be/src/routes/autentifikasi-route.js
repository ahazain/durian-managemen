const express = require("express");
const route = express.Router();
const autentifikasiController = require("../controllers/autentifikasi-controller");

route.post("/register", autentifikasiController.register);
route.post("/login", autentifikasiController.login);

module.exports = route;
