export interface PaginatedResponse<T> {
  data: T;
  pagination: {
    total_pages: number;
    current_page: number;
    total_docs: number;
  };
}
