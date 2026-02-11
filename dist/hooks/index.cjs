"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/hooks/index.ts
var hooks_exports = {};
__export(hooks_exports, {
  AuthProvider: () => AuthProvider,
  ThemeProvider: () => ThemeProvider,
  useApi: () => useApi,
  useAuth: () => useAuth,
  useDebounce: () => useDebounce,
  useDebouncedCallback: () => useDebouncedCallback,
  useLocalStorage: () => useLocalStorage,
  usePagination: () => usePagination,
  usePermissions: () => usePermissions,
  useSocket: () => useSocket,
  useTheme: () => useTheme
});
module.exports = __toCommonJS(hooks_exports);

// src/hooks/useAuth.ts
var import_react = require("react");
var import_react2 = __toESM(require("react"), 1);

// src/core/auth/index.ts
function hasRole(user, role) {
  if (!user) return false;
  return user.roles.includes(role);
}
function hasAnyRole(user, roles) {
  if (!user) return false;
  return roles.some((role) => user.roles.includes(role));
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

// src/hooks/useAuth.ts
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({
  children,
  storageKey = "loy_auth",
  onLogin,
  onLogout
}) {
  const [state, setState] = (0, import_react.useState)(() => {
    if (typeof window === "undefined") {
      return { user: null, token: null, isLoading: true, isAuthenticated: false };
    }
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          user: parsed.user,
          token: parsed.token,
          isLoading: false,
          isAuthenticated: true
        };
      }
    } catch {
    }
    return { user: null, token: null, isLoading: false, isAuthenticated: false };
  });
  const login = (0, import_react.useCallback)(
    (user, token) => {
      setState({ user, token, isLoading: false, isAuthenticated: true });
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, JSON.stringify({ user, token }));
      }
      onLogin?.(user, token);
    },
    [storageKey, onLogin]
  );
  const logout = (0, import_react.useCallback)(() => {
    setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(storageKey);
    }
    onLogout?.();
  }, [storageKey, onLogout]);
  const updateUser = (0, import_react.useCallback)(
    (updates) => {
      setState((prev) => {
        if (!prev.user) return prev;
        const updatedUser = { ...prev.user, ...updates };
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            storageKey,
            JSON.stringify({ user: updatedUser, token: prev.token })
          );
        }
        return { ...prev, user: updatedUser };
      });
    },
    [storageKey]
  );
  (0, import_react.useEffect)(() => {
    setState((prev) => prev.isLoading ? { ...prev, isLoading: false } : prev);
  }, []);
  const value = (0, import_react.useMemo)(
    () => ({
      ...state,
      login,
      logout,
      updateUser,
      hasRole: (role) => hasRole(state.user, role),
      hasAnyRole: (roles) => hasAnyRole(state.user, roles),
      can: (permission) => can(state.user, permission),
      canAny: (permissions) => canAny(state.user, permissions),
      guard: (options) => guard(state.user, options)
    }),
    [state, login, logout, updateUser]
  );
  return import_react2.default.createElement(AuthContext.Provider, { value }, children);
}
function useAuth() {
  const context = (0, import_react.useContext)(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// src/hooks/useApi.ts
var import_react3 = require("react");
function useApi(apiFn, options = {}) {
  const { immediate = false, initialData = null, onSuccess, onError } = options;
  const [state, setState] = (0, import_react3.useState)({
    data: initialData,
    status: "idle",
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false
  });
  const mountedRef = (0, import_react3.useRef)(true);
  const callCountRef = (0, import_react3.useRef)(0);
  (0, import_react3.useEffect)(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  const execute = (0, import_react3.useCallback)(
    async (...args) => {
      const callId = ++callCountRef.current;
      setState({
        data: state.data,
        status: "loading",
        error: null,
        isLoading: true,
        isSuccess: false,
        isError: false
      });
      try {
        const data = await apiFn(...args);
        if (mountedRef.current && callId === callCountRef.current) {
          setState({
            data,
            status: "success",
            error: null,
            isLoading: false,
            isSuccess: true,
            isError: false
          });
          onSuccess?.(data);
        }
        return data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "An unknown error occurred";
        if (mountedRef.current && callId === callCountRef.current) {
          setState({
            data: null,
            status: "error",
            error: message,
            isLoading: false,
            isSuccess: false,
            isError: true
          });
          onError?.(message);
        }
        return null;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiFn]
  );
  const reset = (0, import_react3.useCallback)(() => {
    setState({
      data: initialData,
      status: "idle",
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false
    });
  }, [initialData]);
  (0, import_react3.useEffect)(() => {
    if (immediate) {
      execute(...[]);
    }
  }, [immediate]);
  return { ...state, execute, reset };
}

// src/hooks/useDebounce.ts
var import_react4 = require("react");
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = (0, import_react4.useState)(value);
  (0, import_react4.useEffect)(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
function useDebouncedCallback(callback, delay) {
  const callbackRef = (0, import_react4.useRef)(callback);
  callbackRef.current = callback;
  const timerRef = (0, import_react4.useRef)(null);
  const debouncedFn = (0, import_react4.useCallback)(
    (...args) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );
  (0, import_react4.useEffect)(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  return debouncedFn;
}

// src/hooks/useLocalStorage.ts
var import_react5 = require("react");
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = (0, import_react5.useState)(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const setValue = (0, import_react5.useCallback)(
    (value) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;
        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(key, JSON.stringify(nextValue));
            window.dispatchEvent(
              new StorageEvent("storage", { key, newValue: JSON.stringify(nextValue) })
            );
          } catch {
          }
        }
        return nextValue;
      });
    },
    [key]
  );
  const removeValue = (0, import_react5.useCallback)(() => {
    setStoredValue(initialValue);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(key);
      } catch {
      }
    }
  }, [key, initialValue]);
  (0, import_react5.useEffect)(() => {
    const handleStorage = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);
  return [storedValue, setValue, removeValue];
}

