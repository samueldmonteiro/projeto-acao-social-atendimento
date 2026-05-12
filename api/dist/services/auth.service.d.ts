import { JwtService } from '@nestjs/jwt';
import type { UserLogin } from "../types/user.type";
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    signin(signin: UserLogin): Promise<{
        accessToken: string;
    }>;
}
