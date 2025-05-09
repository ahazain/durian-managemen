const { PrismaClient } = require("@prisma/client");
const { Role } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require("../utils/error-handling");
const { formatTanggalIndonesia } = require("../utils/formated-waktu");

class profilService {
  static async getProfil(user) {
    if (!user || !user.id) {
      throw new UnauthorizedError("Unauthorized. Silakan login kembali.");
    }

    const foundUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!foundUser) {
      throw new NotFoundError("User tidak ditemukan.");
    }

    return {
      id: foundUser.id,
      nama: foundUser.nama,
      email: foundUser.email,
      role: foundUser.role,
    };
  }

  static async updateProfil({ nama, email, id }) {
    if (!id) {
      throw new UnauthorizedError("Unauthorization. silahkan login kembali");
    }
    const userYgTersedia = await prisma.user.findUnique({ where: { id } });
    if (!userYgTersedia) {
      throw new NotFoundError("User tidak tersedia");
    }
    if (!nama || !email) {
      throw new BadRequestError("semua field harus di isi");
    }
    const updateData = await prisma.user.update({
      where: { id },
      data: {
        nama,
        email,
      },
    });
    return updateData;
  }
  static async getAll() {
    const karyawanYgAda = await prisma.user.findMany({
      where: { role: Role.KARYAWAN },
      select: {
        id: true,
        nama: true,
      },
    });
    if (!karyawanYgAda || karyawanYgAda.length === 0) {
      throw new NotFoundError("List karyawan kosong.");
    }
    return karyawanYgAda;
  }
}

module.exports = profilService;
