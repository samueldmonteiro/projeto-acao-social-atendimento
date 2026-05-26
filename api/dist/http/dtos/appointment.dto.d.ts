export declare class CreateAppointmentDto {
    beneficiaryId: string;
    serviceCategoryId: string;
    priority?: boolean;
}
export declare class UpdateAppointmentDto {
    beneficiaryId?: string;
    serviceCategoryId?: string;
    priority?: boolean;
    canceled?: boolean;
    startedAt?: string;
    finishedAt?: string;
    callCode?: string;
}
