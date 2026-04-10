import { api } from '../config/api';
import { type ApiResponse } from '../types/api.type';
import { type User } from '../types/user.type';

export const findUsers = async (): Promise<ApiResponse<User[]>> => {
  const response = await api.get('/users');
  return response.data;
};