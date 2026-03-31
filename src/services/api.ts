import axios from "axios";

/**
 * Axios instance for Laravel (or any REST) API.
 * Base URL from .env: VITE_API_BASE_URL (e.g. http://localhost:8000/api)
 * If unset or empty, uses relative "/api" (same origin — e.g. Express in dev).
 */
const raw = typeof import.meta.env !== "undefined" ? String(import.meta.env.VITE_API_BASE_URL ?? "").trim() : "";
const baseURL = raw && raw !== "undefined" ? raw.replace(/\/$/, "") : "/api";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Optional: request interceptor (e.g. attach Laravel auth token)
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("auth_token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

// Optional: response interceptor for 401/419 (Laravel auth)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // if (err.response?.status === 401 || err.response?.status === 419) {
    //   // redirect to login or refresh token
    // }
    return Promise.reject(err);
  }
);

export default api;
