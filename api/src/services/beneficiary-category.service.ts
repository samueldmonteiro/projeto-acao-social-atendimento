import { Injectable } from '@nestjs/common';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';
import { PaginationResponse } from '@/types/pagination.type';

@Injectable()
export class BeneficiaryCategoryService {
  async findMany(filters: {
    search?: string;
    categoryId?: string;
    page?: number;
    perPage?: number;
  } = {}) {
    const where: Prisma.BeneficiaryCategoryWhereInput = {};

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

    const [data, total] = await prisma.$transaction([
      prisma.beneficiaryCategory.findMany({
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
      prisma.beneficiaryCategory.count({ where }),
    ]);

    const pagination: PaginationResponse<typeof data> = {
      items:data,
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
