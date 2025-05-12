/*
  Warnings:

  - The values [ALFA,IZIN,SAKIT] on the enum `AbsensiStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AbsensiStatus_new" AS ENUM ('HADIR', 'ALPHA', 'TERLAMBAT');
ALTER TABLE "Absensi" ALTER COLUMN "status" TYPE "AbsensiStatus_new" USING ("status"::text::"AbsensiStatus_new");
ALTER TYPE "AbsensiStatus" RENAME TO "AbsensiStatus_old";
ALTER TYPE "AbsensiStatus_new" RENAME TO "AbsensiStatus";
DROP TYPE "AbsensiStatus_old";
COMMIT;
