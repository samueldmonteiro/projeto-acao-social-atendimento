import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import { AppModule } from '@/app.module';

describe('UserController (e2e)', () => {
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

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('GET /users - should return empty list when no users exist', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(response.body).toEqual({
      code: 200,
      ok: true,
      message: 'Usuários recuperados com sucesso',
      data: [],
    });
  });

  it('GET /users - should return all users without password', async () => {
    await prisma.user.createMany({
      data: [
        { email: 'alice@test.com', password: 'hash1', name: 'Alice' },
        { email: 'bob@test.com', password: 'hash2', name: 'Bob' },
      ],
    });

    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(response.body.ok).toBe(true);
    expect(response.body.data).toHaveLength(2);
    expect(response.body.data[0].name).toBeDefined();
    expect(response.body.data[0].email).toBeDefined();
    expect(response.body.data[0].password).toBeUndefined();
  });
});
