import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateServiceCategoryDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(2, { message: 'O nome da categoria deve ter no mínimo 2 caracteres' })
    name!: string;
}

export class UpdateServiceCategoryDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(2, { message: 'O nome da categoria deve ter no mínimo 2 caracteres' })
  @IsOptional()
    name?: string;
}
