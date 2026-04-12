export interface ApiResponse<T = any> {
    code: number;
    status: boolean;
    message: string;
    data?: T;
}
export declare class BaseController {
    protected success<T>(data: T, message?: string, code?: number): ApiResponse<T>;
    protected created<T>(data: T, message?: string): ApiResponse<T>;
    protected error(message?: string, code?: number): ApiResponse;
    protected notFound(message?: string): ApiResponse;
}
