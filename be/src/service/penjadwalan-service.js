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
      !Array.isArray(user) ||
      user.length === 0 ||
      user.some((u) => !u.id)
    ) {
      throw new BadRequestError("semua field harus di isi");
    }
    if (dayjs(tanggal_mulai).isAfter(dayjs(tanggal_selesai))) {
      throw new BadRequestError(
        "Tanggal mulai tidak boleh melebihi tanggal selesai"
      );
    }

    const userIds = [...new Set(user.map((u) => u.id))];
    const existingUsers = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
    });

    console.log(
      "User ditemukan:",
      existingUsers.map((u) => u.id)
    );

    if (existingUsers.length !== userIds.length) {
      throw new NotFoundError("Beberapa user tidak ditemukan di database");
    }
    const addJadwal = await prisma.jadwal.create({
      data: {
        title,
        deskripsi,
        tanggal_mulai,
        tanggal_selesai,
      },
    });

    const createdJadwal = await prisma.jadwalUser.createMany({
      data: userIds.map((userId) => ({
        userId,
        jadwalId: addJadwal.id,
      })),
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

  // static async getById(userId) {
   
  // }

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

  static async getByKaryawan(userId) {
    const datajadwal = await prisma.jadwalUser.findMany({
      where: {
        userId: userId, 
      },
      include: {
        jadwal: true,
      },
    });

    if (datajadwal.length === 0) {
      throw new NotFoundError("Jadwal tidak ditemukan untuk user ini");
    }

    return datajadwal.map((item) => item.jadwal); // hanya ambil isi jadwalnya
  }
}
module.exports = PenjadwalanService;
