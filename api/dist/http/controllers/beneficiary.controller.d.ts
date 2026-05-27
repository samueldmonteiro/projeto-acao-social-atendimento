import type { Response } from 'express';
import { BaseController, ApiResponse } from './base.controller';
import { BeneficiaryService } from "../../services/beneficiary.service";
import { ExportService } from "../../services/export.service";
import { CreateBeneficiaryDto, UpdateBeneficiaryDto } from '../dtos/beneficiary.dto';
export declare class BeneficiaryController extends BaseController {
    private readonly beneficiaryService;
    private readonly exportService;
    constructor(beneficiaryService: BeneficiaryService, exportService: ExportService);
    export(res: Response): Promise<void>;
    create(body: CreateBeneficiaryDto): Promise<ApiResponse>;
    update(id: string, body: UpdateBeneficiaryDto): Promise<ApiResponse>;
    delete(id: string): Promise<ApiResponse>;
    findById(id: string): Promise<ApiResponse>;
    findMany(search?: string, serviceCategoryId?: string, page?: string, perPage?: string): Promise<ApiResponse>;
}
