/**
 * Generic API response types for Laravel REST API integration.
 * Use these across services for type-safe responses.
 */

/** Laravel-style success wrapper (e.g. return response()->json(['data' => $resource])) */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/** Laravel paginated response (e.g. Resource::collection($model->paginate())) */
export interface ApiPaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
}

/** Common error shape from Laravel (validation, 4xx, 5xx) */
export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}
