import { Injectable } from '@nestjs/common';
import { prisma } from '@/lib/prisma';
import { DashboardSummary } from '@/types/dashboard.type';

@Injectable()
export class DashboardService {
  async getSummary(): Promise<DashboardSummary> {
    const [
      totalBeneficiaries,
      totalCategories,
      totalAppointments,
      totalAttended,
      toBeAttended,
      waiting,
      canceled,
      categoriesRaw,
      genderDistribution,
      recentBeneficiaries,
    ] = await Promise.all([
      // Total de beneficiários cadastrados
      prisma.beneficiary.count(),

      // Total de categorias de atendimento
      prisma.serviceCategory.count(),

      // Total de atendimentos
      prisma.appointment.count(),

      // Total de atendidos (com finishedAt preenchido)
      prisma.appointment.count({ where: { finishedAt: { not: null } } }),

      // A serem atendidos (com startedAt preenchido e finishedAt null)
      prisma.appointment.count({ where: { startedAt: { not: null }, finishedAt: null } }),

      // Em espera (não cancelados, sem startedAt e sem finishedAt)
      prisma.appointment.count({ where: { canceled: false, startedAt: null, finishedAt: null } }),

      // Cancelados
      prisma.appointment.count({ where: { canceled: true } }),

      // Categorias com contagem de atendimentos ativos (ranking)
      prisma.serviceCategory.findMany({
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              appointments: { where: { canceled: false } },
            },
          },
        },
      }).then((cats) => cats.sort((a, b) => b._count.appointments - a._count.appointments)),

      // Distribuição por gênero
      prisma.beneficiary.groupBy({
        by: ['gender'],
        _count: { id: true },
      }),

      // Últimos 5 beneficiários cadastrados
      prisma.beneficiary.findMany({
        select: {
          id: true,
          fullName: true,
          gender: true,
          createdAt: true,
          appointments: {
            where: { canceled: false },
            select: {
              serviceCategory: {
                select: { id: true, name: true },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    // Categoria mais atendida (top 1)
    const topCategory = categoriesRaw[0] ?? null;

    // Beneficiários sem nenhum atendimento ativo
    const beneficiariesWithoutCategory = await prisma.beneficiary.count({
      where: { appointments: { none: { canceled: false } } },
    });

    // Formata ranking de categorias
    const categoriesRanking = categoriesRaw.map((cat, index) => ({
      rank: index + 1,
      id: cat.id,
      name: cat.name,
      totalBeneficiaries: cat._count.appointments,
      percentage:
        totalBeneficiaries > 0
          ? Number(((cat._count.appointments / totalBeneficiaries) * 100).toFixed(1))
          : 0,
    }));

    // Formata distribuição por gênero
    const genderMap: Record<string, string> = {
      MALE: 'Masculino',
      FEMALE: 'Feminino',
      OTHER: 'Outro',
    };

    const genderStats = genderDistribution.map((g) => ({
      gender: g.gender,
      label: genderMap[g.gender] ?? g.gender,
      count: g._count.id,
      percentage:
        totalBeneficiaries > 0
          ? Number(((g._count.id / totalBeneficiaries) * 100).toFixed(1))
          : 0,
    }));

    // Formata beneficiários recentes
    const recentFormatted = recentBeneficiaries.map((b) => ({
      id: b.id,
      fullName: b.fullName,
      gender: b.gender,
      createdAt: b.createdAt,
      appointments: b.appointments.map((c) => c.serviceCategory),
    }));

    return {
      overview: {
        totalBeneficiaries,
        totalCategories,
        totalAppointments,
        totalAttended,
        toBeAttended,
        waiting,
        canceled,
        beneficiariesWithoutCategory,
        averageCategoriesPerBeneficiary:
          totalBeneficiaries > 0
            ? Number((totalAppointments / totalBeneficiaries).toFixed(2))
            : 0,
      },
      topCategory: topCategory
        ? {
          id: topCategory.id,
          name: topCategory.name,
          totalBeneficiaries: topCategory._count.appointments,
        }
        : null,
      categoriesRanking,
      genderDistribution: genderStats,
      recentBeneficiaries: recentFormatted,
    };
  }
}
