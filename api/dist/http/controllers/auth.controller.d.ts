import { BaseController } from "./base.controller";
import { AuthService } from "../../services/auth.service";
import { UserLoginDto } from '../dtos/auth.dto';
export declare class AuthController extends BaseController {
    private readonly auth;
    constructor(auth: AuthService);
    signin(signin: UserLoginDto): Promise<import("@/http/controllers/base.controller").ApiResponse<import("@/services/auth.service").SignInResponse>>;
}
