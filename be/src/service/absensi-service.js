const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
const { NotFoundError, BadRequestError } = require("../utils/error-handling");

class AbsensiService {
  static async checkin(id) {
    const nowUtc = dayjs.utc();
    const nowWib = nowUtc.tz("Asia/Jakarta");
    console.log("NOW WIB:", nowWib.format());

    const jadwalHariIni = await prisma.jadwal.findMany({
      where: {
        id_user: id,
        tanggal_mulai: { lte: nowUtc.toDate() },
        tanggal_selesai: { gte: nowUtc.toDate() },
      },
    });

    console.log("Jadwal:", jadwalHariIni);

    if (jadwalHariIni.length === 0) {
      throw new NotFoundError("Tidak ada jadwal kerja untuk hari ini");
    }

    const startOfDayWIB = dayjs()
      .tz("Asia/Jakarta")
      .startOf("day")
      .utc()
      .toDate();
    const endOfDayWIB = dayjs().tz("Asia/Jakarta").endOf("day").utc().toDate();

    for (let jadwal of jadwalHariIni) {
      const sudahAbsen = await prisma.absensi.findFirst({
        where: {
          user_id: id,
          jadwal_id: jadwal.id,
        },
      });

      if (sudahAbsen) {
        throw new BadRequestError(
          `Anda sudah melakukan absen pada jadwal ${jadwal.title}`
        );
      }

      let status = "HADIR";

      const waktuMasuk = dayjs(jadwal.tanggal_mulai);
      const waktuSelesai = dayjs(jadwal.tanggal_selesai);
      const waktuSekarang = nowUtc;

      console.log("Waktu Masuk:", waktuMasuk.toISOString());
      console.log("Waktu Selesai:", waktuSelesai.toISOString());

      if (
        waktuSekarang.isBefore(waktuMasuk) ||
        waktuSekarang.isAfter(waktuSelesai)
      ) {
        continue; // Jika sekarang tidak dalam rentang waktu jadwal
      }

      // Kalau sudah lewat 15 menit dari waktu masuk, statusnya terlambat
      if (waktuSekarang.isAfter(waktuMasuk.add(15, "minute"))) {
        status = "TERLAMBAT";
      }

      await prisma.absensi.create({
        data: {
          tanggal: nowUtc.toDate(),
          status,
          user_id: id,
          jadwal_id: jadwal.id,
        },
      });

      return { message: "Absen berhasil!" };
    }

    // Jika tidak ada absensi yang cocok, lempar error
    throw new NotFoundError("Tidak ada jadwal yang cocok untuk waktu saat ini");
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
