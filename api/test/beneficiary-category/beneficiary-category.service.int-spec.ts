import { Test } from '@nestjs/testing';
import { prisma } from '@/lib/prisma';
import { AppointmentService } from '@/services/appointment.service';
import { AppModule } from '@/app.module';
import { Gender } from '@/generated/prisma/enums';

describe('AppointmentService Integration', () => {
  let service: AppointmentService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
  });

  beforeEach(async () => {
    await prisma.appointment.deleteMany();
    await prisma.beneficiary.deleteMany();
    await prisma.serviceCategory.deleteMany();
  });

  describe('findMany', () => {
    it('should return appointments with beneficiary and category objects included', async () => {
      const category = await prisma.serviceCategory.create({
        data: { name: 'Assistência Médica', prefix: 'MED' },
      });

      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'Maria da Silva',
          cpf: '11122233344',
          email: 'maria@example.com',
          birthDate: new Date('1990-01-01'),
          gender: Gender.FEMALE,
        },
      });

      await prisma.appointment.create({
        data: {
          beneficiaryId: beneficiary.id,
          serviceCategoryId: category.id,
          callCode: 'MED-0001',
        },
      });

      const result = await service.findMany();

      expect(result.items).toHaveLength(1);
      expect(result.items[0].beneficiaryId).toBe(beneficiary.id);
      expect(result.items[0].serviceCategoryId).toBe(category.id);
      expect(result.items[0].callCode).toBe('MED-0001');
      expect(result.items[0].beneficiary).not.toBeNull();
      expect(result.items[0].beneficiary.fullName).toBe('Maria da Silva');
      expect(result.items[0].serviceCategory).not.toBeNull();
      expect(result.items[0].serviceCategory.name).toBe('Assistência Médica');
    });

    it('should filter appointments by categoryId', async () => {
      const category1 = await prisma.serviceCategory.create({
        data: { name: 'Odontologia', prefix: 'ODO' },
      });

      const category2 = await prisma.serviceCategory.create({
        data: { name: 'Psicologia', prefix: 'PSI' },
      });

      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'João Souza',
          cpf: '22233344455',
          birthDate: new Date('1985-05-10'),
          gender: Gender.MALE,
        },
      });

      await prisma.appointment.create({
        data: {
          beneficiaryId: beneficiary.id,
          serviceCategoryId: category1.id,
          callCode: 'ODO-0001',
        },
      });

      await prisma.appointment.create({
        data: {
          beneficiaryId: beneficiary.id,
          serviceCategoryId: category2.id,
          callCode: 'PSI-0001',
        },
      });

      const result = await service.findMany({ categoryId: category1.id });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].serviceCategoryId).toBe(category1.id);
      expect(result.items[0].callCode).toBe('ODO-0001');
    });

    it('should filter appointments by search term matching beneficiary fields', async () => {
      const category = await prisma.serviceCategory.create({
        data: { name: 'Fisioterapia', prefix: 'FIS' },
      });

      const beneficiary1 = await prisma.beneficiary.create({
        data: {
          fullName: 'Carlos Alberto',
          cpf: '33344455566',
          email: 'carlos@example.com',
          birthDate: new Date('1992-08-20'),
          gender: Gender.MALE,
        },
      });

      const beneficiary2 = await prisma.beneficiary.create({
        data: {
          fullName: 'Roberto Santos',
          cpf: '44455566677',
          email: 'roberto@example.com',
          birthDate: new Date('1988-12-15'),
          gender: Gender.MALE,
        },
      });

      await prisma.appointment.create({
        data: {
          beneficiaryId: beneficiary1.id,
          serviceCategoryId: category.id,
          callCode: 'FIS-0001',
        },
      });

      await prisma.appointment.create({
        data: {
          beneficiaryId: beneficiary2.id,
          serviceCategoryId: category.id,
          callCode: 'FIS-0002',
        },
      });

      // Search by name
      const searchByName = await service.findMany({ search: 'Carlos' });
      expect(searchByName.items).toHaveLength(1);
      expect(searchByName.items[0].beneficiary.fullName).toBe('Carlos Alberto');

      // Search by CPF
      const searchByCpf = await service.findMany({ search: '444555666' });
      expect(searchByCpf.items).toHaveLength(1);
      expect(searchByCpf.items[0].beneficiary.fullName).toBe('Roberto Santos');

      // Search by email
      const searchByEmail = await service.findMany({ search: 'carlos@' });
      expect(searchByEmail.items).toHaveLength(1);
      expect(searchByEmail.items[0].beneficiary.fullName).toBe('Carlos Alberto');
    });

    it('should support pagination with page and perPage parameters', async () => {
      const category = await prisma.serviceCategory.create({
        data: { name: 'Nutrição', prefix: 'NUT' },
      });

      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'Ana Clara',
          cpf: '55566677788',
          birthDate: new Date('2000-02-02'),
          gender: Gender.FEMALE,
        },
      });

      // Link 3 categories (needs categories first)
      const cat2 = await prisma.serviceCategory.create({
        data: { name: 'Nutrição 2', prefix: 'NU2' },
      });
      const cat3 = await prisma.serviceCategory.create({
        data: { name: 'Nutrição 3', prefix: 'NU3' },
      });

      await prisma.appointment.create({
        data: { beneficiaryId: beneficiary.id, serviceCategoryId: category.id, callCode: 'NUT-0001' },
      });
      await prisma.appointment.create({
        data: { beneficiaryId: beneficiary.id, serviceCategoryId: cat2.id, callCode: 'NU2-0001' },
      });
      await prisma.appointment.create({
        data: { beneficiaryId: beneficiary.id, serviceCategoryId: cat3.id, callCode: 'NU3-0001' },
      });

      const page1 = await service.findMany({ page: 1, perPage: 2 });
      const page2 = await service.findMany({ page: 2, perPage: 2 });

      expect(page1.items).toHaveLength(2);
      expect(page2.items).toHaveLength(1);
    });
  });
});
