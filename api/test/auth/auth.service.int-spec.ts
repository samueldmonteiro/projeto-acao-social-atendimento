import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { prisma } from '@/lib/prisma';
import * as argon2 from 'argon2';
import { AuthService } from '@/services/auth.service';
import { LoginIncorrectError } from '@/errors/login-incorrect.error';
import { AppModule } from '@/app.module';

describe('AuthService Integration', () => {
  let service: AuthService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'test_secret' }), AppModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('deve autenticar um usuário real no banco de dados', async () => {
    const password = 'password123';
    const hash = await argon2.hash(password);

    await prisma.user.create({
      data: { email: 'int@test.com', password: hash, name: 'Test' },
    });

    const result = await service.signin({ email: 'int@test.com', password });
    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('user');
  });

  it('deve lançar LoginIncorrectError quando a senha está errada', async () => {
    const hash = await argon2.hash('correct_password');
    await prisma.user.create({
      data: { email: 'int@test.com', password: hash, name: 'Test' },
    });

    await expect(
      service.signin({ email: 'int@test.com', password: 'wrong_password' }),
    ).rejects.toThrow(LoginIncorrectError);
  });

  it('deve lançar LoginIncorrectError quando o email não existe', async () => {
    await expect(
      service.signin({ email: 'nonexistent@test.com', password: 'any' }),
    ).rejects.toThrow(LoginIncorrectError);
  });
});
