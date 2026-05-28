import { Test } from '@nestjs/testing';
import { prisma } from '@/lib/prisma';
import { DashboardService } from '@/services/dashboard.service';
import { AppModule } from '@/app.module';
import { Gender } from '@/generated/prisma/enums';

describe('DashboardService Integration', () => {
  let service: DashboardService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  beforeEach(async () => {
    await prisma.appointment.deleteMany();
    await prisma.beneficiary.deleteMany();
    await prisma.serviceCategory.deleteMany();
  });

  it('should return empty summary when no data exists', async () => {
    const result = await service.getSummary();

    expect(result.overview.totalBeneficiaries).toBe(0);
    expect(result.overview.totalCategories).toBe(0);
    expect(result.overview.totalAppointments).toBe(0);
    expect(result.overview.beneficiariesWithoutCategory).toBe(0);
    expect(result.overview.averageCategoriesPerBeneficiary).toBe(0);
    expect(result.topCategory).toBeNull();
    expect(result.categoriesRanking).toEqual([]);
    expect(result.genderDistribution).toEqual([]);
    expect(result.recentBeneficiaries).toEqual([]);
  });

  it('should return correct overview numbers', async () => {
    const cat1 = await prisma.serviceCategory.create({
      data: { name: 'Saúde', prefix: 'S' },
    });
    const cat2 = await prisma.serviceCategory.create({
      data: { name: 'Educação', prefix: 'E' },
    });

    await prisma.beneficiary.create({
      data: {
        fullName: 'João Silva',
        cpf: '11111111111',
        birthDate: new Date('1990-01-01'),
        gender: Gender.MALE,
        appointments: {
          create: { serviceCategoryId: cat1.id, callCode: 'TST-0001' },
        },
      },
    });

    await prisma.beneficiary.create({
      data: {
        fullName: 'Maria Souza',
        cpf: '22222222222',
        birthDate: new Date('1995-05-15'),
        gender: Gender.FEMALE,
        appointments: {
          create: [
            { serviceCategoryId: cat1.id, callCode: 'TST-0002' },
            { serviceCategoryId: cat2.id, callCode: 'TST-0003' },
          ],
        },
      },
    });

    await prisma.beneficiary.create({
      data: {
        fullName: 'Carlos Lima',
        cpf: '33333333333',
        birthDate: new Date('2000-03-10'),
        gender: Gender.MALE,
      },
    });

    const result = await service.getSummary();

    expect(result.overview.totalBeneficiaries).toBe(3);
    expect(result.overview.totalCategories).toBe(2);
    expect(result.overview.totalAppointments).toBe(3);
    expect(result.overview.beneficiariesWithoutCategory).toBe(1);
    expect(result.overview.averageCategoriesPerBeneficiary).toBe(1);
  });

  it('should return top category and ranking ordered by count desc', async () => {
    const cat1 = await prisma.serviceCategory.create({
      data: { name: 'Saúde', prefix: 'S' },
    });
    const cat2 = await prisma.serviceCategory.create({
      data: { name: 'Educação', prefix: 'E' },
    });

    await prisma.beneficiary.create({
      data: {
        fullName: 'Ana',
        cpf: '1',
        birthDate: new Date(),
        gender: Gender.FEMALE,
        appointments: {
          create: { serviceCategoryId: cat1.id, callCode: 'TST-0004' },
        },
      },
    });

    await prisma.beneficiary.create({
      data: {
        fullName: 'Bia',
        cpf: '2',
        birthDate: new Date(),
        gender: Gender.FEMALE,
        appointments: {
          create: { serviceCategoryId: cat1.id, callCode: 'TST-0005' },
        },
      },
    });

    await prisma.beneficiary.create({
      data: {
        fullName: 'Carlos',
        cpf: '3',
        birthDate: new Date(),
        gender: Gender.MALE,
        appointments: {
          create: { serviceCategoryId: cat2.id, callCode: 'TST-0006' },
        },
      },
    });

    const result = await service.getSummary();

    expect(result.topCategory).not.toBeNull();
    expect(result.topCategory!.name).toBe('Saúde');
    expect(result.topCategory!.totalBeneficiaries).toBe(2);

    expect(result.categoriesRanking).toHaveLength(2);
    expect(result.categoriesRanking[0].name).toBe('Saúde');
    expect(result.categoriesRanking[0].totalBeneficiaries).toBe(2);
    expect(result.categoriesRanking[0].percentage).toBe(66.7);
    expect(result.categoriesRanking[1].name).toBe('Educação');
    expect(result.categoriesRanking[1].totalBeneficiaries).toBe(1);
    expect(result.categoriesRanking[1].percentage).toBe(33.3);
  });

  it('should return gender distribution', async () => {
    await prisma.beneficiary.createMany({
      data: [
        {
          fullName: 'Ana',
          cpf: '1',
          birthDate: new Date(),
          gender: Gender.FEMALE,
        },
        {
          fullName: 'Bia',
          cpf: '2',
          birthDate: new Date(),
          gender: Gender.FEMALE,
        },
        {
          fullName: 'Carlos',
          cpf: '3',
          birthDate: new Date(),
          gender: Gender.MALE,
        },
        {
          fullName: 'Davi',
          cpf: '4',
          birthDate: new Date(),
          gender: Gender.MALE,
        },
        {
          fullName: 'Eva',
          cpf: '5',
          birthDate: new Date(),
          gender: Gender.OTHER,
        },
      ],
    });

    const result = await service.getSummary();

    expect(result.genderDistribution).toHaveLength(3);

    const female = result.genderDistribution.find(
      (g) => g.gender === Gender.FEMALE,
    );
    const male = result.genderDistribution.find(
      (g) => g.gender === Gender.MALE,
    );
    const other = result.genderDistribution.find(
      (g) => g.gender === Gender.OTHER,
    );

    expect(female).toBeDefined();
    expect(female!.count).toBe(2);
    expect(female!.percentage).toBe(40);
    expect(female!.label).toBe('Feminino');

    expect(male).toBeDefined();
    expect(male!.count).toBe(2);
    expect(male!.percentage).toBe(40);
    expect(male!.label).toBe('Masculino');

    expect(other).toBeDefined();
    expect(other!.count).toBe(1);
    expect(other!.percentage).toBe(20);
    expect(other!.label).toBe('Outro');
  });

  it('should return recent beneficiaries (max 5, ordered by createdAt desc)', async () => {
    const beneficiaries = [];
    for (let i = 0; i < 7; i++) {
      const b = await prisma.beneficiary.create({
        data: {
          fullName: `Beneficiário ${i + 1}`,
          cpf: `${i + 1}`.repeat(11).slice(0, 11),
          birthDate: new Date(),
          gender: Gender.MALE,
        },
      });
      beneficiaries.push(b);
    }

    const result = await service.getSummary();

    expect(result.recentBeneficiaries).toHaveLength(5);
    expect(result.recentBeneficiaries[0].fullName).toBe('Beneficiário 7');
    expect(result.recentBeneficiaries[4].fullName).toBe('Beneficiário 3');
  });

  it('should include categories in recent beneficiaries', async () => {
    const cat = await prisma.serviceCategory.create({
      data: { name: 'Saúde', prefix: 'S' },
    });

    await prisma.beneficiary.create({
      data: {
        fullName: 'João',
        cpf: '12345678901',
        birthDate: new Date(),
        gender: Gender.MALE,
        appointments: {
          create: { serviceCategoryId: cat.id, callCode: 'TST-0007' },
        },
      },
    });

    const result = await service.getSummary();

    expect(result.recentBeneficiaries).toHaveLength(1);
    expect(result.recentBeneficiaries[0].appointments).toHaveLength(1);
    expect(result.recentBeneficiaries[0].appointments[0].id).toBe(cat.id);
    expect(result.recentBeneficiaries[0].appointments[0].name).toBe('Saúde');
  });
});
