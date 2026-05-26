import { IsEmail, IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Gender } from '@/generated/prisma/enums';

export class CreateBeneficiaryDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
    fullName!: string;

  @IsString({ message: 'O CPF deve ser uma string' })
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
    cpf!: string;

  @IsEmail({}, { message: 'O e-mail deve ser um endereço de e-mail válido' })
  @IsOptional()
    email?: string;

  @IsString({ message: 'O telefone deve ser uma string' })
  @IsOptional()
    phone?: string;

  @IsISO8601({}, { message: 'A data de nascimento deve ser uma data válida no formato ISO 8601' })
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
    birthDate!: string;

  @IsEnum(Gender, { message: 'O gênero deve ser MALE, FEMALE ou OTHER' })
  @IsNotEmpty({ message: 'O gênero é obrigatório' })
    gender!: Gender;

  @IsString({ message: 'O endereço deve ser uma string' })
  @IsOptional()
    address?: string;
}

export class AddBeneficiaryCategoryDto {
  @IsString({ message: 'O ID da categoria de serviço deve ser uma string' })
  @IsNotEmpty({ message: 'O ID da categoria de serviço é obrigatório' })
    serviceCategoryId!: string;
}

export class UpdateBeneficiaryDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
  @IsOptional()
    fullName?: string;

  @IsString({ message: 'O CPF deve ser uma string' })
  @IsOptional()
    cpf?: string;

  @IsEmail({}, { message: 'O e-mail deve ser um endereço de e-mail válido' })
  @IsOptional()
    email?: string;

  @IsString({ message: 'O telefone deve ser uma string' })
  @IsOptional()
    phone?: string;

  @IsISO8601({}, { message: 'A data de nascimento deve ser uma data válida no formato ISO 8601' })
  @IsOptional()
    birthDate?: string;

  @IsEnum(Gender, { message: 'O gênero deve ser MALE, FEMALE ou OTHER' })
  @IsOptional()
    gender?: Gender;

  @IsString({ message: 'O endereço deve ser uma string' })
  @IsOptional()
    address?: string;
}
