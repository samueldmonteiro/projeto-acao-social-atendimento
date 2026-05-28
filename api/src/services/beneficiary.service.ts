import { Injectable } from '@nestjs/common';
import { prisma } from '@/lib/prisma';
import {
  CreateBeneficiaryDto,
  UpdateBeneficiaryDto,
} from '@/http/dtos/beneficiary.dto';
import { BeneficiaryNotFoundError } from '@/errors/beneficiary-not-found.error';
import { BeneficiaryAlreadyExistsError } from '@/errors/beneficiary-already-exists.error';
import { PaginationResponse } from '@/types/pagination.type';

@Injectable()
export class BeneficiaryService {
  async create(data: CreateBeneficiaryDto) {
    return await prisma.$transaction(async (tx) => {
      // 2. Check if CPF is already in use (if provided)
      if (data.cpf) {
        const cpfExists = await tx.beneficiary.findUnique({
          where: { cpf: data.cpf },
        });

        if (cpfExists) {
          throw new BeneficiaryAlreadyExistsError(
            'Beneficiário com este CPF já cadastrado',
          );
        }
      }

      // 3. Check if Email is already in use (if provided)
      if (data.email) {
        const emailExists = await tx.beneficiary.findUnique({
          where: { email: data.email },
        });

        if (emailExists) {
          throw new BeneficiaryAlreadyExistsError(
            'Beneficiário com este e-mail já cadastrado',
          );
        }
      }

      // 5. Create beneficiary
      return await tx.beneficiary.create({
        data: {
          fullName: data.fullName,
          cpf: data.cpf,
          email: data.email,
          phone: data.phone,
          birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
          gender: data.gender,
          address: data.address,
        },
        include: {
          appointments: { include: { serviceCategory: true } },
        },
      });
    });
  }

  async update(id: string, data: UpdateBeneficiaryDto) {
    return await prisma.$transaction(async (tx) => {
      // 1. Check if beneficiary exists
      const beneficiary = await tx.beneficiary.findUnique({
        where: { id },
      });

      if (!beneficiary) {
        throw new BeneficiaryNotFoundError();
      }

      // 2. Check if new CPF is already in use by another beneficiary
      if (data.cpf && data.cpf !== beneficiary.cpf) {
        const cpfExists = await tx.beneficiary.findUnique({
          where: { cpf: data.cpf },
        });

        if (cpfExists) {
          throw new BeneficiaryAlreadyExistsError(
            'Beneficiário com este CPF já cadastrado',
          );
        }
      }

      // 3. Check if new Email is already in use by another beneficiary
      if (data.email && data.email !== beneficiary.email) {
        const emailExists = await tx.beneficiary.findUnique({
          where: { email: data.email },
        });

        if (emailExists) {
          throw new BeneficiaryAlreadyExistsError(
            'Beneficiário com este e-mail já cadastrado',
          );
        }
      }

      // 5. Update beneficiary fields (PATCH style)
      const updateData: any = {
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

  async delete(id: string) {
    const beneficiary = await prisma.beneficiary.findUnique({
      where: { id },
    });

    if (!beneficiary) {
      throw new BeneficiaryNotFoundError();
    }

    await prisma.beneficiary.delete({
      where: { id },
    });
  }

  async findById(id: string) {
    const beneficiary = await prisma.beneficiary.findUnique({
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
      throw new BeneficiaryNotFoundError();
    }

    return beneficiary;
  }

  async findMany(
    filters: {
      search?: string;
      serviceCategoryId?: string;
      page?: number;
      perPage?: number;
    } = {},
  ) {
    const where: any = {};

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

    const [data, total] = await prisma.$transaction([
      prisma.beneficiary.findMany({
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
      prisma.beneficiary.count({ where }),
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
}
