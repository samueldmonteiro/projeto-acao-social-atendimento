import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { BaseController, ApiResponse } from './base.controller';
import { BeneficiaryService } from '@/services/beneficiary.service';
import { ExportService } from '@/services/export.service';
import {
  CreateBeneficiaryDto,
  UpdateBeneficiaryDto,
} from '../dtos/beneficiary.dto';
import { JwtGuard } from '@/auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('beneficiaries')
export class BeneficiaryController extends BaseController {
  constructor(
    private readonly beneficiaryService: BeneficiaryService,
    private readonly exportService: ExportService,
  ) {
    super();
  }

  @Get('export')
  async export(@Res() res: Response): Promise<void> {
    const buffer = await this.exportService.generateBeneficiariesExcel();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="beneficiarios.xlsx"',
    );
    res.send(buffer);
  }

  @Post()
  async create(@Body() body: CreateBeneficiaryDto): Promise<ApiResponse> {
    const data = await this.beneficiaryService.create(body);
    return this.created(data, 'Beneficiário criado com sucesso');
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateBeneficiaryDto,
  ): Promise<ApiResponse> {
    const data = await this.beneficiaryService.update(id, body);
    return this.success(data, 'Beneficiário atualizado com sucesso');
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ApiResponse> {
    await this.beneficiaryService.delete(id);
    return this.success(null, 'Beneficiário excluído com sucesso');
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ApiResponse> {
    const data = await this.beneficiaryService.findById(id);
    return this.success(data, 'Beneficiário encontrado com sucesso');
  }

  @Get()
  async findMany(
    @Query('search') search?: string,
    @Query('serviceCategoryId') serviceCategoryId?: string,
    @Query('page') page?: string,
    @Query('perPage') perPage?: string,
  ): Promise<ApiResponse> {
    const data = await this.beneficiaryService.findMany({
      search,
      serviceCategoryId,
      page: page ? Number(page) : 1,
      perPage: perPage ? Number(perPage) : 10,
    });

    return this.success(data, 'Beneficiários listados com sucesso');
  }
}
