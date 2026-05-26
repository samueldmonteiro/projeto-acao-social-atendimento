import { CreateBeneficiaryDto, UpdateBeneficiaryDto } from "../http/dtos/beneficiary.dto";
import { PaginationResponse } from "../types/pagination.type";
export declare class BeneficiaryService {
    private generateCallCode;
    create(data: CreateBeneficiaryDto): Promise<{
        categories: {
            serviceCategory: {
                name: string;
                id: string;
                prefix: string;
            };
            callCode: string;
            serviceCategoryId: string;
        }[];
    } & {
        id: string;
        fullName: string;
        cpf: string;
        email: string | null;
        phone: string | null;
        birthDate: Date;
        gender: import("@/generated/prisma/client").Gender;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: UpdateBeneficiaryDto): Promise<{
        categories: {
            serviceCategory: {
                name: string;
                id: string;
                prefix: string;
            };
            callCode: string;
            serviceCategoryId: string;
        }[];
    } & {
        id: string;
        fullName: string;
        cpf: string;
        email: string | null;
        phone: string | null;
        birthDate: Date;
        gender: import("@/generated/prisma/client").Gender;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addCategory(id: string, serviceCategoryId: string): Promise<{
        serviceCategory: {
            name: string;
            id: string;
            prefix: string;
        };
    } & {
        createdAt: Date;
        callCode: string;
        serviceCategoryId: string;
        beneficiaryId: string;
    }>;
    removeCategory(id: string, serviceCategoryId: string): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<{
        categories: {
            serviceCategory: {
                name: string;
                id: string;
                prefix: string;
            };
            callCode: string;
            serviceCategoryId: string;
        }[];
    } & {
        id: string;
        fullName: string;
        cpf: string;
        email: string | null;
        phone: string | null;
        birthDate: Date;
        gender: import("@/generated/prisma/client").Gender;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findMany(filters?: {
        search?: string;
        serviceCategoryId?: string;
        page?: number;
        perPage?: number;
    }): Promise<PaginationResponse<({
        categories: {
            serviceCategory: {
                name: string;
                id: string;
                prefix: string;
            };
            callCode: string;
            serviceCategoryId: string;
        }[];
    } & {
        id: string;
        fullName: string;
        cpf: string;
        email: string | null;
        phone: string | null;
        birthDate: Date;
        gender: import("@/generated/prisma/client").Gender;
        createdAt: Date;
        updatedAt: Date;
    })[]>>;
}
