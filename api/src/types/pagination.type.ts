export type PaginationResponse<T> = {
  items: T;
  pagination: {
    total: number;
    page: number;
    perPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }
}