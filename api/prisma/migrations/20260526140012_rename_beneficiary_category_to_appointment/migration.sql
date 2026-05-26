/*
  Warnings:

  - You are about to drop the `beneficiary_service_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "beneficiary_service_categories" DROP CONSTRAINT "beneficiary_service_categories_beneficiaryId_fkey";

-- DropForeignKey
ALTER TABLE "beneficiary_service_categories" DROP CONSTRAINT "beneficiary_service_categories_serviceCategoryId_fkey";

-- DropTable
DROP TABLE "beneficiary_service_categories";

-- CreateTable
CREATE TABLE "Appointments" (
    "beneficiaryId" TEXT NOT NULL,
    "serviceCategoryId" TEXT NOT NULL,
    "callCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("beneficiaryId","serviceCategoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointments_callCode_key" ON "Appointments"("callCode");

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "beneficiaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_serviceCategoryId_fkey" FOREIGN KEY ("serviceCategoryId") REFERENCES "service_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
