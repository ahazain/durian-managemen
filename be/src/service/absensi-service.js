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

    // Ambil semua jadwal hari ini
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

    // LOGIKA BARU: Cari jadwal yang sedang aktif (waktu sekarang berada dalam rentang jadwal)
    let jadwalAktif = null;
    let jadwalYangSudahAbsen = [];

    for (let jadwal of jadwalHariIni) {
      const waktuMasuk = dayjs(jadwal.tanggal_mulai);
      const waktuSelesai = dayjs(jadwal.tanggal_selesai);
      const waktuSekarang = nowUtc;

      console.log(`Checking jadwal ${jadwal.title}:`);
      console.log("Waktu Masuk:", waktuMasuk.toISOString());
      console.log("Waktu Selesai:", waktuSelesai.toISOString());
      console.log("Waktu Sekarang:", waktuSekarang.toISOString());

      // Cek apakah sudah absen di jadwal ini
      const sudahAbsen = await prisma.absensi.findFirst({
        where: {
          user_id: id,
          jadwal_id: jadwal.id,
        },
      });

      if (sudahAbsen) {
        jadwalYangSudahAbsen.push(jadwal.title);
        console.log(`Sudah absen di jadwal: ${jadwal.title}`);
        continue; // Skip jadwal yang sudah diabsen, lanjut ke jadwal berikutnya
      }

      // Cek apakah waktu sekarang berada dalam rentang jadwal ini
      if (
        (waktuSekarang.isAfter(waktuMasuk) ||
          waktuSekarang.isSame(waktuMasuk)) &&
        (waktuSekarang.isBefore(waktuSelesai) ||
          waktuSekarang.isSame(waktuSelesai))
      ) {
        jadwalAktif = jadwal;
        console.log(`Jadwal aktif ditemukan: ${jadwal.title}`);
        break; // Keluar dari loop karena sudah menemukan jadwal aktif
      }
    }

    // Jika tidak ada jadwal aktif
    if (!jadwalAktif) {
      // Jika semua jadwal sudah diabsen
      if (jadwalYangSudahAbsen.length === jadwalHariIni.length) {
        throw new BadRequestError(
          `Anda sudah melakukan absen pada semua jadwal hari ini: ${jadwalYangSudahAbsen.join(
            ", "
          )}`
        );
      }

      // Jika ada jadwal tapi tidak ada yang aktif saat ini
      const jadwalInfo = jadwalHariIni
        .map((j) => {
          const mulai = dayjs(j.tanggal_mulai)
            .tz("Asia/Jakarta")
            .format("HH:mm");
          const selesai = dayjs(j.tanggal_selesai)
            .tz("Asia/Jakarta")
            .format("HH:mm");
          return `${j.title} (${mulai}-${selesai})`;
        })
        .join(", ");

      throw new BadRequestError(
        `Tidak ada jadwal yang aktif saat ini. Jadwal hari ini: ${jadwalInfo}`
      );
    }

    // Proses absen untuk jadwal aktif
    let status = "HADIR";
    const waktuMasuk = dayjs(jadwalAktif.tanggal_mulai);
    const waktuSekarang = nowUtc;

    // Kalau sudah lewat dari waktu masuk, cek apakah terlambat
    // Toleransi 1 menit (sesuai kode asli, tapi bisa diubah sesuai kebutuhan)
    if (waktuSekarang.isAfter(waktuMasuk.add(15, "minute"))) {
      status = "TERLAMBAT";
    }

    // Buat record absensi
    await prisma.absensi.create({
      data: {
        tanggal: nowUtc.toDate(),
        status,
        user_id: id,
        jadwal_id: jadwalAktif.id,
      },
    });

    return {
      message: "Absen berhasil!",
      jadwal: jadwalAktif.title,
      status: status,
      waktu: nowWib.format("HH:mm"),
    };
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

  // Perbaikan untuk method getAbsensiKaryawanById
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
        alpha: "0 hari", // Ganti dari 'absen' ke 'alpha'
        telat: "0 hari",
      };
    }

    // Hitung jumlah berdasarkan enum status
    let hadir = 0,
      alpha = 0, // Ganti dari 'absen' ke 'alpha'
      telat = 0;

    for (const a of absensiBulanIni) {
      switch (a.status) {
        case "HADIR":
          hadir++;
          break;
        case "ALPHA": // Sesuai enum schema
          alpha++;
          break;
        case "TERLAMBAT":
          telat++;
          break;
      }
    }

    return {
      bulan: now.toLocaleString("id-ID", { month: "long" }),
      hadir: `${hadir} hari`,
      alpha: `${alpha} hari`, // Ganti dari 'absen' ke 'alpha'
      telat: `${telat} hari`,
    };
  }
}

module.exports = AbsensiService;
