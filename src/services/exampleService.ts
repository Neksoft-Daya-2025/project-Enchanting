import { api } from "./api";
import type { ApiResponse, ApiPaginatedResponse } from "@/types";
import type { ExampleItem, ExamplePostPayload } from "@/types";

/**
 * Example API service for Laravel backend.
 * Replace endpoint paths and types with your actual API resources.
 */

/** Fetch all items (e.g. GET /api/items) */
export async function getAllData(): Promise<ExampleItem[]> {
  const { data } = await api.get<ApiResponse<ExampleItem[]>>("/items");
  return data.data;
}

/** Fetch a single item by id (e.g. GET /api/items/:id) */
export async function getById(id: number): Promise<ExampleItem> {
  const { data } = await api.get<ApiResponse<ExampleItem>>(`/items/${id}`);
  return data.data;
}

/** Create a new item (e.g. POST /api/items) */
export async function postData(
  payload: ExamplePostPayload
): Promise<ExampleItem> {
  const { data } = await api.post<ApiResponse<ExampleItem>>("/items", payload);
  return data.data;
}

/** Optional: paginated list (e.g. GET /api/items?page=1) */
export async function getPaginatedData(
  page = 1
): Promise<ApiPaginatedResponse<ExampleItem>> {
  const { data } = await api.get<ApiPaginatedResponse<ExampleItem>>(
    "/items",
    { params: { page } }
  );
  return data;
}
