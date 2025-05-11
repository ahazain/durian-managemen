const profilService = require("../service/profil-service");
const response = require("../utils/response");

class ProfilController {
  static async getProfil(req, res) {
    const user = req.user;
    try {
      const data = await profilService.getProfil(user);
      return response.success(res, data, "berhasil menampilkan profil");
    } catch (error) {
      return response.error(res, error);
    }
  }

  static async updateProfil(req, res) {
    try {
      const { id } = req.user;
      const { nama, email } = req.body;
      const data = await profilService.updateProfil({ nama, email, id });
      return response.success(res, data, "berhasil melakukan perubahan");
    } catch (error) {
      return response.error(res, error);
    }
  }

  static async getAllKaryawan(req, res) {
    try {
      const { role } = req.query;
      const data = await profilService.getAllKaryawan(role);
      return response.success(
        res,
        data,
        "berhasil menampilkan semua list karyawan"
      );
    } catch (error) {
      return response.error(res, error);
    }
  }
  static async getById(req, res) {
    try {
      const { id } = req.user;
      const data = await profilService.getById(id);
      return response.success(res, data, "berhasil menampilkan detail profil");
    } catch (error) {
      return response.error(res, error);
    }
  }
}

module.exports = ProfilController;
