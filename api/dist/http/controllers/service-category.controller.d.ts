import { BaseController, ApiResponse } from './base.controller';
import { ServiceCategoryService } from "../../services/service-category.service";
import { CreateServiceCategoryDto, UpdateServiceCategoryDto } from '../dtos/service-category.dto';
export declare class ServiceCategoryController extends BaseController {
    private readonly serviceCategoryService;
    constructor(serviceCategoryService: ServiceCategoryService);
    create(body: CreateServiceCategoryDto): Promise<ApiResponse>;
    update(id: string, body: UpdateServiceCategoryDto): Promise<ApiResponse>;
    delete(id: string): Promise<ApiResponse>;
    findById(id: string): Promise<ApiResponse>;
    findMany(search?: string): Promise<ApiResponse>;
}
