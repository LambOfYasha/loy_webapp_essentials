type ErrorCode = "BAD_REQUEST" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "VALIDATION_ERROR" | "RATE_LIMITED" | "INTERNAL_ERROR" | "SERVICE_UNAVAILABLE" | "TIMEOUT";
declare class AppError extends Error {
    readonly code: ErrorCode;
    readonly statusCode: number;
    readonly details?: Record<string, unknown>;
    readonly timestamp: string;
    constructor(code: ErrorCode, message: string, details?: Record<string, unknown>);
    toJSON(): {
        name: string;
        code: ErrorCode;
        statusCode: number;
        message: string;
        details: Record<string, unknown> | undefined;
        timestamp: string;
    };
    static fromResponse(status: number, body?: unknown): AppError;
    static isAppError(error: unknown): error is AppError;
}

interface ApiClientConfig {
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
interface RequestOptions extends Omit<RequestInit, "body"> {
    params?: Record<string, string | number | boolean | undefined | null>;
    body?: unknown;
    retries?: number;
    timeout?: number;
}
interface ApiResponse<T = unknown> {
    data: T;
    status: number;
    headers: Headers;
    ok: boolean;
}
declare function createApiClient(config: ApiClientConfig): {
    get: <T = unknown>(path: string, options?: RequestOptions) => Promise<ApiResponse<T>>;
    post: <T = unknown>(path: string, body?: unknown, options?: RequestOptions) => Promise<ApiResponse<T>>;
    put: <T = unknown>(path: string, body?: unknown, options?: RequestOptions) => Promise<ApiResponse<T>>;
    patch: <T = unknown>(path: string, body?: unknown, options?: RequestOptions) => Promise<ApiResponse<T>>;
    delete: <T = unknown>(path: string, options?: RequestOptions) => Promise<ApiResponse<T>>;
    request: <T = unknown>(method: string, path: string, options?: RequestOptions) => Promise<ApiResponse<T>>;
};
type ApiClient = ReturnType<typeof createApiClient>;

interface PaginationParams {
    page: number;
    limit: number;
}
interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}
declare function buildPaginationParams(page?: number, limit?: number): PaginationParams;
declare function buildPaginatedResponse<T>(data: T[], total: number, page: number, limit: number): PaginatedResponse<T>;
declare function getOffset(page: number, limit: number): number;

declare function isValidEmail(email: string): boolean;
interface PasswordStrength {
    valid: boolean;
    score: number;
    issues: string[];
}
declare function validatePassword(password: string, options?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumber?: boolean;
    requireSpecial?: boolean;
}): PasswordStrength;
declare function isValidPhone(phone: string): boolean;
declare function isValidUrl(url: string): boolean;
declare function isNonEmpty(value: unknown): boolean;
declare function isValidHexColor(color: string): boolean;

declare function formatPhone(phone: string, countryCode?: string): string;
declare function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions, locale?: string): string;
declare function formatRelativeTime(date: string | Date): string;
declare function formatCurrency(amount: number, currency?: string, locale?: string): string;
declare function formatNumber(num: number, locale?: string): string;
declare function formatCompactNumber(num: number, locale?: string): string;
declare function formatBytes(bytes: number, decimals?: number): string;
declare function slugify(text: string): string;
declare function truncate(text: string, maxLength: number, suffix?: string): string;
declare function capitalize(text: string): string;
declare function titleCase(text: string): string;
declare function initials(name: string, maxLength?: number): string;
declare function safeJsonParse<T = unknown>(json: string, fallback: T): T;
declare function maskEmail(email: string): string;
declare function maskPhone(phone: string): string;

declare function sleep(ms: number): Promise<void>;
declare function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): ((...args: Parameters<T>) => void) & {
    cancel: () => void;
};
declare function throttle<T extends (...args: unknown[]) => unknown>(fn: T, limit: number): (...args: Parameters<T>) => void;
interface RetryOptions {
    attempts?: number;
    delay?: number;
    backoff?: boolean;
    onRetry?: (error: unknown, attempt: number) => void;
}
declare function retry<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T>;
declare function withTimeout<T>(promise: Promise<T>, ms: number, message?: string): Promise<T>;
declare function settled<T>(promises: Promise<T>[]): Promise<{
    fulfilled: T[];
    rejected: unknown[];
}>;

interface User {
    id: string;
    email?: string;
    name?: string;
    roles: string[];
    permissions?: string[];
    [key: string]: unknown;
}
declare function hasRole(user: User | null | undefined, role: string): boolean;
declare function hasAnyRole(user: User | null | undefined, roles: string[]): boolean;
declare function hasAllRoles(user: User | null | undefined, roles: string[]): boolean;
declare function can(user: User | null | undefined, permission: string): boolean;
declare function canAny(user: User | null | undefined, permissions: string[]): boolean;
declare function canAll(user: User | null | undefined, permissions: string[]): boolean;
declare function isAuthenticated(user: User | null | undefined): user is User;
type GuardResult = {
    allowed: true;
} | {
    allowed: false;
    reason: string;
    redirectTo?: string;
};
declare function guard(user: User | null | undefined, options?: {
    requireAuth?: boolean;
    requireRoles?: string[];
    requirePermissions?: string[];
    redirectTo?: string;
}): GuardResult;

