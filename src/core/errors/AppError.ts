export type ErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR"
  | "SERVICE_UNAVAILABLE"
  | "TIMEOUT";

const STATUS_MAP: Record<ErrorCode, number> = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  TIMEOUT: 504,
};

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: Record<string, unknown>;
  public readonly timestamp: string;

  constructor(
    code: ErrorCode,
    message: string,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = STATUS_MAP[code] ?? 500;
    this.details = details;
    this.timestamp = new Date().toISOString();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      statusCode: this.statusCode,
      message: this.message,
      details: this.details,
      timestamp: this.timestamp,
    };
  }

  static fromResponse(status: number, body?: unknown): AppError {
    const codeEntry = Object.entries(STATUS_MAP).find(
      ([, s]) => s === status
    );
    const code = (codeEntry?.[0] as ErrorCode) ?? "INTERNAL_ERROR";
    const message =
      body && typeof body === "object" && "message" in body
        ? String((body as Record<string, unknown>).message)
        : `Request failed with status ${status}`;
    return new AppError(code, message, body as Record<string, unknown>);
  }

  static isAppError(error: unknown): error is AppError {
    return error instanceof AppError;
  }
}
