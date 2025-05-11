const express = require("express");
const route = express.Router();
const profilController = require("../controllers/profil-controller");
const {
  verifyJWT,
  verifyRole,
} = require("../middlewares/verify-jwt-middleware");
// route.get("/profil-all", verifyJWT, profilController.getProfil);
route.put("/profil", verifyJWT, profilController.updateProfil);
route.get("/profil/all", profilController.getAll);
route.get("/profil/all-karyawan", profilController.getAllKaryawan);
route.get("/profil", verifyJWT, profilController.getById);

module.exports = route;
