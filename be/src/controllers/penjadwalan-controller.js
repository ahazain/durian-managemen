const response = require("../utils/response");
const PenjadwalanService = require("../service/penjadwalan-service");
class PenjadwalanController {
  static async addJadwalKerja(req, res) {
    try {
      const { title, deskripsi, tanggal_mulai, tanggal_selesai, user } =
        req.body;
      const data = await PenjadwalanService.addJadwalKerja({
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

  static async getJadwalKerja(req, res) {
    try {
      const data = await PenjadwalanService.getJadwalKerja();
      return response.success(
        res,
        data,
        "berhasil menampilkan semua list jadwal kerja"
      );
    } catch (error) {
      return response.error(res, error);
    }
  }
}
module.exports = PenjadwalanController;
