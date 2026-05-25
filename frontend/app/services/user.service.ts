import { http } from '../lib/http';
import { type ApiResponse } from '../types/api.type';
import { type User } from '../types/user.type';

export const findUsers = async (): Promise<ApiResponse<User[]>> => {
  const response = await http.get<ApiResponse<User[]>>('/users');
  return response.data;
};