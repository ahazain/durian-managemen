const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { BadRequestError, NotFoundError } = require("../utils/error-handling");
const { formatTanggalIndonesia } = require("../utils/formated-waktu");
const id = require("dayjs/locale/id");

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
      ...createdJadwal, //spread
      tanggal_mulai: formatTanggalIndonesia(createdJadwal.tanggal_mulai),
      tanggal_selesai: formatTanggalIndonesia(createdJadwal.tanggal_selesai),
    };
  }

  static async getJadwalKerja() {
    const data = await prisma.jadwal.findMany();
    const formatData = data.map((item) => ({
      ...item,
      tanggal_mulai: formatTanggalIndonesia(item.tanggal_mulai),
      tanggal_selesai: formatTanggalIndonesia(item.tanggal_selesai),
    }));
    return formatData;
  }
}
module.exports = PenjadwalanService;
