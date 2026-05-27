export type ApiResponse<T> = {
  ok: boolean;
  code: number;
  message: string | null;
  data: T;
  errors?: undefined | string[];
};

export type PaginationMeta<T> = {
  items: T
  pagination: {
    total: number;
    page: number;
    perPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }
}