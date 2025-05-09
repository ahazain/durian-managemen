/*
  Warnings:

  - You are about to drop the column `shift` on the `Jadwal` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal` on the `Jadwal` table. All the data in the column will be lost.
  - Added the required column `deskripsi` to the `Jadwal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_mulai` to the `Jadwal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_selesai` to the `Jadwal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Jadwal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jadwal" DROP COLUMN "shift",
DROP COLUMN "tanggal",
ADD COLUMN     "deskripsi" TEXT NOT NULL,
ADD COLUMN     "tanggal_mulai" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tanggal_selesai" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Shift";
