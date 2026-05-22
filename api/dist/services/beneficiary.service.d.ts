import { CreateBeneficiaryDto, UpdateBeneficiaryDto } from "../http/dtos/beneficiary.dto";
export declare class BeneficiaryService {
    create(data: CreateBeneficiaryDto): Promise<{
        categories: {
            serviceCategoryId: string;
        }[];
    } & {
        id: string;
        fullName: string;
        cpf: string;
        email: string | null;
        phone: string | null;
        birthDate: Date;
        gender: import("../generated/prisma/enums").Gender;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: UpdateBeneficiaryDto): Promise<{
        categories: {
            serviceCategoryId: string;
        }[];
    } & {
        id: string;
        fullName: string;
        cpf: string;
        email: string | null;
        phone: string | null;
        birthDate: Date;
        gender: import("../generated/prisma/enums").Gender;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addCategory(id: string, serviceCategoryId: string): Promise<{
        serviceCategory: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
    } & {
        createdAt: Date;
        serviceCategoryId: string;
        beneficiaryId: string;
    }>;
    removeCategory(id: string, serviceCategoryId: string): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<{
        categories: {
            serviceCategoryId: string;
        }[];
    } & {
        id: string;
        fullName: string;
        cpf: string;
        email: string | null;
        phone: string | null;
        birthDate: Date;
        gender: import("../generated/prisma/enums").Gender;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findMany(filters?: {
        search?: string;
        serviceCategoryId?: string;
        page?: number;
        perPage?: number;
    }): Promise<({
        categories: {
            serviceCategory: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        }[];
    } & {
        id: string;
        fullName: string;
        cpf: string;
        email: string | null;
        phone: string | null;
        birthDate: Date;
        gender: import("../generated/prisma/enums").Gender;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
