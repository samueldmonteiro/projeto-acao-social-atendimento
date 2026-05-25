import { Injectable } from '@nestjs/common';
import { prisma } from '@/lib/prisma';
import { DashboardSummary } from '@/types/dashboard.type';

@Injectable()
export class DashboardService {
  async getSummary(): Promise<DashboardSummary> {
    const [
      totalBeneficiaries,
      totalCategories,
      totalLinks,
      categoriesRaw,
      genderDistribution,
      recentBeneficiaries,
    ] = await Promise.all([
      // Total de beneficiários cadastrados
      prisma.beneficiary.count(),

      // Total de categorias de atendimento
      prisma.serviceCategory.count(),

      // Total de vínculos beneficiário↔categoria (atendimentos registrados)
      prisma.beneficiaryCategory.count(),

      // Categorias com contagem de beneficiários vinculados (ranking)
      prisma.serviceCategory.findMany({
        select: {
          id: true,
          name: true,
          _count: {
            select: { beneficiaries: true },
          },
        },
        orderBy: {
          beneficiaries: {
            _count: 'desc',
          },
        },
      }),

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
          categories: {
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

    // Beneficiários sem nenhuma categoria vinculada
    const beneficiariesWithoutCategory = await prisma.beneficiary.count({
      where: { categories: { none: {} } },
    });

    // Formata ranking de categorias
    const categoriesRanking = categoriesRaw.map((cat, index) => ({
      rank: index + 1,
      id: cat.id,
      name: cat.name,
      totalBeneficiaries: cat._count.beneficiaries,
      percentage:
        totalBeneficiaries > 0
          ? Number(((cat._count.beneficiaries / totalBeneficiaries) * 100).toFixed(1))
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
      categories: b.categories.map((c) => c.serviceCategory),
    }));

    return {
      overview: {
        totalBeneficiaries,
        totalCategories,
        totalLinks,
        beneficiariesWithoutCategory,
        averageCategoriesPerBeneficiary:
          totalBeneficiaries > 0
            ? Number((totalLinks / totalBeneficiaries).toFixed(2))
            : 0,
      },
      topCategory: topCategory
        ? {
          id: topCategory.id,
          name: topCategory.name,
          totalBeneficiaries: topCategory._count.beneficiaries,
        }
        : null,
      categoriesRanking,
      genderDistribution: genderStats,
      recentBeneficiaries: recentFormatted,
    };
  }
}
