import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import { AppModule } from '@/app.module';
import { HttpExceptionFilter } from '@/http/filters/http-exception.filter';
import { Gender } from '@/generated/prisma/enums';
import { JwtService } from '@nestjs/jwt';

describe('BeneficiaryController (e2e)', () => {
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
    await prisma.appointment.deleteMany();
    await prisma.beneficiary.deleteMany();
    await prisma.serviceCategory.deleteMany();
  });

  describe('Unauthorized access', () => {
    it('should return 401 when token is missing', async () => {
      await request(app.getHttpServer())
        .get('/beneficiaries')
        .expect(401);
    });
  });

  describe('POST /beneficiaries', () => {
    it('should create a beneficiary successfully', async () => {
      const payload = {
        fullName: 'João da Silva',
        cpf: '12345678901',
        email: 'joao@example.com',
        birthDate: '1995-05-15T00:00:00.000Z',
        gender: Gender.MALE,
        address: 'Rua das Flores, 123',
      };

      const response = await request(app.getHttpServer())
        .post('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(payload)
        .expect(201);

      expect(response.body).toEqual({
        code: 201,
        ok: true,
        message: 'Beneficiário criado com sucesso',
        data: expect.objectContaining({
          id: expect.any(String),
          fullName: 'João da Silva',
          cpf: '12345678901',
          email: 'joao@example.com',
          address: 'Rua das Flores, 123',
          gender: Gender.MALE,
          appointments: [],
        }),
      });

      const dbBeneficiary = await prisma.beneficiary.findUnique({
        where: { id: response.body.data.id },
      });
      expect(dbBeneficiary).not.toBeNull();
      expect(dbBeneficiary?.fullName).toBe('João da Silva');
    });

    it('should return 400 when validation fails (empty payload)', async () => {
      const response = await request(app.getHttpServer())
        .post('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({})
        .expect(400);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Erro de validação');
      expect(response.body.errors).toContain('O nome é obrigatório');
      expect(response.body.errors).toContain('O CPF é obrigatório');
      expect(response.body.errors).toContain('A data de nascimento é obrigatória');
      expect(response.body.errors).toContain('O gênero deve ser MALE, FEMALE ou OTHER');
    });

    it('should return 400 when name is too short', async () => {
      const response = await request(app.getHttpServer())
        .post('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          fullName: 'J',
          cpf: '12345678901',
          birthDate: '1995-05-15T00:00:00.000Z',
          gender: Gender.MALE,
        })
        .expect(400);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Erro de validação');
      expect(response.body.errors).toContain('O nome deve ter no mínimo 2 caracteres');
    });

    it('should return 400 when email format is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          fullName: 'João da Silva',
          cpf: '12345678901',
          email: 'invalid-email',
          birthDate: '1995-05-15T00:00:00.000Z',
          gender: Gender.MALE,
        })
        .expect(400);

      expect(response.body.ok).toBe(false);
      expect(response.body.errors).toContain('O e-mail deve ser um endereço de e-mail válido');
    });

    it('should return 400 when gender is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          fullName: 'João da Silva',
          cpf: '12345678901',
          birthDate: '1995-05-15T00:00:00.000Z',
          gender: 'INVALID_GENDER',
        })
        .expect(400);

      expect(response.body.ok).toBe(false);
      expect(response.body.errors).toContain('O gênero deve ser MALE, FEMALE ou OTHER');
    });

    it('should return 409 when the beneficiary CPF already exists', async () => {
      await prisma.beneficiary.create({
        data: {
          fullName: 'Maria da Silva',
          cpf: '12345678901',
          birthDate: new Date('1990-01-01'),
          gender: Gender.FEMALE,
        },
      });

      const response = await request(app.getHttpServer())
        .post('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          fullName: 'João da Silva',
          cpf: '12345678901',
          birthDate: '1995-05-15T00:00:00.000Z',
          gender: Gender.MALE,
        })
        .expect(409);

      expect(response.body).toEqual(
        expect.objectContaining({
          code: 409,
          ok: false,
          message: 'Beneficiário com este CPF já cadastrado',
        }),
      );
    });

    it('should return 409 when the beneficiary email already exists', async () => {
      await prisma.beneficiary.create({
        data: {
          fullName: 'Maria da Silva',
          cpf: '98765432109',
          email: 'duplicate@example.com',
          birthDate: new Date('1990-01-01'),
          gender: Gender.FEMALE,
        },
      });

      const response = await request(app.getHttpServer())
        .post('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          fullName: 'João da Silva',
          cpf: '12345678901',
          email: 'duplicate@example.com',
          birthDate: '1995-05-15T00:00:00.000Z',
          gender: Gender.MALE,
        })
        .expect(409);

      expect(response.body).toEqual(
        expect.objectContaining({
          code: 409,
          ok: false,
          message: 'Beneficiário com este e-mail já cadastrado',
        }),
      );
    });
  });

  describe('GET /beneficiaries', () => {
    it('should paginate beneficiaries with page and perPage', async () => {
      const items = Array.from({ length: 12 }, (_, i) => ({
        fullName: `Beneficiário ${String(i + 1).padStart(2, '0')}`,
        cpf: String(i + 100).padStart(11, '0'),
        birthDate: new Date(),
        gender: i % 2 === 0 ? Gender.MALE : Gender.FEMALE,
      }));

      await prisma.beneficiary.createMany({ data: items });

      const page1 = await request(app.getHttpServer())
        .get('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .query({ page: 1, perPage: 5 })
        .expect(200);

      expect(page1.body.data.items).toHaveLength(5);
      expect(page1.body.data.items[0].fullName).toBe('Beneficiário 01');
      expect(page1.body.data.items[4].fullName).toBe('Beneficiário 05');

      const page2 = await request(app.getHttpServer())
        .get('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .query({ page: 2, perPage: 5 })
        .expect(200);

      expect(page2.body.data.items).toHaveLength(5);
      expect(page2.body.data.items[0].fullName).toBe('Beneficiário 06');

      const page3 = await request(app.getHttpServer())
        .get('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .query({ page: 3, perPage: 5 })
        .expect(200);

      expect(page3.body.data.items).toHaveLength(2);
      expect(page3.body.data.items[0].fullName).toBe('Beneficiário 11');

      const emptyPage = await request(app.getHttpServer())
        .get('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .query({ page: 4, perPage: 5 })
        .expect(200);

      expect(emptyPage.body.data.items).toHaveLength(0);
    });

    it('should retrieve all beneficiaries ordered alphabetically by name', async () => {
      await prisma.beneficiary.createMany({
        data: [
          { fullName: 'Carlos Silva', cpf: '1', birthDate: new Date(), gender: Gender.MALE },
          { fullName: 'Ana Silva', cpf: '2', birthDate: new Date(), gender: Gender.FEMALE },
          { fullName: 'Bruna Silva', cpf: '3', birthDate: new Date(), gender: Gender.FEMALE },
        ],
      });

      const response = await request(app.getHttpServer())
        .get('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body.ok).toBe(true);
      expect(response.body.message).toBe('Beneficiários listados com sucesso');
      expect(response.body.data.items).toHaveLength(3);
      expect(response.body.data.items[0].fullName).toBe('Ana Silva');
      expect(response.body.data.items[1].fullName).toBe('Bruna Silva');
      expect(response.body.data.items[2].fullName).toBe('Carlos Silva');
    });

    it('should filter beneficiaries when a search query is passed', async () => {
      await prisma.beneficiary.createMany({
        data: [
          { fullName: 'Carlos Alberto', cpf: '12345', email: 'carlos@example.com', birthDate: new Date(), gender: Gender.MALE },
          { fullName: 'Ana Maria', cpf: '67890', email: 'ana@example.com', birthDate: new Date(), gender: Gender.FEMALE },
        ],
      });

      // Search by name
      const searchByName = await request(app.getHttpServer())
        .get('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .query({ search: 'carlos' })
        .expect(200);

      expect(searchByName.body.data.items).toHaveLength(1);
      expect(searchByName.body.data.items[0].fullName).toBe('Carlos Alberto');

      // Search by CPF
      const searchByCpf = await request(app.getHttpServer())
        .get('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .query({ search: '67890' })
        .expect(200);

      expect(searchByCpf.body.data.items).toHaveLength(1);
      expect(searchByCpf.body.data.items[0].fullName).toBe('Ana Maria');

      // Search by Email
      const searchByEmail = await request(app.getHttpServer())
        .get('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .query({ search: 'carlos@example' })
        .expect(200);

      expect(searchByEmail.body.data.items).toHaveLength(1);
      expect(searchByEmail.body.data.items[0].fullName).toBe('Carlos Alberto');
    });

    it('should filter beneficiaries by serviceCategoryId', async () => {
      const cat = await prisma.serviceCategory.create({
        data: { name: 'Saúde', prefix: 'S' },
      });

      await prisma.beneficiary.create({
        data: {
          fullName: 'Carlos Alberto',
          cpf: '123',
          birthDate: new Date(),
          gender: Gender.MALE,
          appointments: {
            create: { serviceCategoryId: cat.id, callCode: 'TST-0001' },
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

      const response = await request(app.getHttpServer())
        .get('/beneficiaries')
        .set('Authorization', `Bearer ${accessToken}`)
        .query({ serviceCategoryId: cat.id })
        .expect(200);

      expect(response.body.data.items).toHaveLength(1);
      expect(response.body.data.items[0].fullName).toBe('Carlos Alberto');
    });
  });

  describe('GET /beneficiaries/:id', () => {
    it('should return a beneficiary by its ID', async () => {
      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15T00:00:00.000Z'),
          gender: Gender.MALE,
        },
      });

      const response = await request(app.getHttpServer())
        .get(`/beneficiaries/${beneficiary.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toEqual({
        code: 200,
        ok: true,
        message: 'Beneficiário encontrado com sucesso',
        data: expect.objectContaining({
          id: beneficiary.id,
          fullName: 'João Silva',
          cpf: '12345678901',
          gender: Gender.MALE,
        }),
      });
    });

    it('should return 404 if the beneficiary does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/beneficiaries/non-existent-id')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Beneficiário não encontrado');
    });
  });

  describe('PATCH /beneficiaries/:id', () => {
    it('should update a beneficiary successfully', async () => {
      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          email: 'joao@example.com',
          birthDate: new Date('1995-05-15T00:00:00.000Z'),
          gender: Gender.MALE,
        },
      });

      const response = await request(app.getHttpServer())
        .patch(`/beneficiaries/${beneficiary.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ fullName: 'João de Silva' })
        .expect(200);

      expect(response.body).toEqual({
        code: 200,
        ok: true,
        message: 'Beneficiário atualizado com sucesso',
        data: expect.objectContaining({
          id: beneficiary.id,
          fullName: 'João de Silva',
          cpf: '12345678901',
          email: 'joao@example.com',
        }),
      });

      const dbBeneficiary = await prisma.beneficiary.findUnique({
        where: { id: beneficiary.id },
      });
      expect(dbBeneficiary?.fullName).toBe('João de Silva');
    });

    it('should return 400 when validation fails', async () => {
      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15T00:00:00.000Z'),
          gender: Gender.MALE,
        },
      });

      const response = await request(app.getHttpServer())
        .patch(`/beneficiaries/${beneficiary.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ email: 'invalid-email' })
        .expect(400);

      expect(response.body.ok).toBe(false);
      expect(response.body.errors).toContain('O e-mail deve ser um endereço de e-mail válido');
    });

    it('should return 404 if the beneficiary to update is not found', async () => {
      const response = await request(app.getHttpServer())
        .patch('/beneficiaries/non-existent-id')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ fullName: 'Teste' })
        .expect(404);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Beneficiário não encontrado');
    });

    it('should return 409 if updated CPF is already taken by another beneficiary', async () => {
      const b1 = await prisma.beneficiary.create({
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

      const response = await request(app.getHttpServer())
        .patch(`/beneficiaries/${b1.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ cpf: '98765432109' })
        .expect(409);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Beneficiário com este CPF já cadastrado');
    });

    it('should return 409 if updated Email is already taken by another beneficiary', async () => {
      const b1 = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          email: 'joao@example.com',
          birthDate: new Date('1995-05-15T00:00:00.000Z'),
          gender: Gender.MALE,
        },
      });

      await prisma.beneficiary.create({
        data: {
          fullName: 'Maria Silva',
          cpf: '98765432109',
          email: 'maria@example.com',
          birthDate: new Date('1990-01-01'),
          gender: Gender.FEMALE,
        },
      });

      const response = await request(app.getHttpServer())
        .patch(`/beneficiaries/${b1.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ email: 'maria@example.com' })
        .expect(409);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Beneficiário com este e-mail já cadastrado');
    });
  });

  describe('POST /beneficiaries/:id/categories', () => {
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
        data: { name: 'Saúde', prefix: 'S' },
      });

      const response = await request(app.getHttpServer())
        .post(`/beneficiaries/${beneficiary.id}/categories`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ serviceCategoryId: category.id })
        .expect(201);

      expect(response.body).toEqual({
        code: 201,
        ok: true,
        message: 'Categoria vinculada ao beneficiário com sucesso',
      });
    });

    it('should return 404 if beneficiary does not exist', async () => {
      const category = await prisma.serviceCategory.create({
        data: { name: 'Saúde', prefix: 'S' },
      });

      const response = await request(app.getHttpServer())
        .post('/beneficiaries/non-existent-id/categories')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ serviceCategoryId: category.id })
        .expect(404);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Beneficiário não encontrado');
    });

    it('should return 404 if category does not exist', async () => {
      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15'),
          gender: Gender.MALE,
        },
      });

      const response = await request(app.getHttpServer())
        .post(`/beneficiaries/${beneficiary.id}/categories`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ serviceCategoryId: 'non-existent-category' })
        .expect(404);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Categoria de serviço não encontrada');
    });

    it('should return 409 if the link already exists', async () => {
      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15'),
          gender: Gender.MALE,
        },
      });
      const category = await prisma.serviceCategory.create({
        data: { name: 'Saúde', prefix: 'S' },
      });

      await prisma.appointment.create({
        data: {
          beneficiaryId: beneficiary.id,
          serviceCategoryId: category.id,
          callCode: 'TST-0003',
        },
      });

      const response = await request(app.getHttpServer())
        .post(`/beneficiaries/${beneficiary.id}/categories`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ serviceCategoryId: category.id })
        .expect(409);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Beneficiário já possui esta categoria vinculada');
    });

    it('should return 400 when serviceCategoryId is missing', async () => {
      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15'),
          gender: Gender.MALE,
        },
      });

      const response = await request(app.getHttpServer())
        .post(`/beneficiaries/${beneficiary.id}/categories`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({})
        .expect(400);

      expect(response.body.ok).toBe(false);
      expect(response.body.errors).toContain('O ID da categoria de serviço é obrigatório');
    });
  });

  describe('DELETE /beneficiaries/:id/categories/:categoryId', () => {
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
        data: { name: 'Saúde', prefix: 'S' },
      });

      await prisma.appointment.create({
        data: {
          beneficiaryId: beneficiary.id,
          serviceCategoryId: category.id,
          callCode: 'TST-0004',
        },
      });

      const response = await request(app.getHttpServer())
        .delete(`/beneficiaries/${beneficiary.id}/categories/${category.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toEqual({
        code: 200,
        ok: true,
        message: 'Categoria desvinculada do beneficiário com sucesso',
        data: null,
      });

      const dbRelation = await prisma.appointment.findUnique({
        where: {
          beneficiaryId_serviceCategoryId: {
            beneficiaryId: beneficiary.id,
            serviceCategoryId: category.id,
          },
        },
      });
      expect(dbRelation).toBeNull();
    });

    it('should return 404 if beneficiary does not exist', async () => {
      const response = await request(app.getHttpServer())
        .delete('/beneficiaries/non-existent-id/categories/any-category')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Beneficiário não encontrado');
    });

    it('should return 404 if the link does not exist', async () => {
      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15'),
          gender: Gender.MALE,
        },
      });

      const response = await request(app.getHttpServer())
        .delete(`/beneficiaries/${beneficiary.id}/categories/non-existent-link`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Vínculo entre beneficiário e categoria não encontrado');
    });
  });

  describe('DELETE /beneficiaries/:id', () => {
    it('should delete a beneficiary successfully', async () => {
      const beneficiary = await prisma.beneficiary.create({
        data: {
          fullName: 'João Silva',
          cpf: '12345678901',
          birthDate: new Date('1995-05-15T00:00:00.000Z'),
          gender: Gender.MALE,
        },
      });

      const response = await request(app.getHttpServer())
        .delete(`/beneficiaries/${beneficiary.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toEqual({
        code: 200,
        ok: true,
        message: 'Beneficiário excluído com sucesso',
        data: null,
      });

      const dbBeneficiary = await prisma.beneficiary.findUnique({
        where: { id: beneficiary.id },
      });
      expect(dbBeneficiary).toBeNull();
    });

    it('should return 404 if the beneficiary to delete is not found', async () => {
      const response = await request(app.getHttpServer())
        .delete('/beneficiaries/non-existent-id')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Beneficiário não encontrado');
    });
  });
});
