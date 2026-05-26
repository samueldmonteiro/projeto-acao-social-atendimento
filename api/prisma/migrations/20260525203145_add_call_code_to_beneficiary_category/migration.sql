/*
  Warnings:

  - A unique constraint covering the columns `[callCode]` on the table `beneficiary_service_categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `callCode` to the `beneficiary_service_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefix` to the `service_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "beneficiary_service_categories" ADD COLUMN     "callCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "service_categories" ADD COLUMN     "prefix" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "beneficiary_service_categories_callCode_key" ON "beneficiary_service_categories"("callCode");
