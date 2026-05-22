import { Injectable } from '@nestjs/common';
import { prisma } from '@/lib/prisma';
import { CreateBeneficiaryDto, UpdateBeneficiaryDto } from '@/http/dtos/beneficiary.dto';
import { BeneficiaryNotFoundError } from '@/errors/beneficiary-not-found.error';
import { BeneficiaryAlreadyExistsError } from '@/errors/beneficiary-already-exists.error';
import { ServiceCategoryNotFoundError } from '@/errors/service-category-not-found.error';
import { CategoryAlreadyLinkedError } from '@/errors/category-already-linked.error';

@Injectable()
export class BeneficiaryService {
  async create(data: CreateBeneficiaryDto) {
    // 1. Check if Service Category exists
    const categoryExists = await prisma.serviceCategory.findUnique({
      where: { id: data.serviceCategoryId },
    });

    if (!categoryExists) {
      throw new ServiceCategoryNotFoundError();
    }

    // 2. Check if CPF is already in use
    const cpfExists = await prisma.beneficiary.findUnique({
      where: { cpf: data.cpf },
    });

    if (cpfExists) {
      throw new BeneficiaryAlreadyExistsError('Beneficiário com este CPF já cadastrado');
    }

    // 3. Check if Email is already in use (if provided)
    if (data.email) {
      const emailExists = await prisma.beneficiary.findUnique({
        where: { email: data.email },
      });

      if (emailExists) {
        throw new BeneficiaryAlreadyExistsError('Beneficiário com este e-mail já cadastrado');
      }
    }

    // 4. Create beneficiary and link to service category
    return await prisma.beneficiary.create({
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

  async update(id: string, data: UpdateBeneficiaryDto) {
    // 1. Check if beneficiary exists
    const beneficiary = await prisma.beneficiary.findUnique({
      where: { id },
    });

    if (!beneficiary) {
      throw new BeneficiaryNotFoundError();
    }

    // 2. Check if new CPF is already in use by another beneficiary
    if (data.cpf && data.cpf !== beneficiary.cpf) {
      const cpfExists = await prisma.beneficiary.findUnique({
        where: { cpf: data.cpf },
      });

      if (cpfExists) {
        throw new BeneficiaryAlreadyExistsError('Beneficiário com este CPF já cadastrado');
      }
    }

    // 3. Check if new Email is already in use by another beneficiary
    if (data.email && data.email !== beneficiary.email) {
      const emailExists = await prisma.beneficiary.findUnique({
        where: { email: data.email },
      });

      if (emailExists) {
        throw new BeneficiaryAlreadyExistsError('Beneficiário com este e-mail já cadastrado');
      }
    }

    // 4. Handle serviceCategoryId update
    if (data.serviceCategoryId) {
      const categoryExists = await prisma.serviceCategory.findUnique({
        where: { id: data.serviceCategoryId },
      });

      if (!categoryExists) {
        throw new ServiceCategoryNotFoundError();
      }

      await prisma.beneficiaryCategory.deleteMany({
        where: { beneficiaryId: id },
      });

      await prisma.beneficiaryCategory.create({
        data: {
          beneficiaryId: id,
          serviceCategoryId: data.serviceCategoryId,
        },
      });
    }

    // 5. Update beneficiary (PATCH style)
    const updateData: any = {
      fullName: data.fullName,
      cpf: data.cpf,
      email: data.email,
      phone: data.phone,
      birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      gender: data.gender,
    };

    return await prisma.beneficiary.update({
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

  async addCategory(id: string, serviceCategoryId: string) {
    const beneficiary = await prisma.beneficiary.findUnique({
      where: { id },
    });

    if (!beneficiary) {
      throw new BeneficiaryNotFoundError();
    }

    const category = await prisma.serviceCategory.findUnique({
      where: { id: serviceCategoryId },
    });

    if (!category) {
      throw new ServiceCategoryNotFoundError();
    }

    const existing = await prisma.beneficiaryCategory.findUnique({
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

    return await prisma.beneficiaryCategory.create({
      data: {
        beneficiaryId: id,
        serviceCategoryId,
      },
      include: {
        serviceCategory: true,
      },
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
            serviceCategoryId: true,
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

    return await prisma.beneficiary.findMany({
      where,
      include: {
        categories: {
          select: {
            serviceCategory: true,
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
}
