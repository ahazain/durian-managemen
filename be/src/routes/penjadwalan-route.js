const express = require("express");
const route = express.Router();
const penjadwalanController = require("../controllers/penjadwalan-controller");
//admin
route.post("/", penjadwalanController.addJadwalKerja);
route.get("/", penjadwalanController.getJadwalKerja);
route.put("/:id", penjadwalanController.updateJadwalKerja);
route.delete("/:id", penjadwalanController.deleteJadwalKerja)
route.get("/:id", penjadwalanController.getById);

//user

/*
ini kita coba integrasikan penjadwalan untuk admin dan user.namun kita kesampinkan autentifikasi dulu ya
add-jadwal-kerja - post = http://localhost:3000/api/v1/penjadwalan
update-jadwal-kerja - put = http://localhost:3000/api/v1/penjadwalan/:id
delete-jadwal-kerja- delte = http://localhost:3000/api/v1/penjadwalan/:id
get-jadwal-kerja - get all = http://localhost:3000/api/v1/penjadwalan
get-jadwal-kerja - get by id = http://localhost:3000/api/v1/penjadwalan/:id

ini yang endpoin profil ini bisa di pakek autentifikasinya

*/



module.exports = route;
