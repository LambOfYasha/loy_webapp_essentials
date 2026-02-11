// API Client
export {
  createApiClient,
  buildPaginationParams,
  buildPaginatedResponse,
  getOffset,
} from "./api";
export type {
  ApiClient,
  ApiClientConfig,
  RequestOptions,
  ApiResponse,
  PaginationParams,
  PaginatedResponse,
} from "./api";

// Errors
export { AppError } from "./errors";
export type { ErrorCode } from "./errors";

// Validators
export {
  isValidEmail,
  validatePassword,
  isValidPhone,
  isValidUrl,
  isNonEmpty,
  isValidHexColor,
} from "./validators";
export type { PasswordStrength } from "./validators";

// Formatters
export {
  formatPhone,
  formatDate,
  formatRelativeTime,
  formatCurrency,
  formatNumber,
  formatCompactNumber,
  formatBytes,
  slugify,
  truncate,
  capitalize,
  titleCase,
  initials,
  safeJsonParse,
  maskEmail,
  maskPhone,
} from "./formatters";

// Async Utilities
export { sleep, debounce, throttle, retry, withTimeout, settled } from "./async";
export type { RetryOptions } from "./async";

// Auth Helpers
export {
  hasRole,
  hasAnyRole,
  hasAllRoles,
  can,
  canAny,
  canAll,
  isAuthenticated,
  guard,
} from "./auth";
export type { User, GuardResult } from "./auth";

// Security
export {
  sanitizeHtml,
  sanitizeObject,
  stripTags,
  createRateLimiter,
  generateCsrfToken,
  constantTimeCompare,
} from "./security";
export type { RateLimitState } from "./security";

// Logging
export { createLogger, logger, createEventTracker } from "./logging";
export type {
  Logger,
  LogLevel,
  LogEntry,
  LoggerConfig,
  TrackEvent,
  EventHandler,
  EventTracker,
} from "./logging";

// Config
export {
  env,
  envOptional,
  envNumber,
  envBool,
  envList,
  envUrl,
  createFeatureFlags,
  defineConstants,
} from "./config";
export type { FeatureFlags, FeatureFlagManager } from "./config";

// Types
export type {
  Prettify,
  Nullable,
  Maybe,
  AsyncFunction,
  BaseEntity,
  ApiListResponse,
  SelectOption,
  BreadcrumbItem,
  NavItem,
  TableColumn,
  SortDirection,
  SortState,
  Status,
  AsyncState,
  ColorVariant,
  Size,
} from "./types";
