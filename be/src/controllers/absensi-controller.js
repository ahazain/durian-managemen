const response = require("../utils/response");
const absensiService = require("../service/absensi-service");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
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
      const { status } = req.query;
      const data = await absensiService.filterAbsensi(status);
      return response.success(res, data, "Data absensi berhasil difilter");
    } catch (error) {
      return response.error(res, error);
    }
  }

  static async getRecentCheckIns(req, res) {
    try {
      const data = await prisma.absensi.findMany({
        where: {
          status: { in: ["HADIR", "TERLAMBAT"] },
          verifikasi: true,
        },
        orderBy: {
          tanggal: "desc",
        },
        take: 5,
        include: {
          user: {
            select: { nama: true },
          },
        },
      });

      const result = data.map((absen) => ({
        nama: absen.user.nama,
        tanggal: absen.tanggal,
        status: absen.status,
      }));

      return response.success(
        res,
        result,
        "Berhasil ambil data check-in terbaru"
      );
    } catch (error) {
      console.error(error);
      return response.error(res, error, "Gagal mengambil data check-in", 500);
    }
  }

  static async getAbsensiKaryawanById(req, res) {
    try {
      const { id } = req.user;
      const data = await absensiService.getAbsensiKaryawanById(id);
      return response.success(
        res,
        data,
        "Data absensi karyawan berhasil ditampilkan per bulan ini"
      );
    } catch (error) {
      return response.error(res, error);
    }
  }
}

module.exports = AbsensiController;
