import { JwtService } from '@nestjs/jwt';
export interface SignInResponse {
    accessToken: string;
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
