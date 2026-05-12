import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@/services/auth.service';
import { UserLogin } from '@/types/user.type';
import { AuthController } from '@/controllers/auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    signin: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe('signin', () => {
    it('deve retornar o objeto de sucesso do BaseController', async () => {
      const loginDto: UserLogin = { email: 'test@test.com', password: '123' };
      const mockResponse = { accessToken: 'token' };

      // eslint-disable-next-line @typescript-eslint/unbound-method
      vi.mocked(service.signin).mockResolvedValue(mockResponse);

      const result = await controller.signin(loginDto);

      expect(result).toEqual({
        code: 200,
        status: true,
        message: 'Operação realizada com sucesso',
        data: mockResponse,
      });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.signin).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('privatePage', () => {
    it('deve retornar a string formatada com os dados do decorator @GetUser', () => {
      const mockUser = { sub: '123', username: 'john_doe' };
      const result = controller.privatePage(mockUser);

      expect(result).toBe('Private page userId[123] user[john_doe]');
    });
  });
});
