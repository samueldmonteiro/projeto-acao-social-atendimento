import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import { AppModule } from '@/app.module';
import { JwtService } from '@nestjs/jwt';

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
    await prisma.user.deleteMany();
    await app.close();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should return 401 when token is missing', async () => {
    await request(app.getHttpServer()).get('/users').expect(401);
  });

  it('GET /users - should return empty list when no users exist', async () => {
    const jwtService = app.get(JwtService);
    const tempUser = await prisma.user.create({
      data: { email: 'temp@test.com', password: 'hash', name: 'Temp' },
    });
    const token = jwtService.sign({
      username: tempUser.email,
      sub: tempUser.id,
    });

    await prisma.user.deleteMany();

    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual({
      code: 200,
      ok: true,
      message: 'Usuários recuperados com sucesso',
      data: [],
    });
  });

  it('GET /users - should return all users without password', async () => {
    await prisma.user.create({
      data: { email: 'e2e@test.com', password: 'hash', name: 'E2E User' },
    });
    const jwtService = app.get(JwtService);
    const token = jwtService.sign({
      username: 'e2e@test.com',
      sub: 'any-id',
    });

    await prisma.user.createMany({
      data: [
        { email: 'alice@test.com', password: 'hash1', name: 'Alice' },
        { email: 'bob@test.com', password: 'hash2', name: 'Bob' },
      ],
    });

    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.ok).toBe(true);
    expect(response.body.data).toHaveLength(3);
    response.body.data.forEach((u: any) => {
      expect(u.password).toBeUndefined();
    });
  });
});
