"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeneficiaryCategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../lib/prisma");
let BeneficiaryCategoryService = class BeneficiaryCategoryService {
    async findMany(filters = {}) {
        const where = {};
        const page = filters.page || 1;
        const perPage = filters.perPage || 10;
        if (filters.categoryId) {
            where.serviceCategoryId = filters.categoryId;
        }
        if (filters.search) {
            where.beneficiary = {
                OR: [
                    {
                        fullName: {
                            contains: filters.search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        cpf: {
                            contains: filters.search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        email: {
                            contains: filters.search,
                            mode: 'insensitive',
                        },
                    },
                ],
            };
        }
        const [data, total] = await prisma_1.prisma.$transaction([
            prisma_1.prisma.beneficiaryCategory.findMany({
                where,
                include: {
                    beneficiary: true,
                    serviceCategory: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                skip: (page - 1) * perPage,
                take: perPage,
            }),
            prisma_1.prisma.beneficiaryCategory.count({ where }),
        ]);
        const pagination = {
            items: data,
            pagination: {
                total,
                page,
                perPage,
                hasNextPage: page * perPage < total,
                hasPrevPage: page > 1,
            },
        };
        return pagination;
    }
};
exports.BeneficiaryCategoryService = BeneficiaryCategoryService;
exports.BeneficiaryCategoryService = BeneficiaryCategoryService = __decorate([
    (0, common_1.Injectable)()
], BeneficiaryCategoryService);
//# sourceMappingURL=beneficiary-category.service.js.map