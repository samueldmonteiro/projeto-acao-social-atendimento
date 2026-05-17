import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import { AppModule } from '@/app.module';
import { HttpExceptionFilter } from '@/http/filters/http-exception.filter';

describe('ServiceCategoryController (e2e)', () => {
  let app: INestApplication;

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
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prisma.beneficiaryCategory.deleteMany();
    await prisma.serviceCategory.deleteMany();
  });

  describe('POST /categories', () => {
    it('should create a service category successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/categories')
        .send({ name: 'Esportes' })
        .expect(201);

      expect(response.body).toEqual({
        code: 201,
        ok: true,
        message: 'Categoria de serviço criada com sucesso',
        data: expect.objectContaining({
          id: expect.any(String),
          name: 'Esportes',
        }),
      });

      const dbCategory = await prisma.serviceCategory.findUnique({
        where: { name: 'Esportes' },
      });
      expect(dbCategory).not.toBeNull();
    });

    it('should return 400 when validation fails (empty name)', async () => {
      const response = await request(app.getHttpServer())
        .post('/categories')
        .send({ name: '' })
        .expect(400);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Erro de validação');
      expect(response.body.errors).toContain('O nome é obrigatório');
    });

    it('should return 400 when name is too short', async () => {
      const response = await request(app.getHttpServer())
        .post('/categories')
        .send({ name: 'A' })
        .expect(400);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Erro de validação');
      expect(response.body.errors).toContain('O nome da categoria deve ter no mínimo 2 caracteres');
    });

    it('should return 409 when the category name already exists', async () => {
      await prisma.serviceCategory.create({
        data: { name: 'Esportes' },
      });

      const response = await request(app.getHttpServer())
        .post('/categories')
        .send({ name: 'Esportes' })
        .expect(409);

      expect(response.body).toEqual(
        expect.objectContaining({
          code: 409,
          ok: false,
          message: 'Categoria de serviço com este nome já existe',
        }),
      );
    });
  });

  describe('GET /categories', () => {
    it('should retrieve all service categories ordered alphabetically by name', async () => {
      await prisma.serviceCategory.createMany({
        data: [{ name: 'Lazer' }, { name: 'Alimentação' }, { name: 'Saúde' }],
      });

      const response = await request(app.getHttpServer())
        .get('/categories')
        .expect(200);

      expect(response.body.ok).toBe(true);
      expect(response.body.data).toHaveLength(3);
      expect(response.body.data[0].name).toBe('Alimentação');
      expect(response.body.data[1].name).toBe('Lazer');
      expect(response.body.data[2].name).toBe('Saúde');
    });

    it('should return filtered categories when a search query is passed', async () => {
      await prisma.serviceCategory.createMany({
        data: [{ name: 'Cultura e Lazer' }, { name: 'Saúde Alimentar' }, { name: 'Saúde' }],
      });

      const response = await request(app.getHttpServer())
        .get('/categories')
        .query({ search: 'saúde' })
        .expect(200);

      expect(response.body.ok).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0].name).toBe('Saúde');
      expect(response.body.data[1].name).toBe('Saúde Alimentar');
    });
  });

  describe('GET /categories/:id', () => {
    it('should return a category by its ID', async () => {
      const category = await prisma.serviceCategory.create({
        data: { name: 'Habitação' },
      });

      const response = await request(app.getHttpServer())
        .get(`/categories/${category.id}`)
        .expect(200);

      expect(response.body).toEqual({
        code: 200,
        ok: true,
        message: 'Categoria de serviço encontrada com sucesso',
        data: {
          id: category.id,
          name: 'Habitação',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      });
    });

    it('should return 404 if the category does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/categories/non-existent-id')
        .expect(404);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Categoria de serviço não encontrada');
    });
  });

  describe('PUT /categories/:id', () => {
    it('should update a service category successfully', async () => {
      const category = await prisma.serviceCategory.create({
        data: { name: 'Educação' },
      });

      const response = await request(app.getHttpServer())
        .put(`/categories/${category.id}`)
        .send({ name: 'Educação e Cultura' })
        .expect(200);

      expect(response.body).toEqual({
        code: 200,
        ok: true,
        message: 'Categoria de serviço atualizada com sucesso',
        data: expect.objectContaining({
          id: category.id,
          name: 'Educação e Cultura',
        }),
      });

      const dbCategory = await prisma.serviceCategory.findUnique({
        where: { id: category.id },
      });
      expect(dbCategory?.name).toBe('Educação e Cultura');
    });

    it('should return 409 if updating to a name that already exists', async () => {
      await prisma.serviceCategory.create({
        data: { name: 'Educação' },
      });
      const cat2 = await prisma.serviceCategory.create({
        data: { name: 'Saúde' },
      });

      const response = await request(app.getHttpServer())
        .put(`/categories/${cat2.id}`)
        .send({ name: 'Educação' })
        .expect(409);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Categoria de serviço com este nome já existe');
    });

    it('should return 404 if the category to update is not found', async () => {
      const response = await request(app.getHttpServer())
        .put('/categories/non-existent-id')
        .send({ name: 'Inovação' })
        .expect(404);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Categoria de serviço não encontrada');
    });
  });

  describe('DELETE /categories/:id', () => {
    it('should delete a category successfully', async () => {
      const category = await prisma.serviceCategory.create({
        data: { name: 'Tecnologia' },
      });

      const response = await request(app.getHttpServer())
        .delete(`/categories/${category.id}`)
        .expect(200);

      expect(response.body).toEqual({
        code: 200,
        ok: true,
        message: 'Categoria de serviço excluída com sucesso',
        data: null,
      });

      const dbCategory = await prisma.serviceCategory.findUnique({
        where: { id: category.id },
      });
      expect(dbCategory).toBeNull();
    });

    it('should return 404 if the category to delete is not found', async () => {
      const response = await request(app.getHttpServer())
        .delete('/categories/non-existent-id')
        .expect(404);

      expect(response.body.ok).toBe(false);
      expect(response.body.message).toBe('Categoria de serviço não encontrada');
    });
  });
});
