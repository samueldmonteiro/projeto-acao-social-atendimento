import { Injectable } from '@nestjs/common';
import { prisma } from '@/lib/prisma';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExportService {
  async generateBeneficiariesExcel(): Promise<ExcelJS.Buffer> {
    const beneficiaries = await prisma.beneficiary.findMany({
      include: {
        appointments: {
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
      const categoryNames = beneficiary.appointments
        .map((c) => c.serviceCategory.name)
        .join(', ');

      worksheet.addRow({
        fullName: beneficiary.fullName,
        cpf: beneficiary.cpf || '',
        email: beneficiary.email || '',
        phone: beneficiary.phone || '',
        birthDate: beneficiary.birthDate
          ? beneficiary.birthDate.toLocaleDateString('pt-BR')
          : '',
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

  async generateAppointmentsExcel(): Promise<ExcelJS.Buffer> {
    const appointments = await prisma.appointment.findMany({
      include: {
        beneficiary: true,
        serviceCategory: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Sistema de Atendimento Social';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Atendimentos');

    worksheet.columns = [
      { header: 'Código de Chamada', key: 'callCode', width: 18 },
      { header: 'Prioridade', key: 'priority', width: 12 },
      { header: 'Cancelado', key: 'canceled', width: 12 },
      { header: 'Iniciado em', key: 'startedAt', width: 18 },
      { header: 'Finalizado em', key: 'finishedAt', width: 18 },
      { header: 'Data de Criação', key: 'createdAt', width: 18 },
      { header: 'Beneficiário', key: 'beneficiaryName', width: 35 },
      { header: 'CPF do Beneficiário', key: 'beneficiaryCpf', width: 18 },
      { header: 'E-mail do Beneficiário', key: 'beneficiaryEmail', width: 35 },
      {
        header: 'Telefone do Beneficiário',
        key: 'beneficiaryPhone',
        width: 18,
      },
      { header: 'Data de Nascimento', key: 'beneficiaryBirthDate', width: 18 },
      { header: 'Gênero do Beneficiário', key: 'beneficiaryGender', width: 18 },
      { header: 'Categoria de Serviço', key: 'serviceCategory', width: 30 },
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

    for (const appointment of appointments) {
      worksheet.addRow({
        callCode: appointment.callCode,
        priority: appointment.priority ? 'Sim' : 'Não',
        canceled: appointment.canceled ? 'Sim' : 'Não',
        startedAt: appointment.startedAt
          ? appointment.startedAt.toLocaleDateString('pt-BR')
          : '',
        finishedAt: appointment.finishedAt
          ? appointment.finishedAt.toLocaleDateString('pt-BR')
          : '',
        createdAt: appointment.createdAt.toLocaleDateString('pt-BR'),
        beneficiaryName: appointment.beneficiary.fullName,
        beneficiaryCpf: appointment.beneficiary.cpf || '',
        beneficiaryEmail: appointment.beneficiary.email || '',
        beneficiaryPhone: appointment.beneficiary.phone || '',
        beneficiaryBirthDate: appointment.beneficiary.birthDate
          ? appointment.beneficiary.birthDate.toLocaleDateString('pt-BR')
          : '',
        beneficiaryGender:
          genderMap[appointment.beneficiary.gender] ||
          appointment.beneficiary.gender,
        serviceCategory: appointment.serviceCategory.name,
      });
    }

    worksheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: 13 },
    };

    return workbook.xlsx.writeBuffer();
  }
}
