import React, { type ReactNode } from "react";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No data found",
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return React.createElement(
    "div",
    {
      className: `loy-empty flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-[var(--color-border,#e9ecef)] p-12 text-center ${className}`,
    },
    icon &&
      React.createElement(
        "div",
        { className: "text-[var(--color-muted-foreground,#868e96)]" },
        icon
      ),
    React.createElement(
      "div",
      null,
      React.createElement(
        "h3",
        { className: "text-lg font-semibold text-[var(--color-foreground,#212529)]" },
        title
      ),
      description &&
        React.createElement(
          "p",
          { className: "mt-1 text-sm text-[var(--color-muted-foreground,#868e96)]" },
          description
        )
    ),
    action && React.createElement("div", { className: "mt-2" }, action)
  );
}
