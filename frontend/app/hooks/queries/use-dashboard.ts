import { useQuery } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { DashboardService } from '@/services/dashboard.service';
import type { ApiResponse } from '@/types/api.type';
import type { DashboardSummary } from '@/types/dashboard.type';

export function useDashboardSummary() {
  return useQuery<ApiResponse<DashboardSummary>, AxiosError<ApiResponse<unknown>>>({
    queryKey: ['dashboard', 'summary'],
    queryFn: () => DashboardService.findSummary(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
