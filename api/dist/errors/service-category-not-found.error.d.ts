import { DomainError } from './domain.error';
export declare class ServiceCategoryNotFoundError extends DomainError {
    readonly statusCode = 404;
    constructor(message?: string);
}
