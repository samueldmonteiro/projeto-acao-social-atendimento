import type { ApiResponse } from '@/types/api.type';
import type { DashboardSummary } from '@/types/dashboard.type';
import { http } from '@/lib/http';

export const DashboardService = {
  findSummary: async (): Promise<ApiResponse<DashboardSummary>> => {
    const response = await http.get<ApiResponse<DashboardSummary>>('/dashboard');
    return response.data;
  }
};