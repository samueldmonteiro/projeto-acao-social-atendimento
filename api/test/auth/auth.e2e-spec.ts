import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import * as argon2 from 'argon2';
import { AppModule } from '@/app.module';
import { JwtService } from '@nestjs/jwt';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    jwtService = moduleFixture.get<JwtService>(JwtService);
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
      });
  });

  it('/auth/signin (POST) - Fail', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'nonexistent@test.com', password: 'any' })
      .expect(401);
  });

  it('deve retornar 401 Unauthorized se não houver token', () => {
    return request(app.getHttpServer()).get('/auth/private').expect(401);
  });

  it('deve retornar 200 e os dados do usuário se o token for válido', async () => {
    const payload = { sub: 'user_id_123', username: 'test_user' };
    const token = jwtService.sign(payload);

    const response = await request(app.getHttpServer())
      .get('/auth/private')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.text).toContain('userId[user_id_123]');
    expect(response.text).toContain('user[test_user]');
  });
});
