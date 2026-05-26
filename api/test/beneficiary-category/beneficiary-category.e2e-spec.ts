import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import { AppModule } from '@/app.module';
import { HttpExceptionFilter } from '@/http/filters/http-exception.filter';
import { Gender } from '@/generated/prisma/enums';
import { JwtService } from '@nestjs/jwt';

describe('AppointmentController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();

    const jwtService = moduleFixture.get<JwtService>(JwtService);
    await prisma.user.deleteMany();
    const user = await prisma.user.create({
      data: {
        email: 'e2e-cat@test.com',
        password: 'password_hash',
        name: 'E2E Appointment User',
      },
    });
    accessToken = jwtService.sign({ username: user.email, sub: user.id });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await app.close();
  });

  beforeEach(async () => {
    await prisma.appointment.deleteMany();
    await prisma.beneficiary.deleteMany();
    await prisma.serviceCategory.deleteMany();
  });

  describe('Unauthorized access', () => {
    it('should return 401 when token is missing', async () => {
      await request(app.getHttpServer())
        .get('/appointments')
        .expect(401);
    });
  });

  describe('GET /appointments', () => {
    it('should list all appointments with relationships', async () => {
      const category = await prisma.serviceCategory.create({
        data: { name: 'Odonto E2E', prefix: 'ODO' },
      });

      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'Fulano de Tal',
          cpf: '12345678901',
          birthDate: new Date('1990-01-01'),
          gender: Gender.OTHER,
        },
      });

      await prisma.appointment.create({
        data: {
          beneficiaryId: beneficiary.id,
          serviceCategoryId: category.id,
          callCode: 'ODO-0001',
        },
      });

      const response = await request(app.getHttpServer())
        .get('/appointments')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toEqual({
        code: 200,
        ok: true,
        message: 'Atendimentos listados com sucesso',
        data: {
          items: expect.arrayContaining([
            expect.objectContaining({
              beneficiaryId: beneficiary.id,
              serviceCategoryId: category.id,
              callCode: 'ODO-0001',
              beneficiary: expect.objectContaining({
                fullName: 'Fulano de Tal',
                cpf: '12345678901',
              }),
              serviceCategory: expect.objectContaining({
                name: 'Odonto E2E',
                prefix: 'ODO',
              }),
            }),
          ]),
          pagination: expect.objectContaining({
            total: expect.any(Number),
            page: expect.any(Number),
            perPage: expect.any(Number),
          }),
        },
      });
    });

    it('should filter by query parameters', async () => {
      const category = await prisma.serviceCategory.create({
        data: { name: 'Odonto E2E', prefix: 'ODO' },
      });

      const beneficiary1 = await prisma.beneficiary.create({
        data: {
          fullName: 'Fulano de Tal',
          cpf: '12345678901',
          birthDate: new Date('1990-01-01'),
          gender: Gender.OTHER,
        },
      });

      const beneficiary2 = await prisma.beneficiary.create({
        data: {
          fullName: 'Ciclano de Tal',
          cpf: '98765432100',
          birthDate: new Date('1990-01-01'),
          gender: Gender.OTHER,
        },
      });

      await prisma.appointment.create({
        data: {
          beneficiaryId: beneficiary1.id,
          serviceCategoryId: category.id,
          callCode: 'ODO-0001',
        },
      });

      await prisma.appointment.create({
        data: {
          beneficiaryId: beneficiary2.id,
          serviceCategoryId: category.id,
          callCode: 'ODO-0002',
        },
      });

      const response = await request(app.getHttpServer())
        .get('/appointments')
        .query({ search: 'Ciclano' })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body.data.items).toHaveLength(1);
      expect(response.body.data.items[0].beneficiary.fullName).toBe('Ciclano de Tal');
    });
  });
});
