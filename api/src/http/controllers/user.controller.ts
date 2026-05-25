import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '@/services/user.service';
import { UserSafe } from '@/types/user.type';
import { BaseController, ApiResponse } from './base.controller';
import { JwtGuard } from '@/auth/jwt.guard';


@UseGuards(JwtGuard)
@Controller('users')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get()
  async index(): Promise<ApiResponse<UserSafe[]>> {
    const data = await this.userService.findAll();
    return this.success(data, 'Usuários recuperados com sucesso');
  }
}
