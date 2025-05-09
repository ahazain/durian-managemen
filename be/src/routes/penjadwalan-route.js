const express = require("express");
const route = express.Router();
const penjadwalanController = require("../controllers/penjadwalan-controller")
route.post('/', penjadwalanController.addJadwalKerja )

module.exports = route