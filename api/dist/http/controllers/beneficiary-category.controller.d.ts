import { BaseController, ApiResponse } from './base.controller';
import { BeneficiaryCategoryService } from "../../services/beneficiary-category.service";
export declare class BeneficiaryCategoryController extends BaseController {
    private readonly beneficiaryCategoryService;
    constructor(beneficiaryCategoryService: BeneficiaryCategoryService);
    findMany(search?: string, categoryId?: string, page?: string, perPage?: string): Promise<ApiResponse>;
}
