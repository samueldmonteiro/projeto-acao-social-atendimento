import { Gender } from "../../generated/prisma/enums";
export declare class CreateBeneficiaryDto {
    fullName: string;
    cpf?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    gender: Gender;
    address?: string;
}
export declare class AddBeneficiaryCategoryDto {
    serviceCategoryId: string;
}
export declare class UpdateBeneficiaryDto {
    fullName?: string;
    cpf?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    gender?: Gender;
    address?: string;
}
