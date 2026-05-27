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
let BeneficiaryService = class BeneficiaryService {
    async create(data) {
        return await prisma_1.prisma.$transaction(async (tx) => {
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
            return await tx.beneficiary.create({
                data: {
                    fullName: data.fullName,
                    cpf: data.cpf,
                    email: data.email,
                    phone: data.phone,
                    birthDate: new Date(data.birthDate),
                    gender: data.gender,
                    address: data.address,
                },
                include: {
                    appointments: { include: { serviceCategory: true } },
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
            const updateData = {
                fullName: data.fullName,
                cpf: data.cpf,
                email: data.email,
                phone: data.phone,
                birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
                gender: data.gender,
                address: data.address,
            };
            return await tx.beneficiary.update({
                where: { id },
                data: updateData,
                include: {
                    appointments: {
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
                appointments: {
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
            where.appointments = {
                some: {
                    serviceCategoryId: filters.serviceCategoryId,
                },
            };
        }
        const [data, total] = await prisma_1.prisma.$transaction([
            prisma_1.prisma.beneficiary.findMany({
                where,
                include: {
                    appointments: {
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