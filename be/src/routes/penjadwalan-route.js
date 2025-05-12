const express = require("express");
const route = express.Router();
const penjadwalanController = require("../controllers/penjadwalan-controller");
const {
  verifyJWT,
  verifyRole,
} = require("../middlewares/verify-jwt-middleware");

route.post(
  "/",
  // verifyJWT,
  // verifyRole("ADMIN"),
  penjadwalanController.addJadwalKerja
); //admin
route.get("/", penjadwalanController.getJadwalKerja); //admin
route.get("/karyawan", verifyJWT, penjadwalanController.getByKaryawan); //karyawan
route.put("/:id", penjadwalanController.updateJadwalKerja); //admin
route.delete("/:id", penjadwalanController.deleteJadwalKerja); //admin
route.get("/:id", penjadwalanController.getById); //opsional-sepertinya tidak perlu

module.exports = route;
