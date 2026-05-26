import { Injectable } from '@nestjs/common';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';
import { CreateBeneficiaryDto, UpdateBeneficiaryDto } from '@/http/dtos/beneficiary.dto';
import { BeneficiaryNotFoundError } from '@/errors/beneficiary-not-found.error';
import { BeneficiaryAlreadyExistsError } from '@/errors/beneficiary-already-exists.error';
import { ServiceCategoryNotFoundError } from '@/errors/service-category-not-found.error';
import { CategoryAlreadyLinkedError } from '@/errors/category-already-linked.error';
import { PaginationResponse } from '@/types/pagination.type';

type PrismaTransactionClient = Prisma.TransactionClient;


@Injectable()
export class BeneficiaryService {
  
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
    const last = await tx.beneficiaryCategory.findFirst({
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

  async create(data: CreateBeneficiaryDto) {
    return await prisma.$transaction(async (tx) => {
      // 1. Check if Service Category exists
      const categoryExists = await tx.serviceCategory.findUnique({
        where: { id: data.serviceCategoryId },
      });

      if (!categoryExists) {
        throw new ServiceCategoryNotFoundError();
      }

      // 2. Check if CPF is already in use
      const cpfExists = await tx.beneficiary.findUnique({
        where: { cpf: data.cpf },
      });

      if (cpfExists) {
        throw new BeneficiaryAlreadyExistsError('Beneficiário com este CPF já cadastrado');
      }

      // 3. Check if Email is already in use (if provided)
      if (data.email) {
        const emailExists = await tx.beneficiary.findUnique({
          where: { email: data.email },
        });

        if (emailExists) {
          throw new BeneficiaryAlreadyExistsError('Beneficiário com este e-mail já cadastrado');
        }
      }

      // 4. Generate callCode for the initial service category
      const callCode = await this.generateCallCode(data.serviceCategoryId, tx);

      // 5. Create beneficiary and link to service category with generated callCode
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
          throw new BeneficiaryAlreadyExistsError('Beneficiário com este CPF já cadastrado');
        }
      }

      // 3. Check if new Email is already in use by another beneficiary
      if (data.email && data.email !== beneficiary.email) {
        const emailExists = await tx.beneficiary.findUnique({
          where: { email: data.email },
        });

        if (emailExists) {
          throw new BeneficiaryAlreadyExistsError('Beneficiário com este e-mail já cadastrado');
        }
      }

      // 4. Handle serviceCategoryId update (replaces all existing links with a new one)
      if (data.serviceCategoryId) {
        const categoryExists = await tx.serviceCategory.findUnique({
          where: { id: data.serviceCategoryId },
        });

        if (!categoryExists) {
          throw new ServiceCategoryNotFoundError();
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

      // 5. Update beneficiary fields (PATCH style)
      const updateData: any = {
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

  async addCategory(id: string, serviceCategoryId: string) {
    return await prisma.$transaction(async (tx) => {
      const beneficiary = await tx.beneficiary.findUnique({
        where: { id },
      });

      if (!beneficiary) {
        throw new BeneficiaryNotFoundError();
      }

      const category = await tx.serviceCategory.findUnique({
        where: { id: serviceCategoryId },
      });

      if (!category) {
        throw new ServiceCategoryNotFoundError();
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
        throw new CategoryAlreadyLinkedError();
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

  async removeCategory(id: string, serviceCategoryId: string) {
    const beneficiary = await prisma.beneficiary.findUnique({
      where: { id },
    });

    if (!beneficiary) {
      throw new BeneficiaryNotFoundError();
    }

    const existing = await prisma.beneficiaryCategory.findUnique({
      where: {
        beneficiaryId_serviceCategoryId: {
          beneficiaryId: id,
          serviceCategoryId,
        },
      },
    });

    if (!existing) {
      throw new ServiceCategoryNotFoundError('Vínculo entre beneficiário e categoria não encontrado');
    }

    await prisma.beneficiaryCategory.delete({
      where: {
        beneficiaryId_serviceCategoryId: {
          beneficiaryId: id,
          serviceCategoryId,
        },
      },
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
      throw new BeneficiaryNotFoundError();
    }

    return beneficiary;
  }

  async findMany(filters: {
    search?: string;
    serviceCategoryId?: string;
    page?: number;
    perPage?: number;
  } = {}) {
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
      where.categories = {
        some: {
          serviceCategoryId: filters.serviceCategoryId,
        },
      };
    }

    const [data, total] = await prisma.$transaction([
      prisma.beneficiary.findMany({
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
