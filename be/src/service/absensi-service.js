const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const { NotFoundError, BadRequestError } = require("../utils/error-handling");

class AbsensiService {
  static async checkin(id) {
    const now = dayjs().utc().toDate();
    console.log("NOW UTC:", now.toISOString());

    // Ambil semua jadwal hari ini untuk user
    const jadwalHariIni = await prisma.jadwal.findMany({
      where: {
        id_user: id,
        tanggal_mulai: { lte: now },
        tanggal_selesai: { gte: now },
      },
    });

    console.log("Jadwal:", jadwalHariIni);

    if (jadwalHariIni.length === 0) {
      throw new NotFoundError("Tidak ada jadwal kerja untuk hari ini");
    }

    // Cek apakah user sudah absen hari ini
    const sudahAbsen = await prisma.absensi.findFirst({
      where: {
        user_id: id,
        tanggal: {
          gte: dayjs().utc().startOf("day").toDate(),
          lte: dayjs().utc().endOf("day").toDate(),
        },
      },
    });

    if (sudahAbsen) {
      throw new BadRequestError("Anda sudah melakukan absen hari ini");
    }

    // Status awal adalah HADIR
    let status = "HADIR";

    // Periksa setiap jadwal untuk user pada hari ini
    for (let jadwal of jadwalHariIni) {
      const waktuMasuk = dayjs(jadwal.tanggal_mulai);
      const waktuSelesai = dayjs(jadwal.tanggal_selesai);
      const waktuSekarang = dayjs().utc();

      console.log("Waktu Masuk:", waktuMasuk.toISOString());
      console.log("Waktu Selesai:", waktuSelesai.toISOString());

      // Cek apakah waktu sekarang berada dalam rentang jadwal
      if (
        waktuSekarang.isBefore(waktuMasuk) ||
        waktuSekarang.isAfter(waktuSelesai)
      ) {
        continue; // Lanjutkan ke jadwal berikutnya jika di luar rentang jadwal ini
      }

      // Jika terlambat (lebih dari 15 menit setelah waktu masuk)
      if (waktuSekarang.isAfter(waktuMasuk.add(15, "minute"))) {
        status = "TERLAMBAT";
      }

      // Jika sudah ditemukan jadwal yang sesuai, kita keluar dari loop
      break;
    }

    // Simpan absensi dengan status yang sudah dihitung
    return prisma.absensi.create({
      data: {
        tanggal: now,
        status,
        user_id: id,
      },
    });
  }

  static async getByKaryawan(id) {
    return prisma.absensi.findMany({
      where: { id },
      orderBy: { tanggal: "desc" },
    });
  }

  static async verifikasiAbsensi(id) {
    const absensi = await prisma.absensi.findUnique({
      where: { id },
    });
    if (!absensi) throw new NotFoundError("Absensi tidak ditemukan");

    return prisma.absensi.update({
      where: { id },
      data: { verifikasi: true },
    });
  }
}

module.exports = AbsensiService;
