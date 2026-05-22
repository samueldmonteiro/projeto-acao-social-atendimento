import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import { AppModule } from '@/app.module';
import { JwtService } from '@nestjs/jwt';
import { Gender } from '@/generated/prisma/enums';

describe('ExportController (e2e)', () => {
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
      .get('/beneficiaries/export')
      .expect(401);
  });

  it('should export an Excel file with beneficiaries', async () => {
    const category = await prisma.serviceCategory.create({
      data: { name: 'Assistência Social' },
    });

    await prisma.beneficiary.create({
      data: {
        fullName: 'João da Silva',
        cpf: '12345678901',
        email: 'joao@example.com',
        phone: '11999999999',
        birthDate: new Date('1995-05-15'),
        gender: Gender.MALE,
        categories: {
          create: { serviceCategoryId: category.id },
        },
      },
    });

    const response = await request(app.getHttpServer())
      .get('/beneficiaries/export')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.headers['content-type']).toBe(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    expect(response.headers['content-disposition']).toBe(
      'attachment; filename="beneficiarios.xlsx"',
    );
    expect(response.body).toBeTruthy();
    expect(Buffer.isBuffer(response.body) || typeof response.body === 'object').toBe(true);
  });
});
