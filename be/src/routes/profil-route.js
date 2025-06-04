const express = require("express");
const route = express.Router();
const profilController = require("../controllers/profil-controller");
const {
  verifyJWT,
  verifyRole,
} = require("../middlewares/verify-jwt-middleware");
const { updateProfil } = require("../service/profil-service");
route.put("/profil/update-profil", verifyJWT, profilController.updateProfil);
route.get("/profil/all", profilController.getAll);
route.get("/profil/all-karyawan", profilController.getAllKaryawan);
route.get("/profil", verifyJWT, profilController.getById);
route.put("/profil/update-password", verifyJWT, profilController.updatePassword )
route.post('/profil/send-email',profilController.forgetPassword);
route.post('/profil/reset-password',  profilController.resetPassword);

module.exports = route;
