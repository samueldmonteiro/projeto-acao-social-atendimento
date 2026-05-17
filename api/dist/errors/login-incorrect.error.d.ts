import { DomainError } from './domain.error';
export declare class LoginIncorrectError extends DomainError {
    readonly statusCode = 401;
    constructor(message?: string);
}
