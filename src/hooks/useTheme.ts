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

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
  attribute?: string;
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "loy_theme",
  attribute = "class",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return defaultTheme;
    try {
      const stored = window.localStorage.getItem(storageKey) as ThemeMode | null;
      return stored || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const resolvedTheme = useMemo<"light" | "dark">(
    () => (theme === "system" ? getSystemTheme() : theme),
    [theme]
  );

  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(storageKey, newTheme);
        } catch {
          // ignore
        }
      }
    },
    [storageKey]
  );

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  // Apply theme to document
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    if (attribute === "class") {
      root.classList.remove("light", "dark");
      root.classList.add(resolvedTheme);
    } else {
      root.setAttribute(attribute, resolvedTheme);
    }
  }, [resolvedTheme, attribute]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => {
      // Force re-render when system theme changes
      setThemeState("system");
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return React.createElement(ThemeContext.Provider, { value }, children);
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
