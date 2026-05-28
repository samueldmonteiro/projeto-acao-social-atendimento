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
        serviceCategory: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            prefix: string;
        };
        beneficiary: {
            id: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            cpf: string;
            phone: string | null;
            birthDate: Date;
            gender: import("../generated/prisma/client").Gender;
            address: string | null;
        };
    } & {
        createdAt: Date;
        beneficiaryId: string;
        serviceCategoryId: string;
        callCode: string;
        priority: boolean;
        canceled: boolean;
        startedAt: Date | null;
        finishedAt: Date | null;
    })[]>>;
    create(data: {
        beneficiaryId: string;
        serviceCategoryId: string;
        priority?: boolean;
    }): Promise<{
        serviceCategory: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            prefix: string;
        };
        beneficiary: {
            id: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            cpf: string;
            phone: string | null;
            birthDate: Date;
            gender: import("../generated/prisma/client").Gender;
            address: string | null;
        };
    } & {
        createdAt: Date;
        beneficiaryId: string;
        serviceCategoryId: string;
        callCode: string;
        priority: boolean;
        canceled: boolean;
        startedAt: Date | null;
        finishedAt: Date | null;
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
        serviceCategory: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            prefix: string;
        };
        beneficiary: {
            id: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            cpf: string;
            phone: string | null;
            birthDate: Date;
            gender: import("../generated/prisma/client").Gender;
            address: string | null;
        };
    } & {
        createdAt: Date;
        beneficiaryId: string;
        serviceCategoryId: string;
        callCode: string;
        priority: boolean;
        canceled: boolean;
        startedAt: Date | null;
        finishedAt: Date | null;
    }>;
    delete(beneficiaryId: string, serviceCategoryId: string): Promise<void>;
    private generateCallCode;
}
