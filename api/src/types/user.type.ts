import { Role } from '@/generated/prisma/enums';

export type UserSafe = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}