export declare abstract class DomainError extends Error {
    abstract readonly statusCode: number;
    constructor(message: string);
}
