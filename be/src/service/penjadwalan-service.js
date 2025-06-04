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
      throw new BadRequestError("Semua field harus diisi");
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

    await prisma.jadwalUser.createMany({
      data: userIds.map((userId) => ({
        userId,
        jadwalId: addJadwal.id,
      })),
    });

    return {
      ...addJadwal,
      tanggal_mulai: formatTanggalIndonesia(addJadwal.tanggal_mulai),
      tanggal_selesai: formatTanggalIndonesia(addJadwal.tanggal_selesai),
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
      !user || // user bisa berupa array juga, cek sesuai kebutuhan
      !id
    ) {
      throw new BadRequestError("Semua field harus diisi");
    }

    const dataJadwal = await prisma.jadwal.findUnique({ where: { id } });
    if (!dataJadwal) {
      throw new NotFoundError("ID jadwal kerja tidak ditemukan di database");
    }

    if (dayjs(tanggal_mulai).isAfter(dayjs(tanggal_selesai))) {
      throw new BadRequestError(
        "Tanggal mulai tidak boleh melebihi tanggal selesai"
      );
    }

    // ✨ 1. Update data dasar jadwal
    const updateJadwal = await prisma.jadwal.update({
      where: { id },
      data: {
        title,
        deskripsi,
        tanggal_mulai,
        tanggal_selesai,
      },
    });

    // ✨ 2. Hapus semua relasi user sebelumnya
    await prisma.jadwalUser.deleteMany({
      where: { jadwalId: id },
    });

    // ✨ 3. Tambahkan relasi user baru (bisa satu atau banyak user)
    const userIds = Array.isArray(user) ? user : [user]; // handle kalau user dikirim satu atau array
    for (const u of userIds) {
      if (!u.id) {
        throw new BadRequestError("User ID tidak valid dalam data user");
      }

      await prisma.jadwalUser.create({
        data: {
          jadwalId: id,
          userId: u.id,
        },
      });
    }

    return {
      ...updateJadwal,
      tanggal_mulai: formatTanggalIndonesia(updateJadwal.tanggal_mulai),
      tanggal_selesai: formatTanggalIndonesia(updateJadwal.tanggal_selesai),
    };
  }

  static async deleteJadwalKerja(id) {
    // Cek apakah jadwalnya ada
    const dataJadwalKerja = await prisma.jadwal.findUnique({
      where: { id },
    });

    if (!dataJadwalKerja) {
      throw new NotFoundError("Data jadwal kerja tidak ada di database");
    }

    // Hapus semua absensi yang terkait dengan jadwal ini
    await prisma.absensi.deleteMany({
      where: { jadwal_id: id },
    });

    // Hapus relasi dari tabel JadwalUser (many-to-many)
    await prisma.jadwalUser.deleteMany({
      where: { jadwalId: id },
    });

    // Hapus data utama dari tabel Jadwal
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

    return datajadwal.map((item) => item.jadwal);
  }
}
module.exports = PenjadwalanService;
