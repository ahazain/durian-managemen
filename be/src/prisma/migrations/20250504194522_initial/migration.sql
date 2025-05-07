-- CreateTable
CREATE TABLE "DurianData" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DurianData_pkey" PRIMARY KEY ("id")
);
