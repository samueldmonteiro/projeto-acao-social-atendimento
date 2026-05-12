import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { prisma } from '@/lib/prisma';
import type { UserLogin } from '@/types/user.type';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService:JwtService){};

  async signin(signin :UserLogin){
    const user = await prisma.user.findFirst({
      where:{ email: signin.email },
    });
  
    if(!user) throw new UnauthorizedException('Invalid credentials');

    const compare = await argon2.verify(user.password,signin.password);

    if(!compare) throw new UnauthorizedException('Invalid password');

    const payload = { username: String(user.email) , sub: String(user.id) };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
