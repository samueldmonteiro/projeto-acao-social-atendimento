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
        birthDate: Date;
        gender: import("../generated/prisma/enums").Gender;
        createdAt: Date;
        updatedAt: Date;
    }>;
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
            serviceCategoryId: string;
        }[];
    } & {
        id: string;
        fullName: string;
        cpf: string;
        email: string | null;
        birthDate: Date;
        gender: import("../generated/prisma/enums").Gender;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
