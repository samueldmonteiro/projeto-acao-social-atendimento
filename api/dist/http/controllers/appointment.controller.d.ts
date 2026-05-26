import type { Response } from 'express';
import { BaseController, ApiResponse } from './base.controller';
import { AppointmentService } from "../../services/appointment.service";
import { ExportService } from "../../services/export.service";
import { CreateAppointmentDto, UpdateAppointmentDto } from '../dtos/appointment.dto';
export declare class AppointmentController extends BaseController {
    private readonly appointmentService;
    private readonly exportService;
    constructor(appointmentService: AppointmentService, exportService: ExportService);
    export(res: Response): Promise<void>;
    findMany(search?: string, categoryId?: string, page?: string, perPage?: string, priority?: string, canceled?: string, started?: string, finished?: string): Promise<ApiResponse>;
    create(body: CreateAppointmentDto): Promise<ApiResponse>;
    update(beneficiaryId: string, serviceCategoryId: string, body: UpdateAppointmentDto): Promise<ApiResponse>;
    delete(beneficiaryId: string, serviceCategoryId: string): Promise<ApiResponse>;
}
