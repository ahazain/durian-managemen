/*
  Warnings:

  - Added the required column `jadwal_id` to the `Absensi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Absensi" ADD COLUMN     "jadwal_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_jadwal_id_fkey" FOREIGN KEY ("jadwal_id") REFERENCES "Jadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
