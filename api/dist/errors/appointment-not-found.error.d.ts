import { DomainError } from './domain.error';
export declare class AppointmentNotFoundError extends DomainError {
    readonly statusCode = 404;
    constructor(message?: string);
}
