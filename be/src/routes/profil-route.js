const express = require("express");
const route = express.Router();
const profilController = require("../controllers/profil-controller");
const {
  verifyJWT,
  verifyRole,
} = require("../middlewares/verify-jwt-middleware");
route.get("/profil", verifyJWT, profilController.getProfil);
route.put("/profil", verifyJWT, profilController.updateProfil);
route.get("/profil/all-karyawan", profilController.getAllKaryawan);

module.exports = route;
/*
ini kita coba integrasikan penjadwalan untuk admin dan user.namun kita kesampinkan autentifikasi dulu ya
add-jadwal-kerja - post = http://localhost:3000/api/v1/penjadwalan
update-jadwal-kerja - put = http://localhost:3000/api/v1/penjadwalan/:id
delete-jadwal-kerja- delte = http://localhost:3000/api/v1/penjadwalan/:id
get-jadwal-kerja - get all = http://localhost:3000/api/v1/penjadwalan
get-jadwal-kerja - get by id = http://localhost:3000/api/v1/penjadwalan/:id

ini yang endpoin profil ini bisa di pakek autentifikasinya tpi masih autenteifikasi bukan authorization role jadi masih umum
get all role = http://localhost:3000/api/v1/profil
get all role karyawan = http://localhost:3000/api/v1/profil/karyawan
update profil = http://localhost:3000/api/v1/profil

*/