const { PrismaClient } = require("@prisma/client");
const { Role } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const signJWT = require("../utils/sign-jwt");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../utils/error-handling");
class authService {
  static async register({ nama, phoneNumber, email, password, role }) {
    if ((!nama, !phoneNumber || !email || !password)) {
      throw new BadRequestError("semua field harus diisi");
    }
    if (
      !nama.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      !password.trim()
    ) {
      throw new BadRequestError(
        "Field tidak boleh kosong atau hanya berisi spasi"
      );
    }
    if (password.length < 6) {
      throw new BadRequestError("Password harus lebih dari 6 karakter");
    }
    if (role && !(role in Role)) {
      throw new BadRequestError("Role tidak valid");
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new BadRequestError("Email sudah terdaftar");
    }
    console.log("Role input:", role);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        nama,
        email,
        phoneNumber,
        password: hashedPassword,
        role: Role[role] || Role.KARYAWAN,
      },
    });
    console.log("Converted role:", Role[role]);

    return user;
  }
  static async login({ email, password }) {
    if (!email || !password) {
      throw new BadRequestError("semua field harus diisi");
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundError("user tidak ditemukan");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("password atau email tidak valid");
    }
    const token = signJWT.generateToken(user);
    return {
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}

module.exports = authService;
