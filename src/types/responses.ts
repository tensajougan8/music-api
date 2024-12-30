export interface ApiResponse<T = any> {
  status: number;
  data: T | null;
  message: string | null;
  error: string | null;
}
