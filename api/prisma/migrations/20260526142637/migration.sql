/*
  Warnings:

  - You are about to drop the `Appointments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_beneficiaryId_fkey";

-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_serviceCategoryId_fkey";

-- DropTable
DROP TABLE "Appointments";

-- CreateTable
CREATE TABLE "appointments" (
    "beneficiaryId" TEXT NOT NULL,
    "serviceCategoryId" TEXT NOT NULL,
    "callCode" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("beneficiaryId","serviceCategoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "appointments_callCode_key" ON "appointments"("callCode");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "beneficiaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_serviceCategoryId_fkey" FOREIGN KEY ("serviceCategoryId") REFERENCES "service_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
