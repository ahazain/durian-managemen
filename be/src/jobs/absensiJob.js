const { PrismaClient } = require("@prisma/client");
const dayjs = require("dayjs");
const prisma = new PrismaClient();

async function tandaiAlfa() {
  const sekarang = new Date();

  const semuaJadwalHariIni = await prisma.jadwal.findMany({
    where: {
      tanggal_mulai: { lte: sekarang },
      tanggal_selesai: { gte: sekarang },
    },
  });

  for (const jadwal of semuaJadwalHariIni) {
    const sudahAbsen = await prisma.absensi.findFirst({
      where: {
        id: jadwal.id,
        tanggal: {
          gte: dayjs().startOf("day").toDate(),
          lte: dayjs().endOf("day").toDate(),
        },
      },
    });

    if (!sudahAbsen) {
      await prisma.absensi.create({
        data: {
          id: jadwal.id,
          tanggal: sekarang,
          status: "ALFA",
        },
      });
    }
  }
}

module.exports = tandaiAlfa;
