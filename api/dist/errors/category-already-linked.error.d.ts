import { DomainError } from './domain.error';
export declare class CategoryAlreadyLinkedError extends DomainError {
    readonly statusCode = 409;
    constructor(message?: string);
}
