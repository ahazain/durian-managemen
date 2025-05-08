const { PrismaClient } = require("@prisma/client");
const { Role } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const signJWT = require("../utils/sign-jwt");

