-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "canceled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priority" BOOLEAN NOT NULL DEFAULT false;
