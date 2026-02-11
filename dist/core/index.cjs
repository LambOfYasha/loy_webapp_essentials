"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core/index.ts
var core_exports = {};
__export(core_exports, {
  AppError: () => AppError,
  buildPaginatedResponse: () => buildPaginatedResponse,
  buildPaginationParams: () => buildPaginationParams,
  can: () => can,
  canAll: () => canAll,
  canAny: () => canAny,
  capitalize: () => capitalize,
  constantTimeCompare: () => constantTimeCompare,
  createApiClient: () => createApiClient,
  createEventTracker: () => createEventTracker,
  createFeatureFlags: () => createFeatureFlags,
  createLogger: () => createLogger,
  createRateLimiter: () => createRateLimiter,
  debounce: () => debounce,
  defineConstants: () => defineConstants,
  env: () => env,
  envBool: () => envBool,
  envList: () => envList,
  envNumber: () => envNumber,
  envOptional: () => envOptional,
  envUrl: () => envUrl,
  formatBytes: () => formatBytes,
  formatCompactNumber: () => formatCompactNumber,
  formatCurrency: () => formatCurrency,
  formatDate: () => formatDate,
  formatNumber: () => formatNumber,
  formatPhone: () => formatPhone,
  formatRelativeTime: () => formatRelativeTime,
  generateCsrfToken: () => generateCsrfToken,
  getOffset: () => getOffset,
  guard: () => guard,
  hasAllRoles: () => hasAllRoles,
  hasAnyRole: () => hasAnyRole,
  hasRole: () => hasRole,
  initials: () => initials,
  isAuthenticated: () => isAuthenticated,
  isNonEmpty: () => isNonEmpty,
  isValidEmail: () => isValidEmail,
  isValidHexColor: () => isValidHexColor,
  isValidPhone: () => isValidPhone,
  isValidUrl: () => isValidUrl,
  logger: () => logger,
  maskEmail: () => maskEmail,
  maskPhone: () => maskPhone,
  retry: () => retry,
  safeJsonParse: () => safeJsonParse,
  sanitizeHtml: () => sanitizeHtml,
  sanitizeObject: () => sanitizeObject,
  settled: () => settled,
  sleep: () => sleep,
  slugify: () => slugify,
  stripTags: () => stripTags,
  throttle: () => throttle,
  titleCase: () => titleCase,
  truncate: () => truncate,
  validatePassword: () => validatePassword,
  withTimeout: () => withTimeout
});
module.exports = __toCommonJS(core_exports);

// src/core/errors/AppError.ts
var STATUS_MAP = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  TIMEOUT: 504
};
var AppError = class _AppError extends Error {
  constructor(code, message, details) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = STATUS_MAP[code] ?? 500;
    this.details = details;
    this.timestamp = (/* @__PURE__ */ new Date()).toISOString();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, _AppError);
    }
  }
  toJSON() {
    return {
      name: this.name,
      code: this.code,
      statusCode: this.statusCode,
      message: this.message,
      details: this.details,
      timestamp: this.timestamp
    };
  }
  static fromResponse(status, body) {
    const codeEntry = Object.entries(STATUS_MAP).find(
      ([, s]) => s === status
    );
    const code = codeEntry?.[0] ?? "INTERNAL_ERROR";
    const message = body && typeof body === "object" && "message" in body ? String(body.message) : `Request failed with status ${status}`;
    return new _AppError(code, message, body);
  }
  static isAppError(error) {
    return error instanceof _AppError;
  }
};

