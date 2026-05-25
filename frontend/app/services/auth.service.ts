import type { LoginCredentials, LoginResponse } from '../types/auth.type';
import { http } from '../lib/http';
import type { ApiResponse } from '../types/api.type';

export const login = async (payload: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
  const response = await http.post<ApiResponse<LoginResponse>>('/auth/signin', payload);
  return response.data;
};

