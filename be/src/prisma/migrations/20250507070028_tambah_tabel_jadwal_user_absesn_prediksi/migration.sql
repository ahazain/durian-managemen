/*
  Warnings:

  - You are about to drop the `DurianData` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AbsensiStatus" AS ENUM ('HADIR', 'ALFA', 'IZIN', 'SAKIT');

-- CreateEnum
CREATE TYPE "Shift" AS ENUM ('PAGI', 'SIANG', 'MALAM');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'KARYAWAN');

-- DropTable
DROP TABLE "DurianData";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jadwal" (
    "id" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "shift" "Shift" NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "Jadwal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absensi" (
    "id" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "status" "AbsensiStatus" NOT NULL,
    "verifikasi" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Absensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prediksi" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "kualitas" TEXT,
    "harga" DOUBLE PRECISION,

    CONSTRAINT "Prediksi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prediksi" ADD CONSTRAINT "Prediksi_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
