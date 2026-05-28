-- AlterTable: make cpf and birthDate optional in beneficiaries
ALTER TABLE "beneficiaries" ALTER COLUMN "cpf" DROP NOT NULL;
ALTER TABLE "beneficiaries" ALTER COLUMN "birthDate" DROP NOT NULL;
