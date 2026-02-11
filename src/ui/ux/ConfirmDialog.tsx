import React, { useEffect, useCallback } from "react";

export interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary" | "warning";
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

const VARIANT_STYLES: Record<string, string> = {
  primary: "bg-[var(--color-primary,#4c6ef5)] hover:opacity-90",
  danger: "bg-[var(--color-destructive,#fa5252)] hover:opacity-90",
  warning: "bg-[var(--color-warning,#fab005)] hover:opacity-90 text-[var(--color-foreground,#212529)]",
};

export function ConfirmDialog({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  onConfirm,
  onCancel,
  className = "",
}: ConfirmDialogProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    },
    [onCancel]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  if (!open) return null;

  return React.createElement(
    "div",
    {
      className: `loy-confirm-dialog fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${className}`,
      onClick: onCancel,
    },
    React.createElement(
      "div",
      {
        className:
          "w-full max-w-md animate-[scale-in_200ms_ease-out] rounded-xl border border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] p-6 shadow-2xl",
        onClick: (e: React.MouseEvent) => e.stopPropagation(),
      },
      React.createElement(
        "h2",
        { className: "text-lg font-semibold text-[var(--color-foreground,#212529)]" },
        title
      ),
      React.createElement(
        "p",
        { className: "mt-2 text-sm text-[var(--color-muted-foreground,#868e96)]" },
        message
      ),
      React.createElement(
        "div",
        { className: "mt-6 flex justify-end gap-3" },
        React.createElement(
          "button",
          {
            type: "button",
            onClick: onCancel,
            className:
              "rounded-md border border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] px-4 py-2 text-sm font-medium text-[var(--color-foreground,#212529)] transition-colors hover:bg-[var(--color-muted,#f1f3f5)]",
          },
          cancelLabel
        ),
        React.createElement(
          "button",
          {
            type: "button",
            onClick: onConfirm,
            className: `rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${VARIANT_STYLES[variant] || VARIANT_STYLES.primary}`,
          },
          confirmLabel
        )
      )
    )
  );
}
