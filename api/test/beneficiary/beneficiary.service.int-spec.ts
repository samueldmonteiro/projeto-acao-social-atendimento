import { Test } from '@nestjs/testing';
import { prisma } from '@/lib/prisma';
import { BeneficiaryService } from '@/services/beneficiary.service';
import { AppModule } from '@/app.module';
import { BeneficiaryNotFoundError } from '@/errors/beneficiary-not-found.error';
import { BeneficiaryAlreadyExistsError } from '@/errors/beneficiary-already-exists.error';
import { ServiceCategoryNotFoundError } from '@/errors/service-category-not-found.error';
import { CategoryAlreadyLinkedError } from '@/errors/category-already-linked.error';
import { Gender } from '@/generated/prisma/enums';

describe('BeneficiaryService Integration', () => {
  let service: BeneficiaryService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<BeneficiaryService>(BeneficiaryService);
  });

  beforeEach(async () => {
    await prisma.beneficiaryCategory.deleteMany();
    await prisma.beneficiary.deleteMany();
    await prisma.serviceCategory.deleteMany();
  });

  describe('create', () => {
    it('should create a beneficiary successfully and link to a service category', async () => {
      const category = await prisma.serviceCategory.create({
        data: { name: 'Saúde' },
      });

      const beneficiary = await service.create({
        fullName: 'João Silva',
        cpf: '12345678901',
        email: 'joao@example.com',
        birthDate: '1995-05-15T00:00:00.000Z',
        gender: Gender.MALE,
        serviceCategoryId: category.id,
      });

      expect(beneficiary).toHaveProperty('id');
      expect(beneficiary.fullName).toBe('João Silva');
      expect(beneficiary.cpf).toBe('12345678901');
      expect(beneficiary.email).toBe('joao@example.com');
      expect(beneficiary.categories).toHaveLength(1);
      expect(beneficiary.categories[0].serviceCategoryId).toBe(category.id);

      const dbBeneficiary = await prisma.beneficiary.findUnique({
        where: { id: beneficiary.id },
        include: { categories: true },
      });

      expect(dbBeneficiary).not.toBeNull();
      expect(dbBeneficiary?.fullName).toBe('João Silva');
      expect(dbBeneficiary?.categories).toHaveLength(1);
      expect(dbBeneficiary?.categories[0].serviceCategoryId).toBe(category.id);
    });

    it('should throw ServiceCategoryNotFoundError if the category does not exist', async () => {
      await expect(
        service.create({
          fullName: 'João Silva',
          cpf: '12345678901',
          email: 'joao@example.com',
          birthDate: '1995-05-15T00:00:00.000Z',
          gender: Gender.MALE,
          serviceCategoryId: 'non-existent-category-id',
        }),
      ).rejects.toThrow(ServiceCategoryNotFoundError);
    });

    it('should throw BeneficiaryAlreadyExistsError if a beneficiary with the same CPF exists', async () => {
      const category = await prisma.serviceCategory.create({
        data: { name: 'Saúde' },
      });

      await prisma.beneficiary.create({
        data: {
          fullName: 'Maria Silva',
          cpf: '12345678901',
          birthDate: new Date('1990-01-01'),
          gender: Gender.FEMALE,
        },
      });

      await expect(
        service.create({
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: '1995-05-15T00:00:00.000Z',
          gender: Gender.MALE,
          serviceCategoryId: category.id,
        }),
      ).rejects.toThrow(BeneficiaryAlreadyExistsError);
    });

    it('should throw BeneficiaryAlreadyExistsError if a beneficiary with the same email exists', async () => {
      const category = await prisma.serviceCategory.create({
        data: { name: 'Saúde' },
      });

      await prisma.beneficiary.create({
        data: {
          fullName: 'Maria Silva',
          cpf: '98765432109',
          email: 'duplicate@example.com',
          birthDate: new Date('1990-01-01'),
          gender: Gender.FEMALE,
        },
      });

      await expect(
        service.create({
          fullName: 'João Silva',
          cpf: '12345678901',
          email: 'duplicate@example.com',
          birthDate: '1995-05-15T00:00:00.000Z',
          gender: Gender.MALE,
          serviceCategoryId: category.id,
        }),
      ).rejects.toThrow(BeneficiaryAlreadyExistsError);
    });
  });

  describe('update', () => {
    it('should patch a beneficiary successfully without updating everything', async () => {
      const category = await prisma.serviceCategory.create({
        data: { name: 'Saúde' },
      });

      const created = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          email: 'joao@example.com',
          birthDate: new Date('1995-05-15T00:00:00.000Z'),
          gender: Gender.MALE,
          categories: {
            create: { serviceCategoryId: category.id },
          },
        },
      });

      const updated = await service.update(created.id, {
        fullName: 'João de Silva',
      });

      expect(updated.fullName).toBe('João de Silva');
      expect(updated.cpf).toBe('12345678901'); // remains unchanged
      expect(updated.email).toBe('joao@example.com'); // remains unchanged
    });

    it('should update service category successfully', async () => {
      const category1 = await prisma.serviceCategory.create({
        data: { name: 'Saúde' },
      });

      const category2 = await prisma.serviceCategory.create({
        data: { name: 'Educação' },
      });

      const created = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15T00:00:00.000Z'),
          gender: Gender.MALE,
          categories: {
            create: { serviceCategoryId: category1.id },
          },
        },
      });

      const updated = await service.update(created.id, {
        serviceCategoryId: category2.id,
      });

      expect(updated.categories).toHaveLength(1);
      expect(updated.categories[0].serviceCategoryId).toBe(category2.id);

      const dbCategoryRelations = await prisma.beneficiaryCategory.findMany({
        where: { beneficiaryId: created.id },
      });
      expect(dbCategoryRelations).toHaveLength(1);
      expect(dbCategoryRelations[0].serviceCategoryId).toBe(category2.id);
    });

    it('should throw BeneficiaryNotFoundError when updating a non-existent beneficiary', async () => {
      await expect(
        service.update('non-existent-id', { fullName: 'Teste' }),
      ).rejects.toThrow(BeneficiaryNotFoundError);
    });

    it('should throw ServiceCategoryNotFoundError when updating to a non-existent category', async () => {
      const created = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15T00:00:00.000Z'),
          gender: Gender.MALE,
        },
      });

      await expect(
        service.update(created.id, { serviceCategoryId: 'non-existent-cat' }),
      ).rejects.toThrow(ServiceCategoryNotFoundError);
    });

    it('should throw BeneficiaryAlreadyExistsError if updated CPF is already taken', async () => {
      const created1 = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15T00:00:00.000Z'),
          gender: Gender.MALE,
        },
      });

      await prisma.beneficiary.create({
        data: {
          fullName: 'Maria Silva',
          cpf: '98765432109',
          birthDate: new Date('1990-01-01'),
          gender: Gender.FEMALE,
        },
      });

      await expect(
        service.update(created1.id, { cpf: '98765432109' }),
      ).rejects.toThrow(BeneficiaryAlreadyExistsError);
    });
  });

  describe('addCategory', () => {
    it('should link a category to an existing beneficiary', async () => {
      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15'),
          gender: Gender.MALE,
        },
      });
      const category = await prisma.serviceCategory.create({
        data: { name: 'Saúde' },
      });

      const result = await service.addCategory(beneficiary.id, category.id);

      expect(result.beneficiaryId).toBe(beneficiary.id);
      expect(result.serviceCategoryId).toBe(category.id);

      const dbRelation = await prisma.beneficiaryCategory.findUnique({
        where: {
          beneficiaryId_serviceCategoryId: {
            beneficiaryId: beneficiary.id,
            serviceCategoryId: category.id,
          },
        },
      });
      expect(dbRelation).not.toBeNull();
    });

    it('should throw BeneficiaryNotFoundError if beneficiary does not exist', async () => {
      const category = await prisma.serviceCategory.create({
        data: { name: 'Saúde' },
      });

      await expect(
        service.addCategory('non-existent-id', category.id),
      ).rejects.toThrow(BeneficiaryNotFoundError);
    });

    it('should throw ServiceCategoryNotFoundError if category does not exist', async () => {
      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15'),
          gender: Gender.MALE,
        },
      });

      await expect(
        service.addCategory(beneficiary.id, 'non-existent-category'),
      ).rejects.toThrow(ServiceCategoryNotFoundError);
    });

    it('should throw CategoryAlreadyLinkedError if the link already exists', async () => {
      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15'),
          gender: Gender.MALE,
        },
      });
      const category = await prisma.serviceCategory.create({
        data: { name: 'Saúde' },
      });

      await prisma.beneficiaryCategory.create({
        data: {
          beneficiaryId: beneficiary.id,
          serviceCategoryId: category.id,
        },
      });

      await expect(
        service.addCategory(beneficiary.id, category.id),
      ).rejects.toThrow(CategoryAlreadyLinkedError);
    });
  });

  describe('removeCategory', () => {
    it('should unlink a category from a beneficiary', async () => {
      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15'),
          gender: Gender.MALE,
        },
      });
      const category = await prisma.serviceCategory.create({
        data: { name: 'Saúde' },
      });

      await prisma.beneficiaryCategory.create({
        data: {
          beneficiaryId: beneficiary.id,
          serviceCategoryId: category.id,
        },
      });

      await service.removeCategory(beneficiary.id, category.id);

      const dbRelation = await prisma.beneficiaryCategory.findUnique({
        where: {
          beneficiaryId_serviceCategoryId: {
            beneficiaryId: beneficiary.id,
            serviceCategoryId: category.id,
          },
        },
      });
      expect(dbRelation).toBeNull();
    });

    it('should throw BeneficiaryNotFoundError if beneficiary does not exist', async () => {
      await expect(
        service.removeCategory('non-existent-id', 'any-category'),
      ).rejects.toThrow(BeneficiaryNotFoundError);
    });

    it('should throw ServiceCategoryNotFoundError if the link does not exist', async () => {
      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15'),
          gender: Gender.MALE,
        },
      });

      await expect(
        service.removeCategory(beneficiary.id, 'non-existent-link'),
      ).rejects.toThrow(ServiceCategoryNotFoundError);
    });
  });

  describe('delete', () => {
    it('should delete a beneficiary successfully', async () => {
      const created = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15T00:00:00.000Z'),
          gender: Gender.MALE,
        },
      });

      await service.delete(created.id);

      const dbBeneficiary = await prisma.beneficiary.findUnique({
        where: { id: created.id },
      });
      expect(dbBeneficiary).toBeNull();
    });

    it('should throw BeneficiaryNotFoundError if deleting non-existent beneficiary', async () => {
      await expect(service.delete('non-existent-id')).rejects.toThrow(
        BeneficiaryNotFoundError,
      );
    });
  });

  describe('findById', () => {
    it('should retrieve a beneficiary by ID', async () => {
      const created = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15T00:00:00.000Z'),
          gender: Gender.MALE,
        },
      });

      const found = await service.findById(created.id);
      expect(found.id).toBe(created.id);
      expect(found.fullName).toBe('João Silva');
    });

    it('should throw BeneficiaryNotFoundError when searching non-existent ID', async () => {
      await expect(service.findById('non-existent-id')).rejects.toThrow(
        BeneficiaryNotFoundError,
      );
    });
  });

  describe('findMany', () => {
    it('should paginate beneficiaries with page and perPage', async () => {
      const items = Array.from({ length: 15 }, (_, i) => ({
        fullName: `Beneficiário ${String(i + 1).padStart(2, '0')}`,
        cpf: String(i + 100).padStart(11, '0'),
        birthDate: new Date(),
        gender: i % 2 === 0 ? Gender.MALE : Gender.FEMALE,
      }));

      await prisma.beneficiary.createMany({ data: items });

      const page1 = await service.findMany({ page: 1, perPage: 5 });
      expect(page1.data).toHaveLength(5);
      expect(page1.data[0].fullName).toBe('Beneficiário 01');
      expect(page1.data[4].fullName).toBe('Beneficiário 05');
      expect(page1.pagination.total).toBe(15);
      expect(page1.pagination.page).toBe(1);
      expect(page1.pagination.hasNextPage).toBe(true);
      expect(page1.pagination.hasPrevPage).toBe(false);

      const page2 = await service.findMany({ page: 2, perPage: 5 });
      expect(page2.data).toHaveLength(5);
      expect(page2.data[0].fullName).toBe('Beneficiário 06');
      expect(page2.data[4].fullName).toBe('Beneficiário 10');
      expect(page2.pagination.page).toBe(2);
      expect(page2.pagination.hasNextPage).toBe(true);
      expect(page2.pagination.hasPrevPage).toBe(true);

      const page3 = await service.findMany({ page: 3, perPage: 5 });
      expect(page3.data).toHaveLength(5);
      expect(page3.data[0].fullName).toBe('Beneficiário 11');
      expect(page3.data[4].fullName).toBe('Beneficiário 15');

      const page4 = await service.findMany({ page: 4, perPage: 5 });
      expect(page4.data).toHaveLength(0);
      expect(page4.pagination.hasNextPage).toBe(false);
      expect(page4.pagination.hasPrevPage).toBe(true);
    });

    it('should default to page 1 with 10 per page', async () => {
      const items = Array.from({ length: 12 }, (_, i) => ({
        fullName: `B${String(i + 1).padStart(2, '0')}`,
        cpf: `${i + 10}`.repeat(11).slice(0, 11),
        birthDate: new Date(),
        gender: Gender.MALE,
      }));

      await prisma.beneficiary.createMany({ data: items });

      const result = await service.findMany({});
      expect(result.data).toHaveLength(10);
      expect(result.data[0].fullName).toBe('B01');
      expect(result.pagination.limit).toBe(10);
    });

    it('should list all beneficiaries ordered by name asc', async () => {
      await prisma.beneficiary.createMany({
        data: [
          { fullName: 'Carlos Silva', cpf: '1', birthDate: new Date(), gender: Gender.MALE },
          { fullName: 'Ana Silva', cpf: '2', birthDate: new Date(), gender: Gender.FEMALE },
          { fullName: 'Bruna Silva', cpf: '3', birthDate: new Date(), gender: Gender.FEMALE },
        ],
      });

      const list = await service.findMany({});
      expect(list.data).toHaveLength(3);
      expect(list.data[0].fullName).toBe('Ana Silva');
      expect(list.data[1].fullName).toBe('Bruna Silva');
      expect(list.data[2].fullName).toBe('Carlos Silva');
    });

    it('should filter beneficiaries by search parameter', async () => {
      await prisma.beneficiary.createMany({
        data: [
          { fullName: 'Carlos Alberto', cpf: '123', email: 'carlos@example.com', birthDate: new Date(), gender: Gender.MALE },
          { fullName: 'Ana Maria', cpf: '456', email: 'ana@example.com', birthDate: new Date(), gender: Gender.FEMALE },
        ],
      });

      const searchByName = await service.findMany({ search: 'carlos' });
      expect(searchByName.data).toHaveLength(1);
      expect(searchByName.data[0].fullName).toBe('Carlos Alberto');

      const searchByCpf = await service.findMany({ search: '456' });
      expect(searchByCpf.data).toHaveLength(1);
      expect(searchByCpf.data[0].fullName).toBe('Ana Maria');
    });

    it('should filter beneficiaries by serviceCategoryId', async () => {
      const cat = await prisma.serviceCategory.create({
        data: { name: 'Saúde' },
      });

      await prisma.beneficiary.create({
        data: {
          fullName: 'Carlos Alberto',
          cpf: '123',
          birthDate: new Date(),
          gender: Gender.MALE,
          categories: {
            create: { serviceCategoryId: cat.id },
          },
        },
      });

      await prisma.beneficiary.create({
        data: {
          fullName: 'Ana Maria',
          cpf: '456',
          birthDate: new Date(),
          gender: Gender.FEMALE,
        },
      });

      const listFiltered = await service.findMany({ serviceCategoryId: cat.id });
      expect(listFiltered.data).toHaveLength(1);
      expect(listFiltered.data[0].fullName).toBe('Carlos Alberto');
    });
  });
});
