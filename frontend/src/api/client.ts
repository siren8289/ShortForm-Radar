type ApiResponse<T> = {
  code?: number;
  message?: string;
  data?: T;
  success?: boolean;
};

export class ApiError extends Error {
  public status: number;
  public payload: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';
const TOKEN_KEY = 'sfr_token';

const buildHeaders = (customHeaders?: HeadersInit) => {
  const headers: HeadersInit = {
    Accept: 'application/json',
    ...customHeaders,
  };

  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: buildHeaders(options.headers),
  });

  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? ((await response.json()) as ApiResponse<T> | T) : undefined;

  if (!response.ok) {
    const message = (payload as ApiResponse<unknown>)?.message ?? response.statusText;
    throw new ApiError(message, response.status, payload);
  }

  if (isJson && payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as ApiResponse<T>).data as T;
  }

  return (payload as T) ?? (undefined as T);
}

export const apiClient = {
  get: <T>(path: string, options?: RequestInit) => request<T>(path, { method: 'GET', ...options }),
  post: <T>(path: string, body?: unknown, options?: RequestInit) =>
    request<T>(path, {
      method: 'POST',
      body:
        body === undefined || body === null
          ? undefined
          : body instanceof FormData
            ? body
            : JSON.stringify(body),
      headers: (() => {
        const headers: HeadersInit = { ...options?.headers };
        if (body && !(body instanceof FormData)) {
          headers['Content-Type'] = 'application/json';
        }
        return headers;
      })(),
      ...options,
    }),
  delete: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { method: 'DELETE', ...options }),
};

export const authStorage = {
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('sfr_user');
  },
};

