const express = require("express");
const route = express.Router();
const absensiController = require("../controllers/absensi-controller");
const {
  verifyJWT,
  verifyRole,
} = require("../middlewares/verify-jwt-middleware");

route.post("/checkin", verifyJWT, absensiController.checkin);
route.get("/all", absensiController.getAllAbsensi);
route.get("/histori-karyawan", verifyJWT, absensiController.getHistoriKaryawan);
route.put(
  "/verifikasi/:id",
  // verifyJWT,
  // verifyRole("ADMIN"),
  absensiController.verifikasiAbsensi
);

module.exports = route;
