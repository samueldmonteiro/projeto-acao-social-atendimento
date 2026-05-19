import { Test } from '@nestjs/testing';
import { prisma } from '@/lib/prisma';
import { ServiceCategoryService } from '@/services/service-category.service';
import { AppModule } from '@/app.module';
import { ServiceCategoryAlreadyExistsError } from '@/errors/service-category-already-exists.error';
import { ServiceCategoryNotFoundError } from '@/errors/service-category-not-found.error';

describe('ServiceCategoryService Integration', () => {
  let service: ServiceCategoryService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<ServiceCategoryService>(ServiceCategoryService);
  });

  beforeEach(async () => {
    await prisma.beneficiaryCategory.deleteMany();
    await prisma.serviceCategory.deleteMany();
  });

  describe('create', () => {
    it('should create a service category successfully', async () => {
      const category = await service.create({ name: 'Saúde' });

      expect(category).toHaveProperty('id');
      expect(category.name).toBe('Saúde');

      const dbCategory = await prisma.serviceCategory.findUnique({
        where: { id: category.id },
      });
      expect(dbCategory).not.toBeNull();
      expect(dbCategory?.name).toBe('Saúde');
    });

    it('should throw ServiceCategoryAlreadyExistsError if a category with the same name exists', async () => {
      await prisma.serviceCategory.create({
        data: { name: 'Saúde' },
      });

      await expect(service.create({ name: 'Saúde' })).rejects.toThrow(
        ServiceCategoryAlreadyExistsError,
      );
    });
  });

  describe('update', () => {
    it('should update a service category name successfully', async () => {
      const created = await prisma.serviceCategory.create({
        data: { name: 'Alimentação' },
      });

      const updated = await service.update(created.id, { name: 'Alimentação Saudável' });

      expect(updated.name).toBe('Alimentação Saudável');

      const dbCategory = await prisma.serviceCategory.findUnique({
        where: { id: created.id },
      });
      expect(dbCategory?.name).toBe('Alimentação Saudável');
    });

    it('should allow updating the category even if name is not changed (retains existing)', async () => {
      const created = await prisma.serviceCategory.create({
        data: { name: 'Educação' },
      });

      const updated = await service.update(created.id, { name: 'Educação' });

      expect(updated.name).toBe('Educação');
    });

    it('should throw ServiceCategoryAlreadyExistsError if the name is already taken by another category', async () => {
      await prisma.serviceCategory.create({
        data: { name: 'Educação' },
      });
      const cat2 = await prisma.serviceCategory.create({
        data: { name: 'Saúde' },
      }); 

      await expect(
        service.update(cat2.id, { name: 'Educação' }),
      ).rejects.toThrow(ServiceCategoryAlreadyExistsError);
    });

    it('should throw ServiceCategoryNotFoundError if updating a non-existent category', async () => {
      await expect(
        service.update('non-existent-id', { name: 'Inovação' }),
      ).rejects.toThrow(ServiceCategoryNotFoundError);
    });
  });

  describe('delete', () => {
    it('should delete a service category successfully', async () => {
      const created = await prisma.serviceCategory.create({
        data: { name: 'Lazer' },
      });

      await service.delete(created.id);

      const dbCategory = await prisma.serviceCategory.findUnique({
        where: { id: created.id },
      });
      expect(dbCategory).toBeNull();
    });

    it('should throw ServiceCategoryNotFoundError if deleting a non-existent category', async () => {
      await expect(service.delete('non-existent-id')).rejects.toThrow(
        ServiceCategoryNotFoundError,
      );
    });
  });

  describe('findById', () => {
    it('should retrieve a category by its ID', async () => {
      const created = await prisma.serviceCategory.create({
        data: { name: 'Cultura' },
      });

      const found = await service.findById(created.id);

      expect(found.id).toBe(created.id);
      expect(found.name).toBe('Cultura');
    });

    it('should throw ServiceCategoryNotFoundError if searching for a non-existent category ID', async () => {
      await expect(service.findById('non-existent-id')).rejects.toThrow(
        ServiceCategoryNotFoundError,
      );
    });
  });

  describe('findMany', () => {
    it('should list all categories ordered by name asc', async () => {
      await prisma.serviceCategory.createMany({
        data: [{ name: 'Cultura' }, { name: 'Alimentação' }, { name: 'Saúde' }],
      });

      const list = await service.findMany();

      expect(list).toHaveLength(3);
      expect(list[0].name).toBe('Alimentação');
      expect(list[1].name).toBe('Cultura');
      expect(list[2].name).toBe('Saúde');
    });

    it('should return matching categories case-insensitively when search query is passed', async () => {
      await prisma.serviceCategory.createMany({
        data: [
          { name: 'Assistência Social' },
          { name: 'Assistência Médica' },
          { name: 'Educação' },
        ],
      });

      const list = await service.findMany('assistência');

      expect(list).toHaveLength(2);
      expect(list[0].name).toBe('Assistência Médica');
      expect(list[1].name).toBe('Assistência Social');
    });
  });
});
