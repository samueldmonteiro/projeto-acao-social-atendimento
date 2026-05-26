export type ApiResponse<T> = {
  ok: boolean;
  code: number;
  message: string | null;
  data: T;
  errors?: undefined | string[];
};