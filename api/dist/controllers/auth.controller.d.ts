import { ApiResponse, BaseController } from "./base.controller";
import type { UserPayload, UserLogin } from "../types/user.type";
import { AuthService } from "../services/auth.service";
export declare class AuthController extends BaseController {
    private readonly auth;
    constructor(auth: AuthService);
    signin(signin: UserLogin): Promise<ApiResponse<{
        accessToken: string;
    }>>;
    privatePage(req: UserPayload): string;
}
