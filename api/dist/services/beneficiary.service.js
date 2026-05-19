"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeneficiaryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../lib/prisma");
const beneficiary_not_found_error_1 = require("../errors/beneficiary-not-found.error");
const beneficiary_already_exists_error_1 = require("../errors/beneficiary-already-exists.error");
const service_category_not_found_error_1 = require("../errors/service-category-not-found.error");
let BeneficiaryService = class BeneficiaryService {
    async create(data) {
        const categoryExists = await prisma_1.prisma.serviceCategory.findUnique({
            where: { id: data.serviceCategoryId },
        });
        if (!categoryExists) {
            throw new service_category_not_found_error_1.ServiceCategoryNotFoundError();
        }
        const cpfExists = await prisma_1.prisma.beneficiary.findUnique({
            where: { cpf: data.cpf },
        });
        if (cpfExists) {
            throw new beneficiary_already_exists_error_1.BeneficiaryAlreadyExistsError('Beneficiário com este CPF já cadastrado');
        }
        if (data.email) {
            const emailExists = await prisma_1.prisma.beneficiary.findUnique({
                where: { email: data.email },
            });
            if (emailExists) {
                throw new beneficiary_already_exists_error_1.BeneficiaryAlreadyExistsError('Beneficiário com este e-mail já cadastrado');
            }
        }
        return await prisma_1.prisma.beneficiary.create({
            data: {
                fullName: data.fullName,
                cpf: data.cpf,
                email: data.email,
                birthDate: new Date(data.birthDate),
                gender: data.gender,
                categories: {
                    create: {
                        serviceCategoryId: data.serviceCategoryId,
                    },
                },
            },
            include: {
                categories: {
                    select: {
                        serviceCategoryId: true,
                    },
                },
            },
        });
    }
    async update(id, data) {
        const beneficiary = await prisma_1.prisma.beneficiary.findUnique({
            where: { id },
        });
        if (!beneficiary) {
            throw new beneficiary_not_found_error_1.BeneficiaryNotFoundError();
        }
        if (data.cpf && data.cpf !== beneficiary.cpf) {
            const cpfExists = await prisma_1.prisma.beneficiary.findUnique({
                where: { cpf: data.cpf },
            });
            if (cpfExists) {
                throw new beneficiary_already_exists_error_1.BeneficiaryAlreadyExistsError('Beneficiário com este CPF já cadastrado');
            }
        }
        if (data.email && data.email !== beneficiary.email) {
            const emailExists = await prisma_1.prisma.beneficiary.findUnique({
                where: { email: data.email },
            });
            if (emailExists) {
                throw new beneficiary_already_exists_error_1.BeneficiaryAlreadyExistsError('Beneficiário com este e-mail já cadastrado');
            }
        }
        if (data.serviceCategoryId) {
            const categoryExists = await prisma_1.prisma.serviceCategory.findUnique({
                where: { id: data.serviceCategoryId },
            });
            if (!categoryExists) {
                throw new service_category_not_found_error_1.ServiceCategoryNotFoundError();
            }
        }
        const updateData = {
            fullName: data.fullName,
            cpf: data.cpf,
            email: data.email,
            birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
            gender: data.gender,
        };
        if (data.serviceCategoryId) {
            updateData.categories = {
                deleteMany: {},
                create: {
                    serviceCategoryId: data.serviceCategoryId,
                },
            };
        }
        return await prisma_1.prisma.beneficiary.update({
            where: { id },
            data: updateData,
            include: {
                categories: {
                    select: {
                        serviceCategoryId: true,
                    },
                },
            },
        });
    }
    async delete(id) {
        const beneficiary = await prisma_1.prisma.beneficiary.findUnique({
            where: { id },
        });
        if (!beneficiary) {
            throw new beneficiary_not_found_error_1.BeneficiaryNotFoundError();
        }
        await prisma_1.prisma.beneficiary.delete({
            where: { id },
        });
    }
    async findById(id) {
        const beneficiary = await prisma_1.prisma.beneficiary.findUnique({
            where: { id },
            include: {
                categories: {
                    select: {
                        serviceCategoryId: true,
                    },
                },
            },
        });
        if (!beneficiary) {
            throw new beneficiary_not_found_error_1.BeneficiaryNotFoundError();
        }
        return beneficiary;
    }
    async findMany(filters = {}) {
        const where = {};
        const page = filters.page || 1;
        const perPage = filters.perPage || 10;
        if (filters.search) {
            where.OR = [
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
            ];
        }
        if (filters.serviceCategoryId) {
            where.categories = {
                some: {
                    serviceCategoryId: filters.serviceCategoryId,
                },
            };
        }
        return await prisma_1.prisma.beneficiary.findMany({
            where,
            include: {
                categories: {
                    select: {
                        serviceCategoryId: true,
                    },
                },
            },
            orderBy: {
                fullName: 'asc',
            },
            skip: (page - 1) * perPage,
            take: perPage,
        });
    }
};
exports.BeneficiaryService = BeneficiaryService;
exports.BeneficiaryService = BeneficiaryService = __decorate([
    (0, common_1.Injectable)()
], BeneficiaryService);
//# sourceMappingURL=beneficiary.service.js.map