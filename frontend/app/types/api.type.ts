export type ApiResponse<T> = {
  status: boolean;
  code: number;
  message: string | null;
  data: T
};