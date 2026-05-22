import { Gender } from "../../generated/prisma/enums";
export declare class CreateBeneficiaryDto {
    fullName: string;
    cpf: string;
    email?: string;
    phone?: string;
    birthDate: string;
    gender: Gender;
    serviceCategoryId: string;
}
export declare class UpdateBeneficiaryDto {
    fullName?: string;
    cpf?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    gender?: Gender;
    serviceCategoryId?: string;
}
