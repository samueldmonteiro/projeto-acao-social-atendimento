import { Injectable } from '@nestjs/common';
import { prisma } from '@/lib/prisma';
import { CreateServiceCategoryDto, UpdateServiceCategoryDto } from '@/http/dtos/service-category.dto';
import { ServiceCategoryNotFoundError } from '@/errors/service-category-not-found.error';
import { ServiceCategoryAlreadyExistsError } from '@/errors/service-category-already-exists.error';

@Injectable()
export class ServiceCategoryService {
  async create(data: CreateServiceCategoryDto) {
    const exists = await prisma.serviceCategory.findUnique({
      where: { name: data.name },
    });
    
    if (exists) {
      throw new ServiceCategoryAlreadyExistsError();
    }

    const prefix = data.prefix ?? data.name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 5);

    return await prisma.serviceCategory.create({
      data: {
        name: data.name,
        prefix,
      },
    });
  }

  async update(id: string, data: UpdateServiceCategoryDto) {
    const category = await prisma.serviceCategory.findUnique({
      where: { id },
    });

    if (!category) {
      throw new ServiceCategoryNotFoundError();
    }

    if (data.name && data.name !== category.name) {
      const exists = await prisma.serviceCategory.findUnique({
        where: { name: data.name },
      });

      if (exists) {
        throw new ServiceCategoryAlreadyExistsError();
      }
    }

    const updateData: Record<string, string> = {};
    if (data.name) updateData.name = data.name;
    if (data.prefix) updateData.prefix = data.prefix;

    return await prisma.serviceCategory.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    const category = await prisma.serviceCategory.findUnique({
      where: { id },
    });

    if (!category) {
      throw new ServiceCategoryNotFoundError();
    }

    await prisma.serviceCategory.delete({
      where: { id },
    });
  }

  async findById(id: string) {
    const category = await prisma.serviceCategory.findUnique({
      where: { id },
    });

    if (!category) {
      throw new ServiceCategoryNotFoundError();
    }

    return category;
  }

  async findMany(search?: string) {
    return await prisma.serviceCategory.findMany({
      where: search
        ? {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }
        : undefined,
      orderBy: {
        name: 'asc',
      },
    });
  }
}

