import { useQuery } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { findUsers } from '../../services/user.service';
import type { User } from '@/types/user.type';
import type { ApiResponse } from '@/types/api.type';

export function useUsers() {
  return useQuery<ApiResponse<User[]>, AxiosError<ApiResponse<unknown>>>({
    queryKey: ['users', 'list'],
    queryFn: findUsers,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}