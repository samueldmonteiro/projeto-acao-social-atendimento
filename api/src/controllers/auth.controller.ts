import { ApiResponse, BaseController } from '@/controllers/base.controller';
import type { UserPayload, UserLogin } from '@/types/user.type';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { JwtGuard } from '@/auth/jwt.guard';
import { GetUser } from '@/decorators/auth.decorator';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly auth: AuthService) {
    super();
  }

  @Post('/signin')
  async signin(
    @Body() signin: UserLogin,
  ): Promise<ApiResponse<{ accessToken: string }>> {
    const data = await this.auth.signin(signin);
    return this.success(data);
  }

  @Get('/private')
  @UseGuards(JwtGuard)
  privatePage(@GetUser() req: UserPayload) {
    return `Private page userId[${req.sub}] user[${req.username}]`;
  }
}
