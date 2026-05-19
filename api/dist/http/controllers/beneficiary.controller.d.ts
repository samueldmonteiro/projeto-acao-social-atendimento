import { BaseController, ApiResponse } from './base.controller';
import { BeneficiaryService } from "../../services/beneficiary.service";
import { CreateBeneficiaryDto, UpdateBeneficiaryDto } from '../dtos/beneficiary.dto';
export declare class BeneficiaryController extends BaseController {
    private readonly beneficiaryService;
    constructor(beneficiaryService: BeneficiaryService);
    create(body: CreateBeneficiaryDto): Promise<ApiResponse>;
    update(id: string, body: UpdateBeneficiaryDto): Promise<ApiResponse>;
    delete(id: string): Promise<ApiResponse>;
    findById(id: string): Promise<ApiResponse>;
    findMany(search?: string, serviceCategoryId?: string, page?: string, perPage?: string): Promise<ApiResponse>;
}
