import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { prisma } from '@/lib/prisma';
import * as argon2 from 'argon2';
import { LoginIncorrectError } from '@/errors/login-incorrect.error';

export interface SignInResponse {
  accessToken: string;
}
export interface SigninRequest {
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  async signin(signin: SigninRequest): Promise<SignInResponse> {
    const user = await prisma.user.findFirst({
      where: { email: signin.email },
    });

    if (!user) throw new LoginIncorrectError();

    const compare = await argon2.verify(user.password, signin.password);

    if (!compare) throw new LoginIncorrectError();

    const payload = { username: String(user.email), sub: String(user.id) };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
