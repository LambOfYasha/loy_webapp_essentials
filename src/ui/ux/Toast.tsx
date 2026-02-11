import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
  title?: string;
}

export interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  success: (message: string, title?: string) => string;
  error: (message: string, title?: string) => string;
  warning: (message: string, title?: string) => string;
  info: (message: string, title?: string) => string;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

const VARIANT_STYLES: Record<ToastVariant, string> = {
  success:
    "border-l-4 border-l-[var(--color-success,#40c057)] bg-[var(--color-card,#fff)]",
  error:
    "border-l-4 border-l-[var(--color-destructive,#fa5252)] bg-[var(--color-card,#fff)]",
  warning:
    "border-l-4 border-l-[var(--color-warning,#fab005)] bg-[var(--color-card,#fff)]",
  info: "border-l-4 border-l-[var(--color-info,#228be6)] bg-[var(--color-card,#fff)]",
};

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  useEffect(() => {
    const duration = toast.duration ?? 5000;
    if (duration <= 0) return;
    const timer = setTimeout(() => onRemove(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  return React.createElement(
    "div",
    {
      className: `loy-toast animate-[slide-in-from-right_300ms_ease-out] rounded-lg border border-[var(--color-border,#e9ecef)] px-4 py-3 shadow-lg ${VARIANT_STYLES[toast.variant]}`,
      role: "alert",
    },
    React.createElement(
      "div",
      { className: "flex items-start justify-between gap-3" },
      React.createElement(
        "div",
        null,
        toast.title &&
          React.createElement(
            "p",
            {
              className:
                "text-sm font-semibold text-[var(--color-foreground,#212529)]",
            },
            toast.title
          ),
        React.createElement(
          "p",
          {
            className:
              "text-sm text-[var(--color-muted-foreground,#868e96)]",
          },
          toast.message
        )
      ),
      React.createElement(
        "button",
        {
          type: "button",
          onClick: () => onRemove(toast.id),
          className:
            "shrink-0 text-[var(--color-muted-foreground,#868e96)] transition-colors hover:text-[var(--color-foreground,#212529)]",
          "aria-label": "Close",
        },
        "\u00D7"
      )
    )
  );
}

export interface ToastProviderProps {
  children: ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  maxToasts?: number;
}

const POSITION_STYLES: Record<string, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

export function ToastProvider({
  children,
  position = "top-right",
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">): string => {
      const id = `toast-${++toastCounter}`;
      setToasts((prev) => {
        const next = [...prev, { ...toast, id }];
        return next.slice(-maxToasts);
      });
      return id;
    },
    [maxToasts]
  );

  const clearToasts = useCallback(() => setToasts([]), []);

  const success = useCallback(
    (message: string, title?: string) =>
      addToast({ message, title, variant: "success" }),
    [addToast]
  );

  const error = useCallback(
    (message: string, title?: string) =>
      addToast({ message, title, variant: "error" }),
    [addToast]
  );

  const warning = useCallback(
    (message: string, title?: string) =>
      addToast({ message, title, variant: "warning" }),
    [addToast]
  );

  const info = useCallback(
    (message: string, title?: string) =>
      addToast({ message, title, variant: "info" }),
    [addToast]
  );

  const value = useMemo<ToastContextValue>(
    () => ({ toasts, addToast, removeToast, clearToasts, success, error, warning, info }),
    [toasts, addToast, removeToast, clearToasts, success, error, warning, info]
  );

  return React.createElement(
    ToastContext.Provider,
    { value },
    children,
    toasts.length > 0 &&
      React.createElement(
        "div",
        {
          className: `fixed z-[100] flex w-80 flex-col gap-2 ${POSITION_STYLES[position] || POSITION_STYLES["top-right"]}`,
          "aria-live": "polite",
        },
        toasts.map((toast) =>
          React.createElement(ToastItem, {
            key: toast.id,
            toast,
            onRemove: removeToast,
          })
        )
      )
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
