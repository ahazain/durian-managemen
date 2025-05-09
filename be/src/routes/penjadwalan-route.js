const express = require("express");
const route = express.Router();
const penjadwalanController = require("../controllers/penjadwalan-controller");
route.post("/", penjadwalanController.addJadwalKerja);
route.get("/", penjadwalanController.getJadwalKerja);
route.put("/:id", penjadwalanController.updateJadwalKerja);
route.delete("/:id", penjadwalanController.deleteJadwalKerja)
route.get("/:id", penjadwalanController.getById);


module.exports = route;
