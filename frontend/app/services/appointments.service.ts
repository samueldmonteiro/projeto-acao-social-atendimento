import { http } from '@/lib/http';
import type { ApiResponse, PaginationMeta } from '@/types/api.type';
import type { Appointment, AppointmentListWithRelations, CreateAppointment, UpdateAppointment } from '@/types/appointments.type';

export type getAllAppointmentsFilters = {
  search?: string;
  categoryId?: string;
  page?: number;
  perPage?: number;
  priority?: string;
  canceled?: string;
  started?: string;
  finished?: string;
}

export const AppointmentsService = {

  getAll: async (filters?: getAllAppointmentsFilters): Promise<ApiResponse<PaginationMeta<AppointmentListWithRelations[]>>> => {
    const response = await http.get<ApiResponse<PaginationMeta<AppointmentListWithRelations[]>>>('/appointments', { params: filters });
    return response.data;
  },

  create: async (data: CreateAppointment): Promise<ApiResponse<Appointment>> => {
    const response = await http.post<ApiResponse<Appointment>>('/appointments', data);
    return response.data;
  },

  update: async (beneficiaryId: string, serviceCategoryId: string, data: UpdateAppointment): Promise<ApiResponse<Appointment>> => {
    const response = await http.patch<ApiResponse<Appointment>>(`/appointments/${beneficiaryId}/${serviceCategoryId}`, data);
    return response.data;
  },

  delete: async (beneficiaryId: string, serviceCategoryId: string): Promise<ApiResponse<void>> => {
    const response = await http.delete<ApiResponse<void>>(`/appointments/${beneficiaryId}/${serviceCategoryId}`);
    return response.data;
  },

  exportXLSX: async (): Promise<Blob> => {
    const response = await http.get<Blob>('/appointments/export', {
      responseType: 'blob',
    });
    return response.data;
  },
};