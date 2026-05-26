import { DomainError } from './domain.error';
export declare class AppointmentAlreadyExistsError extends DomainError {
    readonly statusCode = 409;
    constructor(message?: string);
}
