import { AppError } from "../errors/AppError";

export interface ApiClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  getAuthToken?: () => string | null | Promise<string | null>;
  onError?: (error: AppError) => void;
  onRequest?: (url: string, init: RequestInit) => void;
  onResponse?: (response: Response) => void;
  retries?: number;
  retryDelay?: number;
  timeout?: number;
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  retries?: number;
  timeout?: number;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
  ok: boolean;
}

function buildQueryString(
  params?: Record<string, string | number | boolean | undefined | null>
): string {
  if (!params) return "";
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null
  );
  if (entries.length === 0) return "";
  const qs = new URLSearchParams(
    entries.map(([k, v]) => [k, String(v)])
  ).toString();
  return `?${qs}`;
}

async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createApiClient(config: ApiClientConfig) {
  const {
    baseUrl,
    headers: defaultHeaders = {},
    getAuthToken,
    onError,
    onRequest,
    onResponse,
    retries: defaultRetries = 0,
    retryDelay = 1000,
    timeout: defaultTimeout = 30000,
  } = config;

  async function request<T = unknown>(
    method: string,
    path: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      params,
      body,
      retries = defaultRetries,
      timeout = defaultTimeout,
      headers: requestHeaders,
      ...restInit
    } = options;

    const url = `${baseUrl.replace(/\/$/, "")}${path}${buildQueryString(params)}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...defaultHeaders,
      ...(requestHeaders as Record<string, string>),
    };

    if (getAuthToken) {
      const token = await getAuthToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const init: RequestInit = {
      method,
      headers,
      ...restInit,
    };

    if (body !== undefined && method !== "GET" && method !== "HEAD") {
      init.body = JSON.stringify(body);
    }

    let lastError: AppError | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        if (attempt > 0) {
          await wait(retryDelay * attempt);
        }

        onRequest?.(url, init);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        let response: Response;
        try {
          response = await fetch(url, {
            ...init,
            signal: controller.signal,
          });
        } finally {
          clearTimeout(timeoutId);
        }

        onResponse?.(response);

        let data: T;
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          data = await response.json();
        } else {
          data = (await response.text()) as unknown as T;
        }

        if (!response.ok) {
          const error = AppError.fromResponse(response.status, data);
          lastError = error;

          const retryable =
            response.status >= 500 || response.status === 429;
          if (retryable && attempt < retries) continue;

          onError?.(error);
          throw error;
        }

        return {
          data,
          status: response.status,
          headers: response.headers,
          ok: true,
        };
      } catch (err) {
        if (AppError.isAppError(err)) {
          throw err;
        }

        const isAbort =
          err instanceof DOMException && err.name === "AbortError";
        const error = new AppError(
          isAbort ? "TIMEOUT" : "SERVICE_UNAVAILABLE",
          isAbort
            ? `Request timed out after ${timeout}ms`
            : `Network error: ${err instanceof Error ? err.message : "Unknown"}`,
          { url, method, attempt }
        );
        lastError = error;

        if (attempt < retries) continue;

        onError?.(error);
        throw error;
      }
    }

    throw lastError ?? new AppError("INTERNAL_ERROR", "Unexpected error");
  }

  return {
    get: <T = unknown>(path: string, options?: RequestOptions) =>
      request<T>("GET", path, options),

    post: <T = unknown>(path: string, body?: unknown, options?: RequestOptions) =>
      request<T>("POST", path, { ...options, body }),

    put: <T = unknown>(path: string, body?: unknown, options?: RequestOptions) =>
      request<T>("PUT", path, { ...options, body }),

    patch: <T = unknown>(path: string, body?: unknown, options?: RequestOptions) =>
      request<T>("PATCH", path, { ...options, body }),

    delete: <T = unknown>(path: string, options?: RequestOptions) =>
      request<T>("DELETE", path, options),

    request,
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
