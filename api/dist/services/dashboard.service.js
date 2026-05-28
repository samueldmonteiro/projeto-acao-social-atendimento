"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../lib/prisma");
let DashboardService = class DashboardService {
    async getSummary() {
        const [totalBeneficiaries, totalCategories, totalAppointments, totalAttended, toBeAttended, waiting, canceled, categoriesRaw, genderDistribution, recentBeneficiaries,] = await Promise.all([
            prisma_1.prisma.beneficiary.count(),
            prisma_1.prisma.serviceCategory.count(),
            prisma_1.prisma.appointment.count(),
            prisma_1.prisma.appointment.count({ where: { finishedAt: { not: null } } }),
            prisma_1.prisma.appointment.count({ where: { startedAt: { not: null }, finishedAt: null } }),
            prisma_1.prisma.appointment.count({ where: { canceled: false, startedAt: null, finishedAt: null } }),
            prisma_1.prisma.appointment.count({ where: { canceled: true } }),
            prisma_1.prisma.serviceCategory.findMany({
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
            prisma_1.prisma.beneficiary.groupBy({
                by: ['gender'],
                _count: { id: true },
            }),
            prisma_1.prisma.beneficiary.findMany({
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
        const topCategory = categoriesRaw[0] ?? null;
        const beneficiariesWithoutCategory = await prisma_1.prisma.beneficiary.count({
            where: { appointments: { none: { canceled: false } } },
        });
        const categoriesRanking = categoriesRaw.map((cat, index) => ({
            rank: index + 1,
            id: cat.id,
            name: cat.name,
            totalBeneficiaries: cat._count.appointments,
            percentage: totalBeneficiaries > 0
                ? Number(((cat._count.appointments / totalBeneficiaries) * 100).toFixed(1))
                : 0,
        }));
        const genderMap = {
            MALE: 'Masculino',
            FEMALE: 'Feminino',
            OTHER: 'Outro',
        };
        const genderStats = genderDistribution.map((g) => ({
            gender: g.gender,
            label: genderMap[g.gender] ?? g.gender,
            count: g._count.id,
            percentage: totalBeneficiaries > 0
                ? Number(((g._count.id / totalBeneficiaries) * 100).toFixed(1))
                : 0,
        }));
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
                averageCategoriesPerBeneficiary: totalBeneficiaries > 0
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)()
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map