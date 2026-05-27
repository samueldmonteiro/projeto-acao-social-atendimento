import { CreateBeneficiaryDto, UpdateBeneficiaryDto } from "../http/dtos/beneficiary.dto";
import { PaginationResponse } from "../types/pagination.type";
export declare class BeneficiaryService {
    create(data: CreateBeneficiaryDto): Promise<{
        appointments: ({
            serviceCategory: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                prefix: string;
            };
        } & {
            createdAt: Date;
            serviceCategoryId: string;
            beneficiaryId: string;
            callCode: string;
            priority: boolean;
            canceled: boolean;
            startedAt: Date | null;
            finishedAt: Date | null;
        })[];
    } & {
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        cpf: string;
        phone: string | null;
        birthDate: Date;
        gender: import("../generated/prisma/enums").Gender;
        address: string | null;
    }>;
    update(id: string, data: UpdateBeneficiaryDto): Promise<{
        appointments: {
            serviceCategory: {
                name: string;
                id: string;
                prefix: string;
            };
            serviceCategoryId: string;
            callCode: string;
        }[];
    } & {
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        cpf: string;
        phone: string | null;
        birthDate: Date;
        gender: import("../generated/prisma/enums").Gender;
        address: string | null;
    }>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<{
        appointments: {
            serviceCategory: {
                name: string;
                id: string;
                prefix: string;
            };
            serviceCategoryId: string;
            callCode: string;
        }[];
    } & {
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        cpf: string;
        phone: string | null;
        birthDate: Date;
        gender: import("../generated/prisma/enums").Gender;
        address: string | null;
    }>;
    findMany(filters?: {
        search?: string;
        serviceCategoryId?: string;
        page?: number;
        perPage?: number;
    }): Promise<PaginationResponse<({
        appointments: {
            serviceCategory: {
                name: string;
                id: string;
                prefix: string;
            };
            serviceCategoryId: string;
            callCode: string;
        }[];
    } & {
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        cpf: string;
        phone: string | null;
        birthDate: Date;
        gender: import("../generated/prisma/enums").Gender;
        address: string | null;
    })[]>>;
}
