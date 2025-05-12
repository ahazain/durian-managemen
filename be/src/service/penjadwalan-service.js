const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { BadRequestError, NotFoundError } = require("../utils/error-handling");
const { formatTanggalIndonesia } = require("../utils/formated-waktu");
const id = require("dayjs/locale/id");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

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
    if (dayjs(tanggal_mulai).isAfter(dayjs(tanggal_selesai))) {
      throw new BadRequestError(
        "Tanggal mulai tidak boleh melebihi tanggal selesai"
      );
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

  static async getJadwalKerja() {
    const data = await prisma.jadwal.findMany();
    return data;
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
    if (dayjs(tanggal_mulai).isAfter(dayjs(tanggal_selesai))) {
      throw new BadRequestError(
        "Tanggal mulai tidak boleh melebihi tanggal selesai"
      );
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

  static async getByKaryawan(id) {
    if (!id) {
      throw new BadRequestError("id diperlukan");
    }
    const userYgAda = await prisma.user.findUnique({ where: { id } });
    if (!userYgAda) {
      throw new NotFoundError("data id tidak ditemukan");
    }

    const datajadwal = await prisma.jadwal.findMany({
      where: { id_user: id },
    });

    return datajadwal;
  }
}
module.exports = PenjadwalanService;
