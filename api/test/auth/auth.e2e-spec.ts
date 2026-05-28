import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import * as argon2 from 'argon2';
import { AppModule } from '@/app.module';
import { HttpExceptionFilter } from '@/http/filters/http-exception.filter';

describe('AuthController (e2e)', () => {
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
    await prisma.user.deleteMany();
  });

  it('/auth/signin (POST) - Successo', async () => {
    const password = 'password';
    const hash = await argon2.hash(password);

    await prisma.user.create({
      data: { email: 'e2e@test.com', password: hash, name: 'E2E User' },
    });

    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'e2e@test.com', password })
      .expect(201)
      .then((response) => {
        expect(response.body.data).toHaveProperty('accessToken');
        expect(response.body.data).toHaveProperty('user');
      });
  });

  it('/auth/signin (POST) - Fail with wrong password', async () => {
    const hash = await argon2.hash('correct_password');
    await prisma.user.create({
      data: { email: 'e2e@test.com', password: hash, name: 'E2E User' },
    });

    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'e2e@test.com', password: 'wrong_password' })
      .expect(401);
  });

  it('/auth/signin (POST) - Fail with nonexistent email', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'nonexistent@test.com', password: '123456' })
      .expect(401);
  });

  it('/auth/signin (POST) - should return 400 when validation fails (empty payload)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({})
      .expect(400);

    expect(response.body.ok).toBe(false);
    expect(response.body.message).toBe('Erro de validação');
    expect(response.body.errors).toContain('O e-mail é obrigatório');
    expect(response.body.errors).toContain('A senha é obrigatória');
  });

  it('/auth/signin (POST) - should return 400 when email is invalid', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'invalid-email', password: '123456' })
      .expect(400);

    expect(response.body.ok).toBe(false);
    expect(response.body.errors).toContain('O e-mail informado é inválido');
  });

  it('/auth/signin (POST) - should return 400 when password is too short', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'test@test.com', password: '123' })
      .expect(400);

    expect(response.body.ok).toBe(false);
    expect(response.body.errors).toContain(
      'A senha deve ter no mínimo 6 caracteres',
    );
  });
});
