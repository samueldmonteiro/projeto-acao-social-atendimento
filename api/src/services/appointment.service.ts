import { Injectable } from '@nestjs/common';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';
import { PaginationResponse } from '@/types/pagination.type';
import { AppointmentNotFoundError } from '@/errors/appointment-not-found.error';
import { ServiceCategoryNotFoundError } from '@/errors/service-category-not-found.error';
import { BeneficiaryNotFoundError } from '@/errors/beneficiary-not-found.error';
import { AppointmentAlreadyExistsError } from '@/errors/appointment-already-exists.error';

type PrismaTransactionClient = Prisma.TransactionClient;

@Injectable()
export class AppointmentService {
  async findMany(
    filters: {
      search?: string;
      categoryId?: string;
      page?: number;
      perPage?: number;
      priority?: boolean;
      canceled?: boolean;
      started?: boolean;
      finished?: boolean;
    } = {},
  ) {
    const where: Prisma.AppointmentWhereInput = {};

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
      } else {
        where.startedAt = null;
      }
    }

    if (filters.finished !== undefined) {
      if (filters.finished) {
        where.finishedAt = { not: null };
      } else {
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

    const [data, total] = await prisma.$transaction([
      prisma.appointment.findMany({
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
      prisma.appointment.count({ where }),
    ]);

    const pagination: PaginationResponse<typeof data> = {
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

  async create(data: {
    beneficiaryId: string;
    serviceCategoryId: string;
    priority?: boolean;
  }) {
    return await prisma.$transaction(async (tx) => {
      const beneficiary = await tx.beneficiary.findUnique({
        where: { id: data.beneficiaryId },
      });

      if (!beneficiary) {
        throw new BeneficiaryNotFoundError();
      }

      const category = await tx.serviceCategory.findUnique({
        where: { id: data.serviceCategoryId },
      });

      if (!category) {
        throw new ServiceCategoryNotFoundError();
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
        throw new AppointmentAlreadyExistsError();
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

  async update(
    beneficiaryId: string,
    serviceCategoryId: string,
    data: {
      beneficiaryId?: string;
      serviceCategoryId?: string;
      priority?: boolean;
      canceled?: boolean;
      startedAt?: Date | null;
      finishedAt?: Date | null;
      callCode?: string;
    },
  ) {
    const appointment = await prisma.appointment.findUnique({
      where: {
        beneficiaryId_serviceCategoryId: {
          beneficiaryId,
          serviceCategoryId,
        },
      },
    });

    if (!appointment) {
      throw new AppointmentNotFoundError();
    }

    const updateData: Prisma.AppointmentUpdateInput = {};

    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.canceled !== undefined) updateData.canceled = data.canceled;
    if (data.startedAt !== undefined) updateData.startedAt = data.startedAt;
    if (data.finishedAt !== undefined) updateData.finishedAt = data.finishedAt;
    if (data.callCode !== undefined) updateData.callCode = data.callCode;

    if (
      data.beneficiaryId !== undefined &&
      data.beneficiaryId !== beneficiaryId
    ) {
      const beneficiary = await prisma.beneficiary.findUnique({
        where: { id: data.beneficiaryId },
      });
      if (!beneficiary) {
        throw new BeneficiaryNotFoundError();
      }
      updateData.beneficiary = { connect: { id: data.beneficiaryId } };
    }

    if (
      data.serviceCategoryId !== undefined &&
      data.serviceCategoryId !== serviceCategoryId
    ) {
      const category = await prisma.serviceCategory.findUnique({
        where: { id: data.serviceCategoryId },
      });
      if (!category) {
        throw new ServiceCategoryNotFoundError();
      }
      updateData.serviceCategory = { connect: { id: data.serviceCategoryId } };
    }

    return await prisma.appointment.update({
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

  async delete(beneficiaryId: string, serviceCategoryId: string) {
    const appointment = await prisma.appointment.findUnique({
      where: {
        beneficiaryId_serviceCategoryId: {
          beneficiaryId,
          serviceCategoryId,
        },
      },
    });

    if (!appointment) {
      throw new AppointmentNotFoundError();
    }

    await prisma.appointment.delete({
      where: {
        beneficiaryId_serviceCategoryId: {
          beneficiaryId,
          serviceCategoryId,
        },
      },
    });
  }

  private async generateCallCode(
    serviceCategoryId: string,
    tx: PrismaTransactionClient,
  ): Promise<string> {
    const category = await tx.serviceCategory.findUnique({
      where: { id: serviceCategoryId },
      select: { prefix: true },
    });

    if (!category) {
      throw new ServiceCategoryNotFoundError();
    }

    // Busca o último callCode criado para esta categoria, ordenado desc
    const last = await tx.appointment.findFirst({
      where: { serviceCategoryId },
      orderBy: { callCode: 'desc' },
      select: { callCode: true },
    });

    let nextNumber = 1;

    if (last) {
      // callCode formato: "PREFIX-NNNN" — extrai a parte numérica após o "-"
      const parts = last.callCode.split('-');
      const lastNumber = parseInt(parts[parts.length - 1], 10);
      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }

    const paddedNumber = String(nextNumber).padStart(4, '0');
    return `${category.prefix}-${paddedNumber}`;
  }
}
