import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { BeneficiaryService, type getAllBeneficiaryFilters } from '@/services/beneficiary.service';
import type { ApiResponse, PaginationMeta } from '@/types/api.type';
import type { Beneficiary, BeneficiaryWithAppointments, CreateBeneficiary, UpdateBeneficiary } from '@/types/beneficiary.type';

export function useBeneficiaries(filters?: getAllBeneficiaryFilters) {
  return useQuery<ApiResponse<PaginationMeta<BeneficiaryWithAppointments[]>>, AxiosError<ApiResponse<unknown>>>({
    queryKey: ['beneficiaries', 'list', filters],
    queryFn: () => BeneficiaryService.getAll(filters),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}

export function useBeneficiary(id: string) {
  return useQuery<ApiResponse<BeneficiaryWithAppointments>, AxiosError<ApiResponse<unknown>>>({
    queryKey: ['beneficiaries', 'detail', id],
    queryFn: () => BeneficiaryService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}

export function useCreateBeneficiary() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Beneficiary>, AxiosError<ApiResponse<unknown>>, CreateBeneficiary>({
    mutationFn: (data) => BeneficiaryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useUpdateBeneficiary() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Beneficiary>,
    AxiosError<ApiResponse<unknown>>,
    { id: string; data: UpdateBeneficiary }
  >({
    mutationFn: ({ id, data }) => BeneficiaryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useDeleteBeneficiary() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<void>, AxiosError<ApiResponse<unknown>>, string>({
    mutationFn: (id) => BeneficiaryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useExportBeneficiariesXLSX() {
  return useMutation<Blob, AxiosError<ApiResponse<unknown>>, void>({
    mutationFn: () => BeneficiaryService.exportXLSX(),
  });
}