declare function sanitizeHtml(input: string): string;
declare function sanitizeObject<T extends Record<string, unknown>>(obj: T): T;
declare function stripTags(input: string): string;
interface RateLimitState {
    count: number;
    resetAt: number;
}
declare function createRateLimiter(maxRequests: number, windowMs: number): {
    check(key: string): {
        allowed: boolean;
        remaining: number;
        resetAt: number;
    };
    reset(key: string): void;
    resetAll(): void;
};
declare function generateCsrfToken(): string;
declare function constantTimeCompare(a: string, b: string): boolean;

type LogLevel = "debug" | "info" | "warn" | "error";
interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: string;
    context?: string;
    data?: Record<string, unknown>;
}
interface LoggerConfig {
    level?: LogLevel;
    context?: string;
    enabled?: boolean;
    onLog?: (entry: LogEntry) => void;
    prefix?: string;
}
declare function createLogger(config?: LoggerConfig): {
    debug: (message: string, data?: Record<string, unknown>) => void;
    info: (message: string, data?: Record<string, unknown>) => void;
    warn: (message: string, data?: Record<string, unknown>) => void;
    error: (message: string, data?: Record<string, unknown>) => void;
    child: (childConfig: Partial<LoggerConfig>) => /*elided*/ any;
};
type Logger = ReturnType<typeof createLogger>;
declare const logger: {
    debug: (message: string, data?: Record<string, unknown>) => void;
    info: (message: string, data?: Record<string, unknown>) => void;
    warn: (message: string, data?: Record<string, unknown>) => void;
    error: (message: string, data?: Record<string, unknown>) => void;
    child: (childConfig: Partial<LoggerConfig>) => /*elided*/ any;
};
interface TrackEvent {
    name: string;
    properties?: Record<string, unknown>;
    timestamp: string;
    userId?: string;
}
type EventHandler = (event: TrackEvent) => void;
declare function createEventTracker(handlers?: EventHandler[]): {
    track(name: string, properties?: Record<string, unknown>, userId?: string): void;
    addHandler(handler: EventHandler): void;
    removeHandler(handler: EventHandler): void;
};
type EventTracker = ReturnType<typeof createEventTracker>;

declare function env(key: string, defaultValue?: string): string;
declare function envOptional(key: string): string | undefined;
declare function envNumber(key: string, defaultValue?: number): number;
declare function envBool(key: string, defaultValue?: boolean): boolean;
declare function envList(key: string, separator?: string): string[];
declare function envUrl(key: string, defaultValue?: string): string;
interface FeatureFlags {
    [key: string]: boolean;
}
declare function createFeatureFlags(flags?: FeatureFlags, envPrefix?: string): {
    isEnabled(flag: string): boolean;
    isDisabled(flag: string): boolean;
    getAll(): FeatureFlags;
    set(flag: string, enabled: boolean): void;
};
type FeatureFlagManager = ReturnType<typeof createFeatureFlags>;
declare function defineConstants<T extends Record<string, unknown>>(constants: T): Readonly<T>;

type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type Nullable<T> = T | null;
type Maybe<T> = T | null | undefined;
type AsyncFunction<T = void> = () => Promise<T>;
interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
}
interface ApiListResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}
interface SelectOption<T = string> {
    label: string;
    value: T;
    disabled?: boolean;
}
interface BreadcrumbItem {
    label: string;
    href?: string;
}
interface NavItem {
    label: string;
    href: string;
    icon?: string;
    badge?: string | number;
    children?: NavItem[];
    roles?: string[];
    permissions?: string[];
}
interface TableColumn<T = unknown> {
    key: string;
    header: string;
    sortable?: boolean;
    render?: (value: unknown, row: T) => unknown;
    className?: string;
    width?: string;
}
type SortDirection = "asc" | "desc";
interface SortState {
    column: string;
    direction: SortDirection;
}
type Status = "idle" | "loading" | "success" | "error";
interface AsyncState<T> {
    data: T | null;
    status: Status;
    error: string | null;
}
type ColorVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "muted";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

export { type ApiClient, type ApiClientConfig, type ApiListResponse, type ApiResponse, AppError, type AsyncFunction, type AsyncState, type BaseEntity, type BreadcrumbItem, type ColorVariant, type ErrorCode, type EventHandler, type EventTracker, type FeatureFlagManager, type FeatureFlags, type GuardResult, type LogEntry, type LogLevel, type Logger, type LoggerConfig, type Maybe, type NavItem, type Nullable, type PaginatedResponse, type PaginationParams, type PasswordStrength, type Prettify, type RateLimitState, type RequestOptions, type RetryOptions, type SelectOption, type Size, type SortDirection, type SortState, type Status, type TableColumn, type TrackEvent, type User, buildPaginatedResponse, buildPaginationParams, can, canAll, canAny, capitalize, constantTimeCompare, createApiClient, createEventTracker, createFeatureFlags, createLogger, createRateLimiter, debounce, defineConstants, env, envBool, envList, envNumber, envOptional, envUrl, formatBytes, formatCompactNumber, formatCurrency, formatDate, formatNumber, formatPhone, formatRelativeTime, generateCsrfToken, getOffset, guard, hasAllRoles, hasAnyRole, hasRole, initials, isAuthenticated, isNonEmpty, isValidEmail, isValidHexColor, isValidPhone, isValidUrl, logger, maskEmail, maskPhone, retry, safeJsonParse, sanitizeHtml, sanitizeObject, settled, sleep, slugify, stripTags, throttle, titleCase, truncate, validatePassword, withTimeout };
