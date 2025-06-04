const { PrismaClient } = require("@prisma/client");
const { Role } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require("../utils/error-handling");
const {
  sendSuccesPasswordEmail,
  sendForgotPasswordEmail,
} = require("../utils/mailer");

class profilService {
  static async updateProfil({ nama, email, id, phoneNumber }) {
    if (!id) {
      throw new UnauthorizedError("Unauthorization. silahkan login kembali");
    }
    const userYgTersedia = await prisma.user.findUnique({ where: { id } });
    if (!userYgTersedia) {
      throw new NotFoundError("User tidak tersedia");
    }
    if ((!nama || !email, !phoneNumber)) {
      throw new BadRequestError("semua field harus di isi");
    }
    const updateData = await prisma.user.update({
      where: { id },
      data: {
        nama,
        email,
        phoneNumber,
      },
    });
    return updateData;
  }

  static async getAllKaryawan() {
    const karyawanYgAda = await prisma.user.findMany({
      where: { role: Role.KARYAWAN },
      orderBy: { nama: "asc" },
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

  static async getAll(role) {
    let filter = {};
    if (role === Role.ADMIN) {
      filter = { role: Role.ADMIN };
    } else if (role === Role.KARYAWAN) {
      filter = { role: Role.KARYAWAN };
    } else {
      filter = {
        OR: [{ role: Role.ADMIN }, { role: Role.KARYAWAN }],
      };
    }

    const users = await prisma.user.findMany({
      where: filter,
      select: {
        id: true,
        nama: true,
        role: true,
      },
    });

    if (!users || users.length === 0) {
      throw new NotFoundError("List pengguna kosong.");
    }

    const countAdmin = await prisma.user.count({
      where: { role: Role.ADMIN },
    });

    const countKaryawan = await prisma.user.count({
      where: { role: Role.KARYAWAN },
    });

    return {
      total_admin: countAdmin,
      total_karyawan: countKaryawan,
      users,
    };
  }
  static async getById(id) {
    if (!id) {
      throw new BadRequestError("id diperlukan");
    }
    const data = await prisma.user.findUnique({ where: { id } });
    return data;
  }
  static async updatePassword({ user, oldPassword, newPassword }) {
    if (!user || !user.email) {
      throw new UnauthorizedError(
        "Tidak terautentikasi. Silakan login kembali."
      );
    }

    if (!oldPassword || !newPassword) {
      throw new BadRequestError("Password lama dan password baru harus diisi.");
    }

    if (newPassword.length < 6) {
      throw new BadRequestError("Password baru harus minimal 6 karakter.");
    }

    const foundUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: { password: true },
    });

    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      foundUser.password
    );
    if (!isPasswordValid) {
      throw new BadRequestError("Password lama tidak valid.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email: user.email },
      data: { password: hashedPassword },
    });

    return null;
  }
  static async forgetPassword({ email }) {
    const foundUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!foundUser) {
      throw new NotFoundError("User tidak ditemukan.");
    }

    const resetToken = jwt.sign({ email }, process.env.RESET_PASSWORD_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

    await sendForgotPasswordEmail(email, resetLink);

    return {
      reset_link: resetLink,
    };
  }

  static async resetPassword(token, { newPassw, confirmPassw }) {
    if (!token || !newPassw || !confirmPassw) {
      throw new BadRequestError(
        "Token, password baru, dan konfirmasi password diperlukan."
      );
    }

    if (newPassw !== confirmPassw) {
      throw new BadRequestError(
        "Konfirmasi password tidak sama dengan password baru."
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    } catch (err) {
      throw new UnauthorizedError("Token tidak valid atau sudah kadaluarsa.");
    }

    const hashedPassword = await bcrypt.hash(newPassw, 10);

    await prisma.user.update({
      where: { email: decoded.email },
      data: {
        password: hashedPassword,
      },
    });

    await sendSuccesPasswordEmail(decoded.email);

    return { message: "Password berhasil diperbarui." };
  }
}

module.exports = profilService;
