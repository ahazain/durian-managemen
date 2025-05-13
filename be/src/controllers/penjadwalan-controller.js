const response = require("../utils/response");
const penjadwalanService = require("../service/penjadwalan-service");
class PenjadwalanController {
  static async addJadwalKerja(req, res) {
    try {
      const { title, deskripsi, tanggal_mulai, tanggal_selesai, user } =
        req.body;
      const data = await penjadwalanService.addJadwalKerja({
        title,
        deskripsi,
        tanggal_mulai,
        tanggal_selesai,
        user,
      });
      return response.created(
        res,
        data,
        "berhasil membuat jadwal kerja untuk para karyawan"
      );
    } catch (error) {
      return response.error(res, error);
    }
  }
  // static async getById(req, res) {
  //   try {
  //     const userId = req.params.id;
  //     const data = await penjadwalanService.getById(userId);
  //     return response.success(res, data, "berhasil menampilkan data by id");
  //   } catch (error) {
  //     return response.error(res, error);
  //   }
  // }

  static async getJadwalKerja(req, res) {
    try {
      const data = await penjadwalanService.getJadwalKerja();
      return response.success(
        res,
        data,
        "berhasil menampilkan semua list jadwal kerja"
      );
    } catch (error) {
      return response.error(res, error);
    }
  }
  static async updateJadwalKerja(req, res) {
    try {
      const { id } = req.params;
      const { title, deskripsi, tanggal_mulai, tanggal_selesai, user } =
        req.body;
      const data = await penjadwalanService.updateJadwalKerja({
        title,
        deskripsi,
        tanggal_mulai,
        tanggal_selesai,
        user,
        id,
      });

      return response.success(
        res,
        data,
        "berhasil melakukan perubahan atau update"
      );
    } catch (error) {
      return response.error(res, error);
    }
  }

  static async deleteJadwalKerja(req, res) {
    try {
      const { id } = req.params;
      const data = await penjadwalanService.deleteJadwalKerja(id);
      return response.success(res, data, "berhasil menghapus jadwal kerja");
    } catch (error) {
      return response.error(res, error);
    }
  }
  static async getByKaryawan(req, res) {
    try {
      const userId = req.user.id;
      const data = await penjadwalanService.getByKaryawan(userId);
      return response.success(res, data, "berhasil menampilka jadwal karyawan");
    } catch (error) {
      return response.error(res, error);
    }
  }
}
module.exports = PenjadwalanController;
