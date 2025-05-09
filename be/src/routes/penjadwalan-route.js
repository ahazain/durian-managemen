const express = require("express");
const route = express.Router();
const penjadwalanController = require("../controllers/penjadwalan-controller");
route.post("/", penjadwalanController.addJadwalKerja);
route.get("/", penjadwalanController.getJadwalKerja);

module.exports = route;