// src/core/api/client.ts
function buildQueryString(params) {
  if (!params) return "";
  const entries = Object.entries(params).filter(
    ([, v]) => v !== void 0 && v !== null
  );
  if (entries.length === 0) return "";
  const qs = new URLSearchParams(
    entries.map(([k, v]) => [k, String(v)])
  ).toString();
  return `?${qs}`;
}
async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function createApiClient(config) {
  const {
    baseUrl,
    headers: defaultHeaders = {},
    getAuthToken,
    onError,
    onRequest,
    onResponse,
    retries: defaultRetries = 0,
    retryDelay = 1e3,
    timeout: defaultTimeout = 3e4
  } = config;
  async function request(method, path, options = {}) {
    const {
      params,
      body,
      retries = defaultRetries,
      timeout = defaultTimeout,
      headers: requestHeaders,
      ...restInit
    } = options;
    const url = `${baseUrl.replace(/\/$/, "")}${path}${buildQueryString(params)}`;
    const headers = {
      "Content-Type": "application/json",
      ...defaultHeaders,
      ...requestHeaders
    };
    if (getAuthToken) {
      const token = await getAuthToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    const init = {
      method,
      headers,
      ...restInit
    };
    if (body !== void 0 && method !== "GET" && method !== "HEAD") {
      init.body = JSON.stringify(body);
    }
    let lastError = null;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        if (attempt > 0) {
          await wait(retryDelay * attempt);
        }
        onRequest?.(url, init);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        let response;
        try {
          response = await fetch(url, {
            ...init,
            signal: controller.signal
          });
        } finally {
          clearTimeout(timeoutId);
        }
        onResponse?.(response);
        let data;
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }
        if (!response.ok) {
          const error = AppError.fromResponse(response.status, data);
          lastError = error;
          const retryable = response.status >= 500 || response.status === 429;
          if (retryable && attempt < retries) continue;
          onError?.(error);
          throw error;
        }
        return {
          data,
          status: response.status,
          headers: response.headers,
          ok: true
        };
      } catch (err) {
        if (AppError.isAppError(err)) {
          throw err;
        }
        const isAbort = err instanceof DOMException && err.name === "AbortError";
        const error = new AppError(
          isAbort ? "TIMEOUT" : "SERVICE_UNAVAILABLE",
          isAbort ? `Request timed out after ${timeout}ms` : `Network error: ${err instanceof Error ? err.message : "Unknown"}`,
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
    get: (path, options) => request("GET", path, options),
    post: (path, body, options) => request("POST", path, { ...options, body }),
    put: (path, body, options) => request("PUT", path, { ...options, body }),
    patch: (path, body, options) => request("PATCH", path, { ...options, body }),
    delete: (path, options) => request("DELETE", path, options),
    request
  };
}

// src/core/api/pagination.ts
function buildPaginationParams(page = 1, limit = 20) {
  return {
    page: Math.max(1, Math.floor(page)),
    limit: Math.min(100, Math.max(1, Math.floor(limit)))
  };
}
function buildPaginatedResponse(data, total, page, limit) {
  const totalPages = Math.ceil(total / limit);
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  };
}
function getOffset(page, limit) {
  return (Math.max(1, page) - 1) * limit;
}

// src/core/validators/index.ts
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}
function validatePassword(password, options = {}) {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecial = true
  } = options;
  const issues = [];
  let score = 0;
  if (password.length >= minLength) score++;
  else issues.push(`Must be at least ${minLength} characters`);
  if (!requireUppercase || /[A-Z]/.test(password)) score++;
  else issues.push("Must contain an uppercase letter");
  if (!requireLowercase || /[a-z]/.test(password)) score++;
  else issues.push("Must contain a lowercase letter");
  if (!requireNumber || /\d/.test(password)) score++;
  else issues.push("Must contain a number");
  if (!requireSpecial || /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))
    score++;
  else issues.push("Must contain a special character");
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  return { valid: issues.length === 0, score, issues };
}
function isValidPhone(phone) {
  const cleaned = phone.replace(/[\s\-().+]/g, "");
  return /^\d{10,15}$/.test(cleaned);
}
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
function isNonEmpty(value) {
  if (value === null || value === void 0) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}
function isValidHexColor(color) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(color);
}

