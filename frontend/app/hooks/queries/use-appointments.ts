import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { AppointmentsService, type getAllAppointmentsFilters } from '@/services/appointments.service';
import type { ApiResponse, PaginationMeta } from '@/types/api.type';
import type { Appointment, AppointmentListWithRelations, CreateAppointment, UpdateAppointment } from '@/types/appointments.type';

export function useAppointments(filters?: getAllAppointmentsFilters) {
  return useQuery<ApiResponse<PaginationMeta<AppointmentListWithRelations[]>>, AxiosError<ApiResponse<unknown>>>({
    queryKey: ['appointments', 'list', filters],
    queryFn: () => AppointmentsService.getAll(filters),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Appointment>, AxiosError<ApiResponse<unknown>>, CreateAppointment>({
    mutationFn: (data) => AppointmentsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Appointment>,
    AxiosError<ApiResponse<unknown>>,
    { beneficiaryId: string; serviceCategoryId: string; data: UpdateAppointment }
  >({
    mutationFn: ({ beneficiaryId, serviceCategoryId, data }) =>
      AppointmentsService.update(beneficiaryId, serviceCategoryId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<void>,
    AxiosError<ApiResponse<unknown>>,
    { beneficiaryId: string; serviceCategoryId: string }
  >({
    mutationFn: ({ beneficiaryId, serviceCategoryId }) =>
      AppointmentsService.delete(beneficiaryId, serviceCategoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useExportAppointmentsXLSX() {
  return useMutation<Blob, AxiosError<ApiResponse<unknown>>, void>({
    mutationFn: () => AppointmentsService.exportXLSX(),
  });
}
