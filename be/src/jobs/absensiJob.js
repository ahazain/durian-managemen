const { PrismaClient } = require("@prisma/client");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

const prisma = new PrismaClient();

async function tandaiAlpha() {
  try {
    const nowUtc = dayjs.utc();
    const nowWib = nowUtc.tz("Asia/Jakarta");

    console.log("[CRON] Memulai penandaan ALPHA pada:", nowWib.format());

    // Dapatkan rentang hari ini dalam WIB, lalu convert ke UTC
    const startOfDayWIB = dayjs()
      .tz("Asia/Jakarta")
      .startOf("day")
      .utc()
      .toDate();
    const endOfDayWIB = dayjs().tz("Asia/Jakarta").endOf("day").utc().toDate();

    // Ambil semua jadwal hari ini beserta user yang terdaftar
    const semuaJadwalHariIni = await prisma.jadwal.findMany({
      where: {
        tanggal_mulai: { lte: endOfDayWIB },
        tanggal_selesai: { gte: startOfDayWIB },
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    console.log(
      `[CRON] Ditemukan ${semuaJadwalHariIni.length} jadwal hari ini`
    );

    let totalAlfaCreated = 0;

    for (const jadwal of semuaJadwalHariIni) {
      console.log(`[CRON] Memproses jadwal: ${jadwal.title}`);

      // Cek setiap user yang terdaftar di jadwal ini
      for (const userJadwal of jadwal.users) {
        const userId = userJadwal.userId;

        // Cek apakah user ini sudah absen untuk jadwal ini hari ini
        const sudahAbsen = await prisma.absensi.findFirst({
          where: {
            user_id: userId,
            jadwal_id: jadwal.id,
            tanggal: {
              gte: startOfDayWIB,
              lte: endOfDayWIB,
            },
          },
        });

        // Jika belum absen, buat record ALPHA
        if (!sudahAbsen) {
          await prisma.absensi.create({
            data: {
              tanggal: nowUtc.toDate(),
              status: "ALPHA", // Sesuai enum AbsensiStatus
              user_id: userId,
              jadwal_id: jadwal.id,
              verifikasi: false, // Default belum terverifikasi
            },
          });

          totalAlfaCreated++;
          console.log(
            `[CRON] ALPHA dibuat untuk user ${userJadwal.user.nama} pada jadwal ${jadwal.title}`
          );
        }
      }
    }

    console.log(
      `[CRON] Selesai. Total ${totalAlfaCreated} record ALPHA dibuat`
    );
  } catch (error) {
    console.error("[CRON] Error saat menandai ALPHA:", error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = tandaiAlpha;
