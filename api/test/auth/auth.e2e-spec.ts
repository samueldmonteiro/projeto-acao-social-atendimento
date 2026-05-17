import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import * as argon2 from 'argon2';
import { AppModule } from '@/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
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

  it('/auth/signin (POST) - Fail', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'nonexistent@test.com', password: 'any' })
      .expect(401);
  });
});