// src/hooks/usePagination.ts
var import_react6 = require("react");
function usePagination(options = {}) {
  const { initialPage = 1, initialLimit = 20, total: initialTotal = 0 } = options;
  const [page, setPageState] = (0, import_react6.useState)(initialPage);
  const [limit, setLimitState] = (0, import_react6.useState)(initialLimit);
  const [total, setTotal] = (0, import_react6.useState)(initialTotal);
  const totalPages = (0, import_react6.useMemo)(
    () => Math.max(1, Math.ceil(total / limit)),
    [total, limit]
  );
  const hasNext = page < totalPages;
  const hasPrev = page > 1;
  const offset = (page - 1) * limit;
  const setPage = (0, import_react6.useCallback)(
    (newPage) => {
      setPageState(Math.max(1, Math.min(newPage, totalPages)));
    },
    [totalPages]
  );
  const setLimit = (0, import_react6.useCallback)((newLimit) => {
    setLimitState(Math.max(1, Math.min(100, newLimit)));
    setPageState(1);
  }, []);
  const nextPage = (0, import_react6.useCallback)(() => {
    if (hasNext) setPageState((p) => p + 1);
  }, [hasNext]);
  const prevPage = (0, import_react6.useCallback)(() => {
    if (hasPrev) setPageState((p) => p - 1);
  }, [hasPrev]);
  const firstPage = (0, import_react6.useCallback)(() => setPageState(1), []);
  const lastPage = (0, import_react6.useCallback)(() => setPageState(totalPages), [totalPages]);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext,
    hasPrev,
    offset,
    setPage,
    setLimit,
    setTotal,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    params: { page, limit }
  };
}

