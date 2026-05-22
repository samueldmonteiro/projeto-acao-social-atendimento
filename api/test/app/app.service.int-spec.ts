import { Test } from '@nestjs/testing';
import { AppService } from '@/services/app.service';
import { AppModule } from '@/app.module';

describe('AppService Integration', () => {
  let service: AppService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should return "Hello World!"', () => {
    const result = service.getHello();
    expect(result).toBe('Hello World!');
  });
});
