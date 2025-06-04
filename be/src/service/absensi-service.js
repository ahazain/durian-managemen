const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
const { NotFoundError, BadRequestError } = require("../utils/error-handling");
const { startOfMonth, endOfMonth } = require("date-fns");

class AbsensiService {
  static async checkin(id) {
    const nowUtc = dayjs.utc();
    const nowWib = nowUtc.tz("Asia/Jakarta");
    console.log("NOW WIB:", nowWib.format());

    // Dapatkan rentang hari ini dalam WIB, lalu convert ke UTC
    const startOfDayWIB = dayjs()
      .tz("Asia/Jakarta")
      .startOf("day")
      .utc()
      .toDate();
    const endOfDayWIB = dayjs().tz("Asia/Jakarta").endOf("day").utc().toDate();

    console.log("StartOfDay UTC:", startOfDayWIB);
    console.log("EndOfDay UTC:", endOfDayWIB);

    const jadwalHariIni = await prisma.jadwal.findMany({
      where: {
        users: {
          some: {
            userId: id,
          },
        },
        tanggal_mulai: { lte: endOfDayWIB },
        tanggal_selesai: { gte: startOfDayWIB },
      },
    });

    console.log("Jadwal:", jadwalHariIni);

    if (jadwalHariIni.length === 0) {
      throw new NotFoundError("Tidak ada jadwal kerja untuk hari ini");
    }

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

  static async getAllAbsensi() {
    return prisma.absensi.findMany({
      include: {
        user: true,
        jadwal: true,
      },
      orderBy: { tanggal: "desc" },
    });
  }

  static async getHistoriKaryawan(id) {
    const absensi = await prisma.absensi.findMany({
      where: {
        user_id: id,
      },
      orderBy: { tanggal: "desc" },
    });

    if (!absensi) throw new NotFoundError("Absensi tidak ditemukan");

    return absensi;
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
  static async filterAbsensi(status) {
    let whereClause = {};

    if (status === "verified") {
      whereClause.verifikasi = true;
    } else if (status === "unverified") {
      whereClause.verifikasi = false;
    }

    const [data, totalVerified, totalUnverified] = await Promise.all([
      prisma.absensi.findMany({
        where: whereClause,
        include: {
          user: true,
          jadwal: true,
        },
        orderBy: {
          tanggal: "desc",
        },
      }),
      prisma.absensi.count({
        where: {
          verifikasi: true,
        },
      }),
      prisma.absensi.count({
        where: {
          verifikasi: false,
        },
      }),
    ]);

    return {
      data,
      count: {
        verifikasi: totalVerified,
        pending: totalUnverified,
      },
    };
  }

  static async getAbsensiKaryawanById(id) {
    const now = new Date();
    const awalBulan = startOfMonth(now);
    const akhirBulan = endOfMonth(now);

    const absensiBulanIni = await prisma.absensi.findMany({
      where: {
        user_id: id,
        tanggal: {
          gte: awalBulan,
          lte: akhirBulan,
        },
      },
      select: {
        status: true, // enum: HADIR, ALPHA, TERLAMBAT
      },
    });

    if (!absensiBulanIni || absensiBulanIni.length === 0) {
      return {
        bulan: now.toLocaleString("id-ID", { month: "long" }),
        hadir: "0 hari",
        absen: "0 hari",
        telat: "0 hari",
      };
    }

    // Hitung jumlah berdasarkan enum status
    let hadir = 0,
      absen = 0,
      telat = 0;

    for (const a of absensiBulanIni) {
      switch (a.status) {
        case "HADIR":
          hadir++;
          break;
        case "ALPHA":
          absen++;
          break;
        case "TERLAMBAT":
          telat++;
          break;
      }
    }

    return {
      bulan: now.toLocaleString("id-ID", { month: "long" }),
      hadir: `${hadir} hari`,
      absen: `${absen} hari`,
      telat: `${telat} hari`,
    };
  }
}

module.exports = AbsensiService;
