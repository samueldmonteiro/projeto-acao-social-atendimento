import { JwtService } from '@nestjs/jwt';
import { UserSafe } from "../types/user.type";
export interface SignInResponse {
    accessToken: string;
    user: UserSafe;
}
export interface SigninRequest {
    email: string;
    password: string;
}
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    signin(signin: SigninRequest): Promise<SignInResponse>;
}
