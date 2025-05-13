/*
  Warnings:

  - You are about to drop the column `id_user` on the `Jadwal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Jadwal" DROP CONSTRAINT "Jadwal_id_user_fkey";

-- AlterTable
ALTER TABLE "Jadwal" DROP COLUMN "id_user";

-- CreateTable
CREATE TABLE "JadwalUser" (
    "id" TEXT NOT NULL,
    "id_jadwal" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "JadwalUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JadwalUser" ADD CONSTRAINT "JadwalUser_id_jadwal_fkey" FOREIGN KEY ("id_jadwal") REFERENCES "Jadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalUser" ADD CONSTRAINT "JadwalUser_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
