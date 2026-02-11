import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import React from "react";
import type { User } from "../core/auth";
import { hasRole, hasAnyRole, can, canAny, guard } from "../core/auth";

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthActions {
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export interface AuthContextValue extends AuthState, AuthActions {
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  can: (permission: string) => boolean;
  canAny: (permissions: string[]) => boolean;
  guard: (options?: {
    requireRoles?: string[];
    requirePermissions?: string[];
  }) => { allowed: boolean; reason?: string; redirectTo?: string };
}

const AuthContext = createContext<AuthContextValue | null>(null);

export interface AuthProviderProps {
  children: ReactNode;
  storageKey?: string;
  onLogin?: (user: User, token: string) => void;
  onLogout?: () => void;
}

export function AuthProvider({
  children,
  storageKey = "loy_auth",
  onLogin,
  onLogout,
}: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(() => {
    if (typeof window === "undefined") {
      return { user: null, token: null, isLoading: true, isAuthenticated: false };
    }
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as { user: User; token: string };
        return {
          user: parsed.user,
          token: parsed.token,
          isLoading: false,
          isAuthenticated: true,
        };
      }
    } catch {
      // ignore
    }
    return { user: null, token: null, isLoading: false, isAuthenticated: false };
  });

  const login = useCallback(
    (user: User, token: string) => {
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
    (updates: Partial<User>) => {
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
    setState((prev) => (prev.isLoading ? { ...prev, isLoading: false } : prev));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login,
      logout,
      updateUser,
      hasRole: (role: string) => hasRole(state.user, role),
      hasAnyRole: (roles: string[]) => hasAnyRole(state.user, roles),
      can: (permission: string) => can(state.user, permission),
      canAny: (permissions: string[]) => canAny(state.user, permissions),
      guard: (options) => guard(state.user, options),
    }),
    [state, login, logout, updateUser]
  );

  return React.createElement(AuthContext.Provider, { value }, children);
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
