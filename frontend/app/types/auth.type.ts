import type { UserSafe } from './user.type';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string
  user: UserSafe
}