import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import { AppModule } from '@/app.module';
import { JwtService } from '@nestjs/jwt';
import { Gender } from '@/generated/prisma/enums';

describe('DashboardController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const jwtService = moduleFixture.get<JwtService>(JwtService);
    await prisma.user.deleteMany();
    const user = await prisma.user.create({
      data: {
        email: 'e2e@test.com',
        password: 'password_hash',
        name: 'E2E User',
      },
    });
    accessToken = jwtService.sign({ username: user.email, sub: user.id });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await app.close();
  });

  beforeEach(async () => {
    await prisma.beneficiaryCategory.deleteMany();
    await prisma.beneficiary.deleteMany();
    await prisma.serviceCategory.deleteMany();
  });

  it('should return 401 when token is missing', async () => {
    await request(app.getHttpServer())
      .get('/dashboard')
      .expect(401);
  });

  it('should return dashboard with empty data', async () => {
    const response = await request(app.getHttpServer())
      .get('/dashboard')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toEqual({
      code: 200,
      ok: true,
      message: 'Dados do dashboard carregados com sucesso',
      data: {
        overview: {
          totalBeneficiaries: 0,
          totalCategories: 0,
          totalLinks: 0,
          beneficiariesWithoutCategory: 0,
          averageCategoriesPerBeneficiary: 0,
        },
        topCategory: null,
        categoriesRanking: [],
        genderDistribution: [],
        recentBeneficiaries: [],
      },
    });
  });

  it('should return dashboard with populated data', async () => {
    const cat = await prisma.serviceCategory.create({ data: { name: 'Assistência Social' } });

    await prisma.beneficiary.create({
      data: {
        fullName: 'João da Silva',
        cpf: '12345678901',
        email: 'joao@example.com',
        birthDate: new Date('1995-05-15'),
        gender: Gender.MALE,
        categories: { create: { serviceCategoryId: cat.id } },
      },
    });

    const response = await request(app.getHttpServer())
      .get('/dashboard')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.ok).toBe(true);
    expect(response.body.data.overview.totalBeneficiaries).toBe(1);
    expect(response.body.data.overview.totalCategories).toBe(1);
    expect(response.body.data.overview.totalLinks).toBe(1);
    expect(response.body.data.topCategory).not.toBeNull();
    expect(response.body.data.topCategory.name).toBe('Assistência Social');
    expect(response.body.data.categoriesRanking).toHaveLength(1);
    expect(response.body.data.genderDistribution).toHaveLength(1);
    expect(response.body.data.genderDistribution[0].gender).toBe(Gender.MALE);
    expect(response.body.data.recentBeneficiaries).toHaveLength(1);
    expect(response.body.data.recentBeneficiaries[0].fullName).toBe('João da Silva');
  });
});
