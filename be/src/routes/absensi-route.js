const express = require("express");
const route = express.Router();
const absensiController = require("../controllers/absensi-controller");
const {
  verifyJWT,
  verifyRole,
} = require("../middlewares/verify-jwt-middleware");

route.post(
  "/checkin",
  verifyJWT,
  verifyRole("KARYAWAN"),
  verifyJWT,
  absensiController.checkin
);
route.get(
  "/all",
  verifyJWT,
  verifyRole("ADMIN"),
  absensiController.getAllAbsensi
);
route.get("/histori-karyawan", verifyJWT, absensiController.getHistoriKaryawan);
route.patch(
  "/verifikasi/:id",
  verifyJWT,
  verifyRole("ADMIN"),
  absensiController.verifikasiAbsensi
);
route.get(
  "/filter",
  verifyJWT,
  verifyRole("ADMIN"),
  absensiController.filterAbsensi
);
route.get("/dashboard/recent-checkin",  verifyJWT,
  verifyRole("ADMIN"),absensiController.getRecentCheckIns)

module.exports = route;
