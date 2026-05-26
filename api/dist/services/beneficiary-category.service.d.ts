import { PaginationResponse } from "../types/pagination.type";
export declare class BeneficiaryCategoryService {
    findMany(filters?: {
        search?: string;
        categoryId?: string;
        page?: number;
        perPage?: number;
    }): Promise<PaginationResponse<({
        beneficiary: {
            createdAt: Date;
            id: string;
            fullName: string;
            cpf: string;
            email: string | null;
            phone: string | null;
            birthDate: Date;
            gender: import("@/generated/prisma/client").Gender;
            updatedAt: Date;
        };
        serviceCategory: {
            createdAt: Date;
            name: string;
            id: string;
            updatedAt: Date;
            prefix: string;
        };
    } & {
        beneficiaryId: string;
        serviceCategoryId: string;
        callCode: string;
        createdAt: Date;
    })[]>>;
}
