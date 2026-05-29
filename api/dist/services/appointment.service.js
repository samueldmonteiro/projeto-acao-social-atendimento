"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../lib/prisma");
const appointment_not_found_error_1 = require("../errors/appointment-not-found.error");
const service_category_not_found_error_1 = require("../errors/service-category-not-found.error");
const beneficiary_not_found_error_1 = require("../errors/beneficiary-not-found.error");
const appointment_already_exists_error_1 = require("../errors/appointment-already-exists.error");
let AppointmentService = class AppointmentService {
    async findMany(filters = {}) {
        const where = {};
        const page = filters.page || 1;
        const perPage = filters.perPage || 10;
        if (filters.categoryId) {
            where.serviceCategoryId = filters.categoryId;
        }
        if (filters.priority !== undefined) {
            where.priority = filters.priority;
        }
        if (filters.canceled !== undefined) {
            where.canceled = filters.canceled;
        }
        if (filters.started !== undefined) {
            if (filters.started) {
                where.startedAt = { not: null };
            }
            else {
                where.startedAt = null;
            }
        }
        if (filters.finished !== undefined) {
            if (filters.finished) {
                where.finishedAt = { not: null };
            }
            else {
                where.finishedAt = null;
            }
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
            prisma_1.prisma.appointment.findMany({
                where,
                include: {
                    beneficiary: true,
                    serviceCategory: true,
                },
                orderBy: {
                    createdAt: 'asc',
                },
                skip: (page - 1) * perPage,
                take: perPage,
            }),
            prisma_1.prisma.appointment.count({ where }),
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
    async create(data) {
        return await prisma_1.prisma.$transaction(async (tx) => {
            const beneficiary = await tx.beneficiary.findUnique({
                where: { id: data.beneficiaryId },
            });
            if (!beneficiary) {
                throw new beneficiary_not_found_error_1.BeneficiaryNotFoundError();
            }
            const category = await tx.serviceCategory.findUnique({
                where: { id: data.serviceCategoryId },
            });
            if (!category) {
                throw new service_category_not_found_error_1.ServiceCategoryNotFoundError();
            }
            const existing = await tx.appointment.findUnique({
                where: {
                    beneficiaryId_serviceCategoryId: {
                        beneficiaryId: data.beneficiaryId,
                        serviceCategoryId: data.serviceCategoryId,
                    },
                },
            });
            if (existing) {
                throw new appointment_already_exists_error_1.AppointmentAlreadyExistsError();
            }
            const callCode = await this.generateCallCode(data.serviceCategoryId, tx);
            return await tx.appointment.create({
                data: {
                    beneficiaryId: data.beneficiaryId,
                    serviceCategoryId: data.serviceCategoryId,
                    priority: data.priority ?? false,
                    callCode,
                },
                include: {
                    beneficiary: true,
                    serviceCategory: true,
                },
            });
        });
    }
    async update(beneficiaryId, serviceCategoryId, data) {
        const appointment = await prisma_1.prisma.appointment.findUnique({
            where: {
                beneficiaryId_serviceCategoryId: {
                    beneficiaryId,
                    serviceCategoryId,
                },
            },
        });
        if (!appointment) {
            throw new appointment_not_found_error_1.AppointmentNotFoundError();
        }
        const targetBeneficiaryId = data.beneficiaryId !== undefined ? data.beneficiaryId : beneficiaryId;
        const targetServiceCategoryId = data.serviceCategoryId !== undefined
            ? data.serviceCategoryId
            : serviceCategoryId;
        if (targetBeneficiaryId !== beneficiaryId ||
            targetServiceCategoryId !== serviceCategoryId) {
            const existingAppointment = await prisma_1.prisma.appointment.findUnique({
                where: {
                    beneficiaryId_serviceCategoryId: {
                        beneficiaryId: targetBeneficiaryId,
                        serviceCategoryId: targetServiceCategoryId,
                    },
                },
            });
            if (existingAppointment) {
                throw new appointment_already_exists_error_1.AppointmentAlreadyExistsError('Já existe um atendimento registrado para este beneficiário nesta categoria de serviço.');
            }
        }
        const updateData = {};
        if (data.priority !== undefined)
            updateData.priority = data.priority;
        if (data.canceled !== undefined)
            updateData.canceled = data.canceled;
        if (data.startedAt !== undefined)
            updateData.startedAt = data.startedAt;
        if (data.finishedAt !== undefined)
            updateData.finishedAt = data.finishedAt;
        if (data.callCode !== undefined)
            updateData.callCode = data.callCode;
        if (data.beneficiaryId !== undefined &&
            data.beneficiaryId !== beneficiaryId) {
            const beneficiary = await prisma_1.prisma.beneficiary.findUnique({
                where: { id: data.beneficiaryId },
            });
            if (!beneficiary) {
                throw new beneficiary_not_found_error_1.BeneficiaryNotFoundError();
            }
            updateData.beneficiary = { connect: { id: data.beneficiaryId } };
        }
        if (data.serviceCategoryId !== undefined &&
            data.serviceCategoryId !== serviceCategoryId) {
            const category = await prisma_1.prisma.serviceCategory.findUnique({
                where: { id: data.serviceCategoryId },
            });
            if (!category) {
                throw new service_category_not_found_error_1.ServiceCategoryNotFoundError();
            }
            updateData.serviceCategory = { connect: { id: data.serviceCategoryId } };
        }
        return await prisma_1.prisma.appointment.update({
            where: {
                beneficiaryId_serviceCategoryId: {
                    beneficiaryId,
                    serviceCategoryId,
                },
            },
            data: updateData,
            include: {
                beneficiary: true,
                serviceCategory: true,
            },
        });
    }
    async delete(beneficiaryId, serviceCategoryId) {
        const appointment = await prisma_1.prisma.appointment.findUnique({
            where: {
                beneficiaryId_serviceCategoryId: {
                    beneficiaryId,
                    serviceCategoryId,
                },
            },
        });
        if (!appointment) {
            throw new appointment_not_found_error_1.AppointmentNotFoundError();
        }
        await prisma_1.prisma.appointment.delete({
            where: {
                beneficiaryId_serviceCategoryId: {
                    beneficiaryId,
                    serviceCategoryId,
                },
            },
        });
    }
    async generateCallCode(serviceCategoryId, tx) {
        const category = await tx.serviceCategory.findUnique({
            where: { id: serviceCategoryId },
            select: { prefix: true },
        });
        if (!category) {
            throw new service_category_not_found_error_1.ServiceCategoryNotFoundError();
        }
        const last = await tx.appointment.findFirst({
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
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)()
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map