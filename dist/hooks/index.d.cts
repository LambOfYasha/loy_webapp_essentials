import React, { ReactNode } from 'react';

interface User {
    id: string;
    email?: string;
    name?: string;
    roles: string[];
    permissions?: string[];
    [key: string]: unknown;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}
interface AuthActions {
    login: (user: User, token: string) => void;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
}
interface AuthContextValue extends AuthState, AuthActions {
    hasRole: (role: string) => boolean;
    hasAnyRole: (roles: string[]) => boolean;
    can: (permission: string) => boolean;
    canAny: (permissions: string[]) => boolean;
    guard: (options?: {
        requireRoles?: string[];
        requirePermissions?: string[];
    }) => {
        allowed: boolean;
        reason?: string;
        redirectTo?: string;
    };
}
interface AuthProviderProps {
    children: ReactNode;
    storageKey?: string;
    onLogin?: (user: User, token: string) => void;
    onLogout?: () => void;
}
declare function AuthProvider({ children, storageKey, onLogin, onLogout, }: AuthProviderProps): React.FunctionComponentElement<React.ProviderProps<AuthContextValue | null>>;
declare function useAuth(): AuthContextValue;

type Status = "idle" | "loading" | "success" | "error";

interface UseApiState<T> {
    data: T | null;
    status: Status;
    error: string | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}
interface UseApiOptions<T> {
    immediate?: boolean;
    initialData?: T | null;
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
}
declare function useApi<T, A extends unknown[] = []>(apiFn: (...args: A) => Promise<T>, options?: UseApiOptions<T>): {
    execute: (...args: A) => Promise<T | null>;
    reset: () => void;
    data: T | null;
    status: Status;
    error: string | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
};

declare function useDebounce<T>(value: T, delay: number): T;
declare function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(callback: T, delay: number): (...args: Parameters<T>) => void;

declare function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void];

interface UsePaginationOptions {
    initialPage?: number;
    initialLimit?: number;
    total?: number;
}
interface UsePaginationReturn {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    offset: number;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setTotal: (total: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    firstPage: () => void;
    lastPage: () => void;
    params: {
        page: number;
        limit: number;
    };
}
declare function usePagination(options?: UsePaginationOptions): UsePaginationReturn;

type SocketStatus = "connecting" | "connected" | "disconnected" | "error";
interface UseSocketOptions {
    url: string;
    protocols?: string | string[];
    autoConnect?: boolean;
    reconnect?: boolean;
    reconnectAttempts?: number;
    reconnectInterval?: number;
    onOpen?: (event: Event) => void;
    onClose?: (event: CloseEvent) => void;
    onError?: (event: Event) => void;
    onMessage?: (event: MessageEvent) => void;
}
interface UseSocketReturn {
    status: SocketStatus;
    lastMessage: MessageEvent | null;
    sendMessage: (data: string | ArrayBuffer | Blob) => void;
    sendJson: (data: unknown) => void;
    connect: () => void;
    disconnect: (code?: number, reason?: string) => void;
}
declare function useSocket(options: UseSocketOptions): UseSocketReturn;

type ThemeMode = "light" | "dark" | "system";
interface ThemeContextValue {
    theme: ThemeMode;
    resolvedTheme: "light" | "dark";
    setTheme: (theme: ThemeMode) => void;
    toggleTheme: () => void;
}
interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: ThemeMode;
    storageKey?: string;
    attribute?: string;
}
declare function ThemeProvider({ children, defaultTheme, storageKey, attribute, }: ThemeProviderProps): React.FunctionComponentElement<React.ProviderProps<ThemeContextValue | null>>;
declare function useTheme(): ThemeContextValue;

interface UsePermissionsReturn {
    can: (permission: string) => boolean;
    canAny: (permissions: string[]) => boolean;
    canAll: (permissions: string[]) => boolean;
    hasRole: (role: string) => boolean;
    hasAnyRole: (roles: string[]) => boolean;
    hasAllRoles: (roles: string[]) => boolean;
    isAuthenticated: boolean;
    roles: string[];
    permissions: string[];
}
declare function usePermissions(): UsePermissionsReturn;

export { type AuthActions, type AuthContextValue, AuthProvider, type AuthProviderProps, type AuthState, type SocketStatus, type ThemeContextValue, type ThemeMode, ThemeProvider, type ThemeProviderProps, type UseApiOptions, type UseApiState, type UsePaginationOptions, type UsePaginationReturn, type UsePermissionsReturn, type UseSocketOptions, type UseSocketReturn, useApi, useAuth, useDebounce, useDebouncedCallback, useLocalStorage, usePagination, usePermissions, useSocket, useTheme };
