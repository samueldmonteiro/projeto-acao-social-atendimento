import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { AppModule } from '@/app.module';
import { AppService } from '@/services/app.service';

describe('AppService Integration', () => {
  let moduleRef: TestingModule;
  let appService: AppService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appService = moduleRef.get(AppService);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('deve resolver o AppService via AppModule', () => {
    expect(appService).toBeDefined();
  });

  it('deve retornar a mensagem padrao', () => {
    expect(appService.getHello()).toBe('Hello World!');
  });
});
