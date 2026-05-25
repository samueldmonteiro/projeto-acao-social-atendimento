import { Controller, Get, UseGuards } from '@nestjs/common';
import { BaseController, ApiResponse } from './base.controller';
import { DashboardService } from '@/services/dashboard.service';
import { JwtGuard } from '@/auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('dashboard')
export class DashboardController extends BaseController {
  constructor(private readonly dashboardService: DashboardService) {
    super();
  }

  @Get()
  async getSummary(): Promise<ApiResponse> {
    const data = await this.dashboardService.getSummary();
    return this.success(data, 'Dados do dashboard carregados com sucesso');
  }
}
