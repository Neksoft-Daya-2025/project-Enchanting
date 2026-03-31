/**
 * Example TypeScript interfaces for API resources.
 * Replace or extend these to match your Laravel API resources.
 */

/** Example resource returned by getAllData() / getById() */
export interface ExampleItem {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

/** Example payload for postData() */
export interface ExamplePostPayload {
  name: string;
  description?: string;
}
