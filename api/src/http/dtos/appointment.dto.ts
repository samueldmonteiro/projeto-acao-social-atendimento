import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsUUID()
    beneficiaryId!: string;

  @IsNotEmpty()
  @IsUUID()
    serviceCategoryId!: string;

  @IsOptional()
  @IsBoolean()
    priority?: boolean;
}

export class UpdateAppointmentDto {
  @IsOptional()
  @IsUUID()
    beneficiaryId?: string;

  @IsOptional()
  @IsUUID()
    serviceCategoryId?: string;

  @IsOptional()
  @IsBoolean()
    priority?: boolean;

  @IsOptional()
  @IsBoolean()
    canceled?: boolean;

  @IsOptional()
  @IsDateString()
    startedAt?: string;

  @IsOptional()
  @IsDateString()
    finishedAt?: string;

  @IsOptional()
  @IsString()
    callCode?: string;
}
