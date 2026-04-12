import { prisma } from '@/lib/prisma';
import { UserSafe } from '@/types/user.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

  async findAll(): Promise<UserSafe[]>{
    return prisma.user.findMany({});
  }
}