// src/hooks/useSocket.ts
var import_react7 = require("react");
function useSocket(options) {
  const {
    url,
    protocols,
    autoConnect = true,
    reconnect = true,
    reconnectAttempts = 5,
    reconnectInterval = 3e3,
    onOpen,
    onClose,
    onError,
    onMessage
  } = options;
  const [status, setStatus] = (0, import_react7.useState)("disconnected");
  const [lastMessage, setLastMessage] = (0, import_react7.useState)(null);
  const wsRef = (0, import_react7.useRef)(null);
  const reconnectCountRef = (0, import_react7.useRef)(0);
  const reconnectTimerRef = (0, import_react7.useRef)(null);
  const mountedRef = (0, import_react7.useRef)(true);
  const cleanup = (0, import_react7.useCallback)(() => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
  }, []);
  const connect = (0, import_react7.useCallback)(() => {
    cleanup();
    if (wsRef.current?.readyState === WebSocket.OPEN) return;
    try {
      setStatus("connecting");
      const ws = new WebSocket(url, protocols);
      ws.onopen = (event) => {
        if (!mountedRef.current) return;
        setStatus("connected");
        reconnectCountRef.current = 0;
        onOpen?.(event);
      };
      ws.onclose = (event) => {
        if (!mountedRef.current) return;
        setStatus("disconnected");
        onClose?.(event);
        if (reconnect && reconnectCountRef.current < reconnectAttempts && !event.wasClean) {
          reconnectCountRef.current++;
          reconnectTimerRef.current = setTimeout(connect, reconnectInterval);
        }
      };
      ws.onerror = (event) => {
        if (!mountedRef.current) return;
        setStatus("error");
        onError?.(event);
      };
      ws.onmessage = (event) => {
        if (!mountedRef.current) return;
        setLastMessage(event);
        onMessage?.(event);
      };
      wsRef.current = ws;
    } catch {
      setStatus("error");
    }
  }, [url, protocols, reconnect, reconnectAttempts, reconnectInterval, onOpen, onClose, onError, onMessage, cleanup]);
  const disconnect = (0, import_react7.useCallback)(
    (code, reason) => {
      cleanup();
      reconnectCountRef.current = reconnectAttempts;
      if (wsRef.current) {
        wsRef.current.close(code, reason);
        wsRef.current = null;
      }
    },
    [cleanup, reconnectAttempts]
  );
  const sendMessage = (0, import_react7.useCallback)((data) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(data);
    }
  }, []);
  const sendJson = (0, import_react7.useCallback)(
    (data) => {
      sendMessage(JSON.stringify(data));
    },
    [sendMessage]
  );
  (0, import_react7.useEffect)(() => {
    mountedRef.current = true;
    if (autoConnect) connect();
    return () => {
      mountedRef.current = false;
      cleanup();
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [url]);
  return { status, lastMessage, sendMessage, sendJson, connect, disconnect };
}

// src/hooks/useTheme.ts
var import_react8 = require("react");
var import_react9 = __toESM(require("react"), 1);
var ThemeContext = (0, import_react8.createContext)(null);
function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "loy_theme",
  attribute = "class"
}) {
  const [theme, setThemeState] = (0, import_react8.useState)(() => {
    if (typeof window === "undefined") return defaultTheme;
    try {
      const stored = window.localStorage.getItem(storageKey);
      return stored || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });
  const resolvedTheme = (0, import_react8.useMemo)(
    () => theme === "system" ? getSystemTheme() : theme,
    [theme]
  );
  const setTheme = (0, import_react8.useCallback)(
    (newTheme) => {
      setThemeState(newTheme);
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(storageKey, newTheme);
        } catch {
        }
      }
    },
    [storageKey]
  );
  const toggleTheme = (0, import_react8.useCallback)(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);
  (0, import_react8.useEffect)(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (attribute === "class") {
      root.classList.remove("light", "dark");
      root.classList.add(resolvedTheme);
    } else {
      root.setAttribute(attribute, resolvedTheme);
    }
  }, [resolvedTheme, attribute]);
  (0, import_react8.useEffect)(() => {
    if (theme !== "system") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      setThemeState("system");
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);
  const value = (0, import_react8.useMemo)(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );
  return import_react9.default.createElement(ThemeContext.Provider, { value }, children);
}
function useTheme() {
  const context = (0, import_react8.useContext)(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// src/hooks/usePermissions.ts
var import_react10 = require("react");
function usePermissions() {
  const auth = useAuth();
  return (0, import_react10.useMemo)(() => {
    const userRoles = auth.user?.roles ?? [];
    const userPermissions = auth.user?.permissions ?? [];
    return {
      can: (permission) => userPermissions.includes(permission),
      canAny: (permissions) => permissions.some((p) => userPermissions.includes(p)),
      canAll: (permissions) => permissions.every((p) => userPermissions.includes(p)),
      hasRole: (role) => userRoles.includes(role),
      hasAnyRole: (roles) => roles.some((r) => userRoles.includes(r)),
      hasAllRoles: (roles) => roles.every((r) => userRoles.includes(r)),
      isAuthenticated: auth.isAuthenticated,
      roles: userRoles,
      permissions: userPermissions
    };
  }, [auth.user, auth.isAuthenticated]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthProvider,
  ThemeProvider,
  useApi,
  useAuth,
  useDebounce,
  useDebouncedCallback,
  useLocalStorage,
  usePagination,
  usePermissions,
  useSocket,
  useTheme
});
//# sourceMappingURL=index.cjs.map