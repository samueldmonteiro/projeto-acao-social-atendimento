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
const category_already_linked_error_1 = require("../errors/category-already-linked.error");
let BeneficiaryService = class BeneficiaryService {
    async generateCallCode(serviceCategoryId, tx) {
        const category = await tx.serviceCategory.findUnique({
            where: { id: serviceCategoryId },
            select: { prefix: true },
        });
        if (!category) {
            throw new service_category_not_found_error_1.ServiceCategoryNotFoundError();
        }
        const last = await tx.beneficiaryCategory.findFirst({
            where: { serviceCategoryId },
            orderBy: { callCode: 'desc' },
            select: { callCode: true },
        });
        let nextNumber = 1;
        if (last) {
            const parts = last.callCode.split('-');
            const lastNumber = parseInt(parts[parts.length - 1], 10);
            if (!isNaN(lastNumber)) {
                nextNumber = lastNumber + 1;
            }
        }
        const paddedNumber = String(nextNumber).padStart(4, '0');
        return `${category.prefix}-${paddedNumber}`;
    }
    async create(data) {
        return await prisma_1.prisma.$transaction(async (tx) => {
            const categoryExists = await tx.serviceCategory.findUnique({
                where: { id: data.serviceCategoryId },
            });
            if (!categoryExists) {
                throw new service_category_not_found_error_1.ServiceCategoryNotFoundError();
            }
            const cpfExists = await tx.beneficiary.findUnique({
                where: { cpf: data.cpf },
            });
            if (cpfExists) {
                throw new beneficiary_already_exists_error_1.BeneficiaryAlreadyExistsError('Beneficiário com este CPF já cadastrado');
            }
            if (data.email) {
                const emailExists = await tx.beneficiary.findUnique({
                    where: { email: data.email },
                });
                if (emailExists) {
                    throw new beneficiary_already_exists_error_1.BeneficiaryAlreadyExistsError('Beneficiário com este e-mail já cadastrado');
                }
            }
            const callCode = await this.generateCallCode(data.serviceCategoryId, tx);
            return await tx.beneficiary.create({
                data: {
                    fullName: data.fullName,
                    cpf: data.cpf,
                    email: data.email,
                    phone: data.phone,
                    birthDate: new Date(data.birthDate),
                    gender: data.gender,
                    categories: {
                        create: {
                            serviceCategoryId: data.serviceCategoryId,
                            callCode,
                        },
                    },
                },
                include: {
                    categories: {
                        select: {
                            callCode: true,
                            serviceCategoryId: true,
                            serviceCategory: {
                                select: { id: true, name: true, prefix: true },
                            },
                        },
                    },
                },
            });
        });
    }
    async update(id, data) {
        return await prisma_1.prisma.$transaction(async (tx) => {
            const beneficiary = await tx.beneficiary.findUnique({
                where: { id },
            });
            if (!beneficiary) {
                throw new beneficiary_not_found_error_1.BeneficiaryNotFoundError();
            }
            if (data.cpf && data.cpf !== beneficiary.cpf) {
                const cpfExists = await tx.beneficiary.findUnique({
                    where: { cpf: data.cpf },
                });
                if (cpfExists) {
                    throw new beneficiary_already_exists_error_1.BeneficiaryAlreadyExistsError('Beneficiário com este CPF já cadastrado');
                }
            }
            if (data.email && data.email !== beneficiary.email) {
                const emailExists = await tx.beneficiary.findUnique({
                    where: { email: data.email },
                });
                if (emailExists) {
                    throw new beneficiary_already_exists_error_1.BeneficiaryAlreadyExistsError('Beneficiário com este e-mail já cadastrado');
                }
            }
            if (data.serviceCategoryId) {
                const categoryExists = await tx.serviceCategory.findUnique({
                    where: { id: data.serviceCategoryId },
                });
                if (!categoryExists) {
                    throw new service_category_not_found_error_1.ServiceCategoryNotFoundError();
                }
                await tx.beneficiaryCategory.deleteMany({
                    where: { beneficiaryId: id },
                });
                const callCode = await this.generateCallCode(data.serviceCategoryId, tx);
                await tx.beneficiaryCategory.create({
                    data: {
                        beneficiaryId: id,
                        serviceCategoryId: data.serviceCategoryId,
                        callCode,
                    },
                });
            }
            const updateData = {
                fullName: data.fullName,
                cpf: data.cpf,
                email: data.email,
                phone: data.phone,
                birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
                gender: data.gender,
            };
            return await tx.beneficiary.update({
                where: { id },
                data: updateData,
                include: {
                    categories: {
                        select: {
                            callCode: true,
                            serviceCategoryId: true,
                            serviceCategory: {
                                select: { id: true, name: true, prefix: true },
                            },
                        },
                    },
                },
            });
        });
    }
    async addCategory(id, serviceCategoryId) {
        return await prisma_1.prisma.$transaction(async (tx) => {
            const beneficiary = await tx.beneficiary.findUnique({
                where: { id },
            });
            if (!beneficiary) {
                throw new beneficiary_not_found_error_1.BeneficiaryNotFoundError();
            }
            const category = await tx.serviceCategory.findUnique({
                where: { id: serviceCategoryId },
            });
            if (!category) {
                throw new service_category_not_found_error_1.ServiceCategoryNotFoundError();
            }
            const existing = await tx.beneficiaryCategory.findUnique({
                where: {
                    beneficiaryId_serviceCategoryId: {
                        beneficiaryId: id,
                        serviceCategoryId,
                    },
                },
            });
            if (existing) {
                throw new category_already_linked_error_1.CategoryAlreadyLinkedError();
            }
            const callCode = await this.generateCallCode(serviceCategoryId, tx);
            return await tx.beneficiaryCategory.create({
                data: {
                    beneficiaryId: id,
                    serviceCategoryId,
                    callCode,
                },
                include: {
                    serviceCategory: {
                        select: { id: true, name: true, prefix: true },
                    },
                },
            });
        });
    }
    async removeCategory(id, serviceCategoryId) {
        const beneficiary = await prisma_1.prisma.beneficiary.findUnique({
            where: { id },
        });
        if (!beneficiary) {
            throw new beneficiary_not_found_error_1.BeneficiaryNotFoundError();
        }
        const existing = await prisma_1.prisma.beneficiaryCategory.findUnique({
            where: {
                beneficiaryId_serviceCategoryId: {
                    beneficiaryId: id,
                    serviceCategoryId,
                },
            },
        });
        if (!existing) {
            throw new service_category_not_found_error_1.ServiceCategoryNotFoundError('Vínculo entre beneficiário e categoria não encontrado');
        }
        await prisma_1.prisma.beneficiaryCategory.delete({
            where: {
                beneficiaryId_serviceCategoryId: {
                    beneficiaryId: id,
                    serviceCategoryId,
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
                        callCode: true,
                        serviceCategoryId: true,
                        serviceCategory: {
                            select: { id: true, name: true, prefix: true },
                        },
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
        const [data, total] = await prisma_1.prisma.$transaction([
            prisma_1.prisma.beneficiary.findMany({
                where,
                include: {
                    categories: {
                        select: {
                            callCode: true,
                            serviceCategoryId: true,
                            serviceCategory: {
                                select: { id: true, name: true, prefix: true },
                            },
                        },
                    },
                },
                orderBy: {
                    fullName: 'asc',
                },
                skip: (page - 1) * perPage,
                take: perPage,
            }),
            prisma_1.prisma.beneficiary.count({ where }),
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
exports.BeneficiaryService = BeneficiaryService;
exports.BeneficiaryService = BeneficiaryService = __decorate([
    (0, common_1.Injectable)()
], BeneficiaryService);
//# sourceMappingURL=beneficiary.service.js.map