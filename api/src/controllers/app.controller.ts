import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/services/app.service';
import { BaseController } from './base.controller';

@Controller()
export class AppController extends BaseController {
  constructor(private readonly appService: AppService) {
    super();
  }

  @Get()
  getHello() {
    const hello = this.appService.getHello();
    return this.success(hello, 'Bem-vindo');
  }
}
