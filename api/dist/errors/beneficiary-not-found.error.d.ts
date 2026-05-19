import { DomainError } from './domain.error';
export declare class BeneficiaryNotFoundError extends DomainError {
    readonly statusCode = 404;
    constructor(message?: string);
}
