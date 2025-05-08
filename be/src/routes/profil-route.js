const express = require("express");
const route = express.Router();
const profilController = require("../controllers/profil-controller");
const {
  verifyJWT,
  verifyRole,
} = require("../middlewares/verify-jwt-middleware");
route.get("/profil", verifyJWT, profilController.getProfil);
route.put("/profil", verifyJWT, profilController.updateProfil);

module.exports = route;
