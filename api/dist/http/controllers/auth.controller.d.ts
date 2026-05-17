import { ApiResponse, BaseController } from "./base.controller";
import { AuthService } from "../../services/auth.service";
import { UserLoginDto } from '../dtos/auth.dto';
import { UserPayload } from "../../types/user.type";
export declare class AuthController extends BaseController {
    private readonly auth;
    constructor(auth: AuthService);
    signin(signin: UserLoginDto): Promise<ApiResponse<{
        accessToken: string;
    }>>;
    privateRoute(user: UserPayload): string;
}
