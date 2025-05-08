const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require("../utils/error-handling");

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
}

module.exports = profilService;
