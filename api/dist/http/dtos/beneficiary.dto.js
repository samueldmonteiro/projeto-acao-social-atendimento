"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBeneficiaryDto = exports.AddBeneficiaryCategoryDto = exports.CreateBeneficiaryDto = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../../generated/prisma/enums");
class CreateBeneficiaryDto {
    fullName;
    cpf;
    email;
    phone;
    birthDate;
    gender;
    serviceCategoryId;
}
exports.CreateBeneficiaryDto = CreateBeneficiaryDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome é obrigatório' }),
    (0, class_validator_1.MinLength)(2, { message: 'O nome deve ter no mínimo 2 caracteres' }),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O CPF deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O CPF é obrigatório' }),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'O e-mail deve ser um endereço de e-mail válido' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O telefone deve ser uma string' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)({}, { message: 'A data de nascimento deve ser uma data válida no formato ISO 8601' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A data de nascimento é obrigatória' }),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "birthDate", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.Gender, { message: 'O gênero deve ser MALE, FEMALE ou OTHER' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O gênero é obrigatório' }),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O ID da categoria de serviço deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O ID da categoria de serviço é obrigatório' }),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "serviceCategoryId", void 0);
class AddBeneficiaryCategoryDto {
    serviceCategoryId;
}
exports.AddBeneficiaryCategoryDto = AddBeneficiaryCategoryDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'O ID da categoria de serviço deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O ID da categoria de serviço é obrigatório' }),
    __metadata("design:type", String)
], AddBeneficiaryCategoryDto.prototype, "serviceCategoryId", void 0);
class UpdateBeneficiaryDto {
    fullName;
    cpf;
    email;
    phone;
    birthDate;
    gender;
    serviceCategoryId;
}
exports.UpdateBeneficiaryDto = UpdateBeneficiaryDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string' }),
    (0, class_validator_1.MinLength)(2, { message: 'O nome deve ter no mínimo 2 caracteres' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBeneficiaryDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O CPF deve ser uma string' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBeneficiaryDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'O e-mail deve ser um endereço de e-mail válido' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBeneficiaryDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O telefone deve ser uma string' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBeneficiaryDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)({}, { message: 'A data de nascimento deve ser uma data válida no formato ISO 8601' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBeneficiaryDto.prototype, "birthDate", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.Gender, { message: 'O gênero deve ser MALE, FEMALE ou OTHER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBeneficiaryDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O ID da categoria de serviço deve ser uma string' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBeneficiaryDto.prototype, "serviceCategoryId", void 0);
//# sourceMappingURL=beneficiary.dto.js.map