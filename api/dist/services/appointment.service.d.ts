import { PaginationResponse } from "../types/pagination.type";
export declare class AppointmentService {
    findMany(filters?: {
        search?: string;
        categoryId?: string;
        page?: number;
        perPage?: number;
        priority?: boolean;
        canceled?: boolean;
        started?: boolean;
        finished?: boolean;
    }): Promise<PaginationResponse<({
        beneficiary: {
            createdAt: Date;
            id: string;
            fullName: string;
            cpf: string | null;
            email: string | null;
            phone: string | null;
            birthDate: Date | null;
            gender: import("@/generated/prisma/client").Gender;
            address: string | null;
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
        priority: boolean;
        canceled: boolean;
        startedAt: Date | null;
        finishedAt: Date | null;
        createdAt: Date;
    })[]>>;
    create(data: {
        beneficiaryId: string;
        serviceCategoryId: string;
        priority?: boolean;
    }): Promise<{
        beneficiary: {
            createdAt: Date;
            id: string;
            fullName: string;
            cpf: string | null;
            email: string | null;
            phone: string | null;
            birthDate: Date | null;
            gender: import("@/generated/prisma/client").Gender;
            address: string | null;
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
        priority: boolean;
        canceled: boolean;
        startedAt: Date | null;
        finishedAt: Date | null;
        createdAt: Date;
    }>;
    update(beneficiaryId: string, serviceCategoryId: string, data: {
        beneficiaryId?: string;
        serviceCategoryId?: string;
        priority?: boolean;
        canceled?: boolean;
        startedAt?: Date | null;
        finishedAt?: Date | null;
        callCode?: string;
    }): Promise<{
        beneficiary: {
            createdAt: Date;
            id: string;
            fullName: string;
            cpf: string | null;
            email: string | null;
            phone: string | null;
            birthDate: Date | null;
            gender: import("@/generated/prisma/client").Gender;
            address: string | null;
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
        priority: boolean;
        canceled: boolean;
        startedAt: Date | null;
        finishedAt: Date | null;
        createdAt: Date;
    }>;
    delete(beneficiaryId: string, serviceCategoryId: string): Promise<void>;
    private generateCallCode;
}
