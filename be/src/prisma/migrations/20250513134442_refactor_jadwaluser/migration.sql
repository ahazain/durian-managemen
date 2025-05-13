/*
  Warnings:

  - The primary key for the `JadwalUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `JadwalUser` table. All the data in the column will be lost.
  - You are about to drop the column `id_jadwal` on the `JadwalUser` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `JadwalUser` table. All the data in the column will be lost.
  - Added the required column `jadwalId` to the `JadwalUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `JadwalUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JadwalUser" DROP CONSTRAINT "JadwalUser_id_jadwal_fkey";

-- DropForeignKey
ALTER TABLE "JadwalUser" DROP CONSTRAINT "JadwalUser_id_user_fkey";

-- AlterTable
ALTER TABLE "JadwalUser" DROP CONSTRAINT "JadwalUser_pkey",
DROP COLUMN "id",
DROP COLUMN "id_jadwal",
DROP COLUMN "id_user",
ADD COLUMN     "jadwalId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "JadwalUser_pkey" PRIMARY KEY ("userId", "jadwalId");

-- AddForeignKey
ALTER TABLE "JadwalUser" ADD CONSTRAINT "JadwalUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalUser" ADD CONSTRAINT "JadwalUser_jadwalId_fkey" FOREIGN KEY ("jadwalId") REFERENCES "Jadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
