import { CreateServiceCategoryDto, UpdateServiceCategoryDto } from "../http/dtos/service-category.dto";
export declare class ServiceCategoryService {
    create(data: CreateServiceCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        prefix: string;
    }>;
    update(id: string, data: UpdateServiceCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        prefix: string;
    }>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        prefix: string;
    }>;
    findMany(search?: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        prefix: string;
    }[]>;
}
