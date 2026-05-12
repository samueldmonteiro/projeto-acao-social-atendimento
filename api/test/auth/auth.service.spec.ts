import { prisma } from '@/lib/prisma';
import { AuthService } from '@/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Mock } from 'vitest';
import * as argon2 from 'argon2';
import { UnauthorizedException } from '@nestjs/common';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: { findFirst: vi.fn() },
  },
}));

vi.mock('argon2');

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: { sign: vi.fn().mockReturnValue('token') },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve retornar um accessToken quando as credenciais forem válidas', async () => {
    const mockUser = {
      id: '1',
      email: 'test@test.com',
      password: 'hashed_password',
    };
    (prisma.user.findFirst as Mock).mockResolvedValue(mockUser);
    (argon2.verify as Mock).mockResolvedValue(true);

    const result = await service.signin({
      email: 'test@test.com',
      password: 'password123',
    });

    expect(result).toEqual({ accessToken: 'token' });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(jwtService.sign).toHaveBeenCalled();
  });

  it('deve lançar UnauthorizedException se o usuário não existir', async () => {
    (prisma.user.findFirst as Mock).mockResolvedValue(null);

    await expect(
      service.signin({ email: 'errado@test.com', password: '123' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
