import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { ServiceCategoryService } from '@/services/service-category.service';
import type { ApiResponse } from '@/types/api.type';
import type { ServiceCategory, CreateServiceCategory, UpdateServiceCategory } from '@/types/service-category.type';

export function useServiceCategories() {
  return useQuery<ApiResponse<ServiceCategory[]>, AxiosError<ApiResponse<unknown>>>({
    queryKey: ['service-categories', 'list'],
    queryFn: () => ServiceCategoryService.getAll(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}

export function useServiceCategory(id: string) {
  return useQuery<ApiResponse<ServiceCategory>, AxiosError<ApiResponse<unknown>>>({
    queryKey: ['service-categories', 'detail', id],
    queryFn: () => ServiceCategoryService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}

export function useCreateServiceCategory() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<ServiceCategory>, AxiosError<ApiResponse<unknown>>, CreateServiceCategory>({
    mutationFn: (data) => ServiceCategoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-categories'] });
    },
  });
}

export function useUpdateServiceCategory() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<ServiceCategory>,
    AxiosError<ApiResponse<unknown>>,
    { id: string; data: UpdateServiceCategory }
  >({
    mutationFn: ({ id, data }) => ServiceCategoryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-categories'] });
    },
  });
}

export function useDeleteServiceCategory() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<void>, AxiosError<ApiResponse<unknown>>, string>({
    mutationFn: (id) => ServiceCategoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-categories'] });
    },
  });
}
