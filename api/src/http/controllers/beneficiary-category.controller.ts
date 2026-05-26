import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { BaseController, ApiResponse } from './base.controller';
import { BeneficiaryCategoryService } from '@/services/beneficiary-category.service';
import { JwtGuard } from '@/auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('beneficiary-categories')
export class BeneficiaryCategoryController extends BaseController {
  constructor(
    private readonly beneficiaryCategoryService: BeneficiaryCategoryService,
  ) {
    super();
  }

  @Get()
  async findMany(
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
    @Query('page') page?: string,
    @Query('perPage') perPage?: string,
  ): Promise<ApiResponse> {
    const data = await this.beneficiaryCategoryService.findMany({
      search,
      categoryId,
      page: page ? Number(page) : 1,
      perPage: perPage ? Number(perPage) : 10,
    });

    return this.success(data, 'Vínculos de beneficiários e categorias listados com sucesso');
  }
}
