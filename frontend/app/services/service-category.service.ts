import { http } from '@/lib/http';
import type { ApiResponse } from '@/types/api.type';
import type { ServiceCategory, CreateServiceCategory, UpdateServiceCategory } from '@/types/service-category.type';

export const ServiceCategoryService = {
  getAll: async (): Promise<ApiResponse<ServiceCategory[]>> => {
    const response = await http.get<ApiResponse<ServiceCategory[]>>('/categories');
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<ServiceCategory>> => {
    const response = await http.get<ApiResponse<ServiceCategory>>(`/categories/${id}`);
    return response.data;
  },

  create: async (data: CreateServiceCategory): Promise<ApiResponse<ServiceCategory>> => {
    const response = await http.post<ApiResponse<ServiceCategory>>('/categories', data);
    return response.data;
  },

  update: async (id: string, data: UpdateServiceCategory): Promise<ApiResponse<ServiceCategory>> => {
    const response = await http.patch<ApiResponse<ServiceCategory>>(`/categories/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await http.delete<ApiResponse<void>>(`/categories/${id}`);
    return response.data;
  },
};