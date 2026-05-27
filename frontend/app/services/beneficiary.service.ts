import { http } from '@/lib/http';
import type { ApiResponse, PaginationMeta } from '@/types/api.type';
import type { Beneficiary, BeneficiaryWithAppointments, CreateBeneficiary, UpdateBeneficiary } from '@/types/beneficiary.type';

export type getAllBeneficiaryFilters = {
  search?: string;
  serviceCategoryId?: string;
  page?: number;
  perPage?: number;
}
export const BeneficiaryService = {
  getAll: async (filters?: getAllBeneficiaryFilters): Promise<ApiResponse<PaginationMeta<BeneficiaryWithAppointments[]>>> => {
    const response = await http.get<ApiResponse<PaginationMeta<BeneficiaryWithAppointments[]>>>('/beneficiaries', { params: filters });
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<BeneficiaryWithAppointments>> => {
    const response = await http.get<ApiResponse<BeneficiaryWithAppointments>>(`/beneficiaries/${id}`);
    return response.data;
  },

  create: async (data: CreateBeneficiary): Promise<ApiResponse<Beneficiary>> => {
    const response = await http.post<ApiResponse<Beneficiary>>('/beneficiaries', data);
    return response.data;
  },

  update: async (id: string, data: UpdateBeneficiary): Promise<ApiResponse<Beneficiary>> => {
    const response = await http.patch<ApiResponse<Beneficiary>>(`/beneficiaries/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await http.delete<ApiResponse<void>>(`/beneficiaries/${id}`);
    return response.data;
  },

  exportXLSX: async (): Promise<Blob> => {
    const response = await http.get<Blob>('/beneficiaries/export', {
      responseType: 'blob',
    });
    return response.data;
  },
};