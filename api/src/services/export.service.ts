import { Injectable } from '@nestjs/common';
import { prisma } from '@/lib/prisma';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExportService {
  async generateBeneficiariesExcel(): Promise<ExcelJS.Buffer> {
    const beneficiaries = await prisma.beneficiary.findMany({
      include: {
        categories: {
          select: {
            serviceCategory: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: { fullName: 'asc' },
    });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Sistema de Atendimento Social';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Beneficiários');

    worksheet.columns = [
      { header: 'Nome Completo', key: 'fullName', width: 35 },
      { header: 'CPF', key: 'cpf', width: 18 },
      { header: 'E-mail', key: 'email', width: 35 },
      { header: 'Telefone', key: 'phone', width: 18 },
      { header: 'Data de Nascimento', key: 'birthDate', width: 18 },
      { header: 'Gênero', key: 'gender', width: 12 },
      { header: 'Categorias', key: 'categories', width: 40 },
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2F5496' },
    };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.height = 25;

    const genderMap: Record<string, string> = {
      MALE: 'Masculino',
      FEMALE: 'Feminino',
      OTHER: 'Outro',
    };

    for (const beneficiary of beneficiaries) {
      const categoryNames = beneficiary.categories
        .map((c) => c.serviceCategory.name)
        .join(', ');

      worksheet.addRow({
        fullName: beneficiary.fullName,
        cpf: beneficiary.cpf,
        email: beneficiary.email || '',
        phone: beneficiary.phone || '',
        birthDate: beneficiary.birthDate.toLocaleDateString('pt-BR'),
        gender: genderMap[beneficiary.gender] || beneficiary.gender,
        categories: categoryNames,
      });
    }

    worksheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: 7 },
    };

    return workbook.xlsx.writeBuffer();
  }
}
