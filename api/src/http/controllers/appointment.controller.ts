import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { BaseController, ApiResponse } from './base.controller';
import { AppointmentService } from '@/services/appointment.service';
import { ExportService } from '@/services/export.service';
import { JwtGuard } from '@/auth/jwt.guard';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../dtos/appointment.dto';

@UseGuards(JwtGuard)
@Controller('appointments')
export class AppointmentController extends BaseController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly exportService: ExportService,
  ) {
    super();
  }

  @Get('export')
  async export(@Res() res: Response): Promise<void> {
    const buffer = await this.exportService.generateAppointmentsExcel();

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="atendimentos.xlsx"');
    res.send(buffer);
  }

  @Get()
  async findMany(
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
    @Query('page') page?: string,
    @Query('perPage') perPage?: string,
    @Query('priority') priority?: string,
    @Query('canceled') canceled?: string,
    @Query('started') started?: string,
    @Query('finished') finished?: string,
  ): Promise<ApiResponse> {
    const data = await this.appointmentService.findMany({
      search,
      categoryId,
      page: page ? Number(page) : 1,
      perPage: perPage ? Number(perPage) : 10,
      priority: priority !== undefined ? priority === 'true' : undefined,
      canceled: canceled !== undefined ? canceled === 'true' : undefined,
      started: started !== undefined ? started === 'true' : undefined,
      finished: finished !== undefined ? finished === 'true' : undefined,
    });

    return this.success(data, 'Atendimentos listados com sucesso');
  }

  @Post()
  async create(
    @Body() body: CreateAppointmentDto,
  ): Promise<ApiResponse> {
    const data = await this.appointmentService.create(body);
    return this.created(data, 'Atendimento criado com sucesso');
  }

  @Patch(':beneficiaryId/:serviceCategoryId')
  async update(
    @Param('beneficiaryId') beneficiaryId: string,
    @Param('serviceCategoryId') serviceCategoryId: string,
    @Body() body: UpdateAppointmentDto,
  ): Promise<ApiResponse> {
    const data = await this.appointmentService.update(beneficiaryId, serviceCategoryId, {
      ...body,
      startedAt: body.startedAt ? new Date(body.startedAt) : undefined,
      finishedAt: body.finishedAt ? new Date(body.finishedAt) : undefined,
    });

    return this.success(data, 'Atendimento atualizado com sucesso');
  }

  @Delete(':beneficiaryId/:serviceCategoryId')
  async delete(
    @Param('beneficiaryId') beneficiaryId: string,
    @Param('serviceCategoryId') serviceCategoryId: string,
  ): Promise<ApiResponse> {
    await this.appointmentService.delete(beneficiaryId, serviceCategoryId);
    return this.success(null, 'Atendimento excluído com sucesso');
  }
}
