import { ApiResponse, BaseController } from '@/http/controllers/base.controller';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { UserLoginDto } from '../dtos/auth.dto';
import { JwtGuard } from '@/auth/jwt.guard';
import { GetUser } from '@/http/decorators/auth.decorator';
import { UserPayload } from '@/types/user.type';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly auth: AuthService) {
    super();
  }

  @Post('/signin')
  async signin(
    @Body() signin: UserLoginDto,
  ): Promise<ApiResponse<{ accessToken: string }>> {
    const data = await this.auth.signin(signin);
    return this.success(data);
  }

  @Get('/private')
  @UseGuards(JwtGuard)
  privateRoute(@GetUser() user: UserPayload): string {
    return `userId[${user.sub}] user[${user.username}]`;
  }
}
