import { Test } from '@nestjs/testing';
import { prisma } from '@/lib/prisma';
import { ExportService } from '@/services/export.service';
import { AppModule } from '@/app.module';
import { Gender } from '@/generated/prisma/enums';
import ExcelJS from 'exceljs';

describe('ExportService Integration', () => {
  let service: ExportService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<ExportService>(ExportService);
  });

  beforeEach(async () => {
    await prisma.beneficiaryCategory.deleteMany();
    await prisma.beneficiary.deleteMany();
    await prisma.serviceCategory.deleteMany();
  });

  it('should generate an Excel workbook with beneficiary data', async () => {
    const category = await prisma.serviceCategory.create({
      data: { name: 'Saúde' },
    });

    await prisma.beneficiary.create({
      data: {
        fullName: 'Maria Souza',
        cpf: '98765432109',
        email: 'maria@example.com',
        phone: '11988888888',
        birthDate: new Date('1990-01-01'),
        gender: Gender.FEMALE,
        categories: {
          create: { serviceCategoryId: category.id },
        },
      },
    });

    const buffer = await service.generateBeneficiariesExcel();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.worksheets[0];
    expect(worksheet).toBeDefined();
    expect(worksheet.getRow(1).values).toContain('Nome Completo');
    expect(worksheet.getRow(1).values).toContain('CPF');

    const dataRow = worksheet.getRow(2);
    expect(dataRow.getCell(1).value).toBe('Maria Souza');
    expect(dataRow.getCell(2).value).toBe('98765432109');
  });

  it('should generate an empty Excel when no beneficiaries exist', async () => {
    const buffer = await service.generateBeneficiariesExcel();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.worksheets[0];
    expect(worksheet).toBeDefined();
    expect(worksheet.getRow(1).values).toContain('Nome Completo');
    expect(worksheet.rowCount).toBe(1);
  });
});
