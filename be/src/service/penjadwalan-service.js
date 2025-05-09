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

  static async getById(id) {
    if (!id) {
      throw new BadRequestError("id harus di isi");
    }
    const dataYgAda = await prisma.jadwal.findUnique({ where: { id } });
    if (!dataYgAda) {
      throw new NotFoundError("id jadwal kerja tidak ada");
    }

    return {
      ...dataYgAda,
      tanggal_mulai: formatTanggalIndonesia(dataYgAda.tanggal_mulai),
      tanggal_selesai: formatTanggalIndonesia(dataYgAda.tanggal_selesai),
    };
  }

  static async updateJadwalKerja({
    title,
    deskripsi,
    tanggal_mulai,
    tanggal_selesai,
    user,
    id,
  }) {
    if (
      !title ||
      !deskripsi ||
      !tanggal_mulai ||
      !tanggal_selesai ||
      !user ||
      !id
    ) {
      throw new BadRequestError("semua field harus di isi");
    }

    const dataJadwal = await prisma.jadwal.findUnique({ where: { id } });
    if (!dataJadwal) {
      throw new NotFoundError("id jadwal kerja tidak ada di database");
    }
    const updateJadwal = await prisma.jadwal.update({
      where: { id },
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
      ...updateJadwal,
      tanggal_mulai: formatTanggalIndonesia(updateJadwal.tanggal_mulai),
      tanggal_selesai: formatTanggalIndonesia(updateJadwal.tanggal_selesai),
    };
  }

  static async deleteJadwalKerja(id) {
    const dataJadwalKerja = await prisma.jadwal.findUnique({ where: { id } });
    if (!dataJadwalKerja) {
      throw new NotFoundError("data jadwal kerja tidak ada di database");
    }
    const deleteData = await prisma.jadwal.delete({
      where: { id },
      select: { id: true, title: true },
    });
    return deleteData;
  }
}
module.exports = PenjadwalanService;
