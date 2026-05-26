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
    await prisma.appointment.deleteMany();
    await prisma.beneficiary.deleteMany();
    await prisma.serviceCategory.deleteMany();
  });

  it('should generate an Excel workbook with beneficiary data', async () => {
    const category = await prisma.serviceCategory.create({
      data: { name: 'Saúde', prefix: 'S' },
    });

    await prisma.beneficiary.create({
      data: {
        fullName: 'Maria Souza',
        cpf: '98765432109',
        email: 'maria@example.com',
        phone: '11988888888',
        birthDate: new Date('1990-01-01'),
        gender: Gender.FEMALE,
        appointments: {
          create: { serviceCategoryId: category.id, callCode: 'TST-0001' },
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

  it('should translate gender values to Portuguese labels', async () => {
    await prisma.beneficiary.create({
      data: {
        fullName: 'Alan',
        cpf: '11111111111',
        birthDate: new Date('1990-01-01'),
        gender: Gender.MALE,
      },
    });

    await prisma.beneficiary.create({
      data: {
        fullName: 'Bia',
        cpf: '22222222222',
        birthDate: new Date('1990-01-01'),
        gender: Gender.FEMALE,
      },
    });

    await prisma.beneficiary.create({
      data: {
        fullName: 'Caio',
        cpf: '33333333333',
        birthDate: new Date('1990-01-01'),
        gender: Gender.OTHER,
      },
    });

    const buffer = await service.generateBeneficiariesExcel();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.worksheets[0];
    expect(worksheet.rowCount).toBe(4);
    expect(worksheet.getRow(2).getCell(6).value).toBe('Masculino');
    expect(worksheet.getRow(3).getCell(6).value).toBe('Feminino');
    expect(worksheet.getRow(4).getCell(6).value).toBe('Outro');
  });

  it('should list multiple categories separated by comma', async () => {
    const cat1 = await prisma.serviceCategory.create({ data: { name: 'Saúde', prefix: 'S' } });
    const cat2 = await prisma.serviceCategory.create({ data: { name: 'Educação', prefix: 'E' } });

    await prisma.beneficiary.create({
      data: {
        fullName: 'João Silva',
        cpf: '11111111111',
        birthDate: new Date('1990-01-01'),
        gender: Gender.MALE,
        appointments: {
          create: [
            { serviceCategoryId: cat1.id, callCode: 'TST-0002' },
            { serviceCategoryId: cat2.id, callCode: 'TST-0003' },
          ],
        },
      },
    });

    const buffer = await service.generateBeneficiariesExcel();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.worksheets[0];
    const categoriesCell = worksheet.getRow(2).getCell(7).value;
    expect(categoriesCell).toContain('Saúde');
    expect(categoriesCell).toContain('Educação');
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
