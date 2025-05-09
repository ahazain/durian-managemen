const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { BadRequestError, NotFoundError } = require("../utils/error-handling");
const { formatTanggalIndonesia } = require("../utils/formated-waktu");

class PenjadwalanService {
  static async addJadwalKerja({
    title,
    deskripsi,
    tanggal_mulai,
    tanggal_selesai,
    user,
  }) {
    if (
      !title ||
      !deskripsi ||
      !tanggal_mulai ||
      !tanggal_selesai ||
      !user?.id
    ) {
      throw new BadRequestError("semua field harus di isi");
    }

    const createdJadwal = await prisma.jadwal.create({
      data: {
        title,
        deskripsi,
        tanggal_mulai,
        tanggal_selesai,
        user: {
          connect: { id: user.id },
        },
      },
    });

    return {
      ...createdJadwal,
      tanggal_mulai: formatTanggalIndonesia(createdJadwal.tanggal_mulai),
      tanggal_selesai: formatTanggalIndonesia(createdJadwal.tanggal_selesai),
    };
  }
}
module.exports = PenjadwalanService;
