import { CreateBeneficiaryDto, UpdateBeneficiaryDto } from "../http/dtos/beneficiary.dto";
export declare class BeneficiaryService {
    create(data: CreateBeneficiaryDto): Promise<{
        categories: {
            serviceCategoryId: string;
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
    }>;
    update(id: string, data: UpdateBeneficiaryDto): Promise<{
        categories: {
            serviceCategoryId: string;
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
    }>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<{
        categories: {
            serviceCategoryId: string;
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
                name: string;
                createdAt: Date;
                updatedAt: Date;
            };
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
    })[]>;
}
