import { BaseController } from '@/http/controllers/base.controller';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { UserLoginDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly auth: AuthService) {
    super();
  }

  @Post('/signin')
  async signin(@Body() signin: UserLoginDto) {
    const data = await this.auth.signin(signin);
    return this.success(data);
  }
}
