const response = require("../utils/response");
const absensiService = require("../service/absensi-service");

class AbsensiController {
  static async checkin(req, res) {
    try {
      const { id } = req.user;
      const data = await absensiService.checkin(id);
      const msg =
        data.status === "TERLAMBAT"
          ? "Berhasil absen (Terlambat), menunggu verifikasi admin"
          : "Berhasil absen, menunggu verifikasi admin";

      return response.created(res, data, msg);
    } catch (error) {
      return response.error(res, error);
    }
  }
  static async getAllAbsensi(req, res) {
    try {
      const data = await absensiService.getAllAbsensi();
      return response.success(res, data, "Data absensi berhasil ditampilkan");
    } catch (error) {
      return response.error(res, error);
    }
  }

  static async getHistoriKaryawan(req, res) {
    try {
      const { id } = req.user;
      const data = await absensiService.getHistoriKaryawan(id);
      return response.success(
        res,
        data,
        "Data history absensi karyawan berhasil ditampilkan"
      );
    } catch (error) {
      return response.error(res, error);
    }
  }

  static async verifikasiAbsensi(req, res) {
    try {
      const { id } = req.params;
      const data = await absensiService.verifikasiAbsensi(id);
      return response.success(res, data, "Absensi berhasil diverifikasi");
    } catch (error) {
      return response.error(res, error);
    }
  }

  static async filterAbsensi(req, res) {
    try {
        const {status} = req.query;
        const data = await absensiService.filterAbsensi(status);
        return response.success(res, data, "Data absensi berhasil difilter");
    } catch (error) {
      return response.error(res, error);
        
    }
  }
}

module.exports = AbsensiController;
