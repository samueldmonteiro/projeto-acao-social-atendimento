import { Injectable } from '@nestjs/common';
import { prisma } from '@/lib/prisma';
import { CreateBeneficiaryDto, UpdateBeneficiaryDto } from '@/http/dtos/beneficiary.dto';
import { BeneficiaryNotFoundError } from '@/errors/beneficiary-not-found.error';
import { BeneficiaryAlreadyExistsError } from '@/errors/beneficiary-already-exists.error';
import { ServiceCategoryNotFoundError } from '@/errors/service-category-not-found.error';

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

    // 4. Check if new Service Category exists (if provided)
    if (data.serviceCategoryId) {
      const categoryExists = await prisma.serviceCategory.findUnique({
        where: { id: data.serviceCategoryId },
      });

      if (!categoryExists) {
        throw new ServiceCategoryNotFoundError();
      }
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

    if (data.serviceCategoryId) {
      updateData.categories = {
        deleteMany: {},
        create: {
          serviceCategoryId: data.serviceCategoryId,
        },
      };
    }

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
