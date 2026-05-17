import { DomainError } from './domain.error';
export declare class ServiceCategoryAlreadyExistsError extends DomainError {
    readonly statusCode = 409;
    constructor(message?: string);
}
