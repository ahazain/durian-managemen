const express = require("express");
const route = express.Router();
const penjadwalanController = require("../controllers/penjadwalan-controller");
const {
  verifyJWT,
  verifyRole,
} = require("../middlewares/verify-jwt-middleware");

route.post(
  "/",
  verifyJWT,
  verifyRole("ADMIN"),
  penjadwalanController.addJadwalKerja
); //admin
route.get(
  "/",
  verifyJWT,
  verifyRole("ADMIN"),
  penjadwalanController.getJadwalKerja
); //admin
route.get(
  "/karyawan",
  verifyJWT,
  verifyRole("KARYAWAN"),
  verifyJWT,
  penjadwalanController.getByKaryawan
); //karyawan
route.put(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN"),
  penjadwalanController.updateJadwalKerja
); //admin
route.delete(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN"),
  penjadwalanController.deleteJadwalKerja
); //admin
// route.get(
//   "/:id",
//   verifyJWT,
//   verifyRole("ADMIN"),
//   penjadwalanController.getById
// );

module.exports = route;