// src/core/formatters/index.ts
function formatPhone(phone, countryCode = "US") {
  const cleaned = phone.replace(/\D/g, "");
  if (countryCode === "US" && cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (countryCode === "US" && cleaned.length === 11 && cleaned.startsWith("1")) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}
function formatDate(date, options = {
  year: "numeric",
  month: "short",
  day: "numeric"
}, locale = "en-US") {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "Invalid date";
  return new Intl.DateTimeFormat(locale, options).format(d);
}
function formatRelativeTime(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1e3);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}w ago`;
  if (diffDay < 365) return `${Math.floor(diffDay / 30)}mo ago`;
  return `${Math.floor(diffDay / 365)}y ago`;
}
function formatCurrency(amount, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  }).format(amount);
}
function formatNumber(num, locale = "en-US") {
  return new Intl.NumberFormat(locale).format(num);
}
function formatCompactNumber(num, locale = "en-US") {
  return new Intl.NumberFormat(locale, { notation: "compact" }).format(num);
}
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}
function slugify(text) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function truncate(text, maxLength, suffix = "...") {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length).trimEnd() + suffix;
}
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
function titleCase(text) {
  return text.toLowerCase().split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
function initials(name, maxLength = 2) {
  return name.split(/\s+/).map((w) => w.charAt(0).toUpperCase()).slice(0, maxLength).join("");
}
function safeJsonParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}
function maskEmail(email) {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const masked = local.length <= 2 ? "*".repeat(local.length) : local[0] + "*".repeat(local.length - 2) + local[local.length - 1];
  return `${masked}@${domain}`;
}
function maskPhone(phone) {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 4) return phone;
  return "*".repeat(cleaned.length - 4) + cleaned.slice(-4);
}

// src/core/async/index.ts
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function debounce(fn, delay) {
  let timeoutId = null;
  const debounced = (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  return debounced;
}
function throttle(fn, limit) {
  let inThrottle = false;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
async function retry(fn, options = {}) {
  const { attempts = 3, delay = 1e3, backoff = true, onRetry } = options;
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < attempts) {
        onRetry?.(err, attempt);
        const waitTime = backoff ? delay * attempt : delay;
        await sleep(waitTime);
      }
    }
  }
  throw lastError;
}
function withTimeout(promise, ms, message = "Operation timed out") {
  return Promise.race([
    promise,
    new Promise(
      (_, reject) => setTimeout(() => reject(new Error(message)), ms)
    )
  ]);
}
async function settled(promises) {
  const results = await Promise.allSettled(promises);
  const fulfilled = [];
  const rejected = [];
  for (const result of results) {
    if (result.status === "fulfilled") fulfilled.push(result.value);
    else rejected.push(result.reason);
  }
  return { fulfilled, rejected };
}

// src/core/auth/index.ts
function hasRole(user, role) {
  if (!user) return false;
  return user.roles.includes(role);
}
function hasAnyRole(user, roles) {
  if (!user) return false;
  return roles.some((role) => user.roles.includes(role));
}
function hasAllRoles(user, roles) {
  if (!user) return false;
  return roles.every((role) => user.roles.includes(role));
}
function can(user, permission) {
  if (!user) return false;
  if (user.permissions) {
    return user.permissions.includes(permission);
  }
  return user.roles.includes(permission);
}
function canAny(user, permissions) {
  if (!user) return false;
  return permissions.some((p) => can(user, p));
}
function canAll(user, permissions) {
  if (!user) return false;
  return permissions.every((p) => can(user, p));
}
function isAuthenticated(user) {
  return user !== null && user !== void 0 && !!user.id;
}
function guard(user, options = {}) {
  const {
    requireAuth = true,
    requireRoles,
    requirePermissions,
    redirectTo
  } = options;
  if (requireAuth && !isAuthenticated(user)) {
    return {
      allowed: false,
      reason: "Authentication required",
      redirectTo: redirectTo ?? "/login"
    };
  }
  if (requireRoles && !hasAnyRole(user, requireRoles)) {
    return {
      allowed: false,
      reason: `Required roles: ${requireRoles.join(", ")}`,
      redirectTo: redirectTo ?? "/unauthorized"
    };
  }
  if (requirePermissions && !canAll(user, requirePermissions)) {
    return {
      allowed: false,
      reason: `Required permissions: ${requirePermissions.join(", ")}`,
      redirectTo: redirectTo ?? "/unauthorized"
    };
  }
  return { allowed: true };
}

// src/core/security/index.ts
var HTML_ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;"
};
function sanitizeHtml(input) {
  return input.replace(/[&<>"'/]/g, (char) => HTML_ENTITIES[char] || char);
}
function sanitizeObject(obj) {
  const result = { ...obj };
  for (const key of Object.keys(result)) {
    const value = result[key];
    if (typeof value === "string") {
      result[key] = sanitizeHtml(value);
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      result[key] = sanitizeObject(value);
    }
  }
  return result;
}
function stripTags(input) {
  return input.replace(/<[^>]*>/g, "");
}
function createRateLimiter(maxRequests, windowMs) {
  const store = /* @__PURE__ */ new Map();
  function cleanup() {
    const now = Date.now();
    for (const [key, state] of store) {
      if (state.resetAt <= now) store.delete(key);
    }
  }
  return {
    check(key) {
      cleanup();
      const now = Date.now();
      const state = store.get(key);
      if (!state || state.resetAt <= now) {
        store.set(key, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
      }
      if (state.count >= maxRequests) {
        return { allowed: false, remaining: 0, resetAt: state.resetAt };
      }
      state.count++;
      return {
        allowed: true,
        remaining: maxRequests - state.count,
        resetAt: state.resetAt
      };
    },
    reset(key) {
      store.delete(key);
    },
    resetAll() {
      store.clear();
    }
  };
}
function generateCsrfToken() {
  const array = new Uint8Array(32);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}
function constantTimeCompare(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// src/core/logging/index.ts
var LEVEL_PRIORITY = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};
var LEVEL_COLORS = {
  debug: "\x1B[36m",
  info: "\x1B[32m",
  warn: "\x1B[33m",
  error: "\x1B[31m"
};
var RESET = "\x1B[0m";
function createLogger(config = {}) {
  const {
    level: minLevel = "info",
    context,
    enabled = true,
    onLog,
    prefix = "[LOY]"
  } = config;
  function shouldLog(level) {
    return enabled && LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[minLevel];
  }
  function log(level, message, data) {
    if (!shouldLog(level)) return;
    const entry = {
      level,
      message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      context,
      data
    };
    if (onLog) {
      onLog(entry);
      return;
    }
    const color = LEVEL_COLORS[level];
    const ctx = context ? `[${context}]` : "";
    const tag = `${prefix}${ctx}`;
    const formatted = `${color}${tag} ${level.toUpperCase()}${RESET} ${message}`;
    switch (level) {
      case "debug":
        console.debug(formatted, data ?? "");
        break;
      case "info":
        console.info(formatted, data ?? "");
        break;
      case "warn":
        console.warn(formatted, data ?? "");
        break;
      case "error":
        console.error(formatted, data ?? "");
        break;
    }
  }
  return {
    debug: (message, data) => log("debug", message, data),
    info: (message, data) => log("info", message, data),
    warn: (message, data) => log("warn", message, data),
    error: (message, data) => log("error", message, data),
    child: (childConfig) => createLogger({ ...config, ...childConfig })
  };
}
var logger = createLogger();
function createEventTracker(handlers = []) {
  const eventHandlers = [...handlers];
  return {
    track(name, properties, userId) {
      const event = {
        name,
        properties,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        userId
      };
      for (const handler of eventHandlers) {
        try {
          handler(event);
        } catch {
        }
      }
    },
    addHandler(handler) {
      eventHandlers.push(handler);
    },
    removeHandler(handler) {
      const idx = eventHandlers.indexOf(handler);
      if (idx !== -1) eventHandlers.splice(idx, 1);
    }
  };
}

// src/core/config/index.ts
function getEnvSource() {
  if (typeof process !== "undefined" && process.env) {
    return process.env;
  }
  return {};
}
function env(key, defaultValue) {
  const value = getEnvSource()[key];
  if (value !== void 0) return value;
  if (defaultValue !== void 0) return defaultValue;
  throw new Error(`Missing required environment variable: ${key}`);
}
function envOptional(key) {
  return getEnvSource()[key];
}
function envNumber(key, defaultValue) {
  const raw = getEnvSource()[key];
  if (raw !== void 0) {
    const parsed = Number(raw);
    if (isNaN(parsed)) throw new Error(`Environment variable ${key} is not a valid number: ${raw}`);
    return parsed;
  }
  if (defaultValue !== void 0) return defaultValue;
  throw new Error(`Missing required environment variable: ${key}`);
}
function envBool(key, defaultValue) {
  const raw = getEnvSource()[key];
  if (raw !== void 0) {
    return raw === "true" || raw === "1" || raw === "yes";
  }
  if (defaultValue !== void 0) return defaultValue;
  throw new Error(`Missing required environment variable: ${key}`);
}
function envList(key, separator = ",") {
  const raw = getEnvSource()[key];
  if (!raw) return [];
  return raw.split(separator).map((s) => s.trim()).filter(Boolean);
}
function envUrl(key, defaultValue) {
  const value = env(key, defaultValue);
  try {
    new URL(value);
  } catch {
    throw new Error(`Environment variable ${key} is not a valid URL: ${value}`);
  }
  return value.replace(/\/$/, "");
}
function createFeatureFlags(flags = {}, envPrefix = "FEATURE_") {
  const resolvedFlags = { ...flags };
  const envSource = getEnvSource();
  for (const [key, value] of Object.entries(envSource)) {
    if (key.startsWith(envPrefix)) {
      const flagName = key.slice(envPrefix.length).toLowerCase();
      resolvedFlags[flagName] = value === "true" || value === "1";
    }
  }
  return {
    isEnabled(flag) {
      return resolvedFlags[flag] === true;
    },
    isDisabled(flag) {
      return !this.isEnabled(flag);
    },
    getAll() {
      return { ...resolvedFlags };
    },
    set(flag, enabled) {
      resolvedFlags[flag] = enabled;
    }
  };
}
function defineConstants(constants) {
  return Object.freeze(constants);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppError,
  buildPaginatedResponse,
  buildPaginationParams,
  can,
  canAll,
  canAny,
  capitalize,
  constantTimeCompare,
  createApiClient,
  createEventTracker,
  createFeatureFlags,
  createLogger,
  createRateLimiter,
  debounce,
  defineConstants,
  env,
  envBool,
  envList,
  envNumber,
  envOptional,
  envUrl,
  formatBytes,
  formatCompactNumber,
  formatCurrency,
  formatDate,
  formatNumber,
  formatPhone,
  formatRelativeTime,
  generateCsrfToken,
  getOffset,
  guard,
  hasAllRoles,
  hasAnyRole,
  hasRole,
  initials,
  isAuthenticated,
  isNonEmpty,
  isValidEmail,
  isValidHexColor,
  isValidPhone,
  isValidUrl,
  logger,
  maskEmail,
  maskPhone,
  retry,
  safeJsonParse,
  sanitizeHtml,
  sanitizeObject,
  settled,
  sleep,
  slugify,
  stripTags,
  throttle,
  titleCase,
  truncate,
  validatePassword,
  withTimeout
});
//# sourceMappingURL=index.cjs.map