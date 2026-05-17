import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BaseController, ApiResponse } from './base.controller';
import { ServiceCategoryService } from '@/services/service-category.service';
import { CreateServiceCategoryDto, UpdateServiceCategoryDto } from '../dtos/service-category.dto';

@Controller('categories')
export class ServiceCategoryController extends BaseController {
  constructor(private readonly serviceCategoryService: ServiceCategoryService) {
    super();
  }

  @Post()
  async create(
    @Body() body: CreateServiceCategoryDto,
  ): Promise<ApiResponse> {
    const data = await this.serviceCategoryService.create(body);
    return this.created(data, 'Categoria de serviço criada com sucesso');
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateServiceCategoryDto,
  ): Promise<ApiResponse> {
    const data = await this.serviceCategoryService.update(id, body);
    return this.success(data, 'Categoria de serviço atualizada com sucesso');
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<ApiResponse> {
    await this.serviceCategoryService.delete(id);
    return this.success(null, 'Categoria de serviço excluída com sucesso');
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
  ): Promise<ApiResponse> {
    const data = await this.serviceCategoryService.findById(id);
    return this.success(data, 'Categoria de serviço encontrada com sucesso');
  }

  @Get()
  async findMany(
    @Query('search') search?: string,
  ): Promise<ApiResponse> {
    const data = await this.serviceCategoryService.findMany(search);
    return this.success(data, 'Categorias de serviço listadas com sucesso');
  }
}
