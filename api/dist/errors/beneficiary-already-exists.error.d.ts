import { DomainError } from './domain.error';
export declare class BeneficiaryAlreadyExistsError extends DomainError {
    readonly statusCode = 409;
    constructor(message?: string);
}
