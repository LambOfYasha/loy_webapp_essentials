"use client";

// src/hooks/useAuth.ts
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo
} from "react";
import React from "react";

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
var AuthContext = createContext(null);
function AuthProvider({
  children,
  storageKey = "loy_auth",
  onLogin,
  onLogout
}) {
  const [state, setState] = useState(() => {
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
  const login = useCallback(
    (user, token) => {
      setState({ user, token, isLoading: false, isAuthenticated: true });
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, JSON.stringify({ user, token }));
      }
      onLogin?.(user, token);
    },
    [storageKey, onLogin]
  );
  const logout = useCallback(() => {
    setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(storageKey);
    }
    onLogout?.();
  }, [storageKey, onLogout]);
  const updateUser = useCallback(
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
  useEffect(() => {
    setState((prev) => prev.isLoading ? { ...prev, isLoading: false } : prev);
  }, []);
  const value = useMemo(
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
  return React.createElement(AuthContext.Provider, { value }, children);
}
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// src/hooks/useApi.ts
import { useState as useState2, useCallback as useCallback2, useRef, useEffect as useEffect2 } from "react";
function useApi(apiFn, options = {}) {
  const { immediate = false, initialData = null, onSuccess, onError } = options;
  const [state, setState] = useState2({
    data: initialData,
    status: "idle",
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false
  });
  const mountedRef = useRef(true);
  const callCountRef = useRef(0);
  useEffect2(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  const execute = useCallback2(
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
  const reset = useCallback2(() => {
    setState({
      data: initialData,
      status: "idle",
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false
    });
  }, [initialData]);
  useEffect2(() => {
    if (immediate) {
      execute(...[]);
    }
  }, [immediate]);
  return { ...state, execute, reset };
}

// src/hooks/useDebounce.ts
import { useState as useState3, useEffect as useEffect3, useRef as useRef2, useCallback as useCallback3 } from "react";
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState3(value);
  useEffect3(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
function useDebouncedCallback(callback, delay) {
  const callbackRef = useRef2(callback);
  callbackRef.current = callback;
  const timerRef = useRef2(null);
  const debouncedFn = useCallback3(
    (...args) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );
  useEffect3(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  return debouncedFn;
}

// src/hooks/useLocalStorage.ts
import { useState as useState4, useCallback as useCallback4, useEffect as useEffect4 } from "react";
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState4(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const setValue = useCallback4(
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
  const removeValue = useCallback4(() => {
    setStoredValue(initialValue);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(key);
      } catch {
      }
    }
  }, [key, initialValue]);
  useEffect4(() => {
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
import { useState as useState5, useCallback as useCallback5, useMemo as useMemo2 } from "react";
function usePagination(options = {}) {
  const { initialPage = 1, initialLimit = 20, total: initialTotal = 0 } = options;
  const [page, setPageState] = useState5(initialPage);
  const [limit, setLimitState] = useState5(initialLimit);
  const [total, setTotal] = useState5(initialTotal);
  const totalPages = useMemo2(
    () => Math.max(1, Math.ceil(total / limit)),
    [total, limit]
  );
  const hasNext = page < totalPages;
  const hasPrev = page > 1;
  const offset = (page - 1) * limit;
  const setPage = useCallback5(
    (newPage) => {
      setPageState(Math.max(1, Math.min(newPage, totalPages)));
    },
    [totalPages]
  );
  const setLimit = useCallback5((newLimit) => {
    setLimitState(Math.max(1, Math.min(100, newLimit)));
    setPageState(1);
  }, []);
  const nextPage = useCallback5(() => {
    if (hasNext) setPageState((p) => p + 1);
  }, [hasNext]);
  const prevPage = useCallback5(() => {
    if (hasPrev) setPageState((p) => p - 1);
  }, [hasPrev]);
  const firstPage = useCallback5(() => setPageState(1), []);
  const lastPage = useCallback5(() => setPageState(totalPages), [totalPages]);
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
import { useState as useState6, useEffect as useEffect5, useRef as useRef3, useCallback as useCallback6 } from "react";
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
  const [status, setStatus] = useState6("disconnected");
  const [lastMessage, setLastMessage] = useState6(null);
  const wsRef = useRef3(null);
  const reconnectCountRef = useRef3(0);
  const reconnectTimerRef = useRef3(null);
  const mountedRef = useRef3(true);
  const cleanup = useCallback6(() => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
  }, []);
  const connect = useCallback6(() => {
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
  const disconnect = useCallback6(
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
  const sendMessage = useCallback6((data) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(data);
    }
  }, []);
  const sendJson = useCallback6(
    (data) => {
      sendMessage(JSON.stringify(data));
    },
    [sendMessage]
  );
  useEffect5(() => {
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
import {
  createContext as createContext2,
  useContext as useContext2,
  useState as useState7,
  useCallback as useCallback7,
  useEffect as useEffect6,
  useMemo as useMemo3
} from "react";
import React2 from "react";
var ThemeContext = createContext2(null);
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
  const [theme, setThemeState] = useState7(() => {
    if (typeof window === "undefined") return defaultTheme;
    try {
      const stored = window.localStorage.getItem(storageKey);
      return stored || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });
  const resolvedTheme = useMemo3(
    () => theme === "system" ? getSystemTheme() : theme,
    [theme]
  );
  const setTheme = useCallback7(
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
  const toggleTheme = useCallback7(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);
  useEffect6(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (attribute === "class") {
      root.classList.remove("light", "dark");
      root.classList.add(resolvedTheme);
    } else {
      root.setAttribute(attribute, resolvedTheme);
    }
  }, [resolvedTheme, attribute]);
  useEffect6(() => {
    if (theme !== "system") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      setThemeState("system");
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);
  const value = useMemo3(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );
  return React2.createElement(ThemeContext.Provider, { value }, children);
}
function useTheme() {
  const context = useContext2(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// src/hooks/usePermissions.ts
import { useMemo as useMemo4 } from "react";
function usePermissions() {
  const auth = useAuth();
  return useMemo4(() => {
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
export {
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
};
//# sourceMappingURL=index.js.map