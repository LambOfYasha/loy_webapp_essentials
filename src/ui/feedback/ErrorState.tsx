import React, { type ReactNode } from "react";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  retry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  icon,
  retry,
  retryLabel = "Try again",
  className = "",
}: ErrorStateProps) {
  return React.createElement(
    "div",
    {
      className: `loy-error flex flex-col items-center justify-center gap-4 rounded-lg border border-[var(--color-destructive,#fa5252)]/20 bg-[var(--color-destructive,#fa5252)]/5 p-12 text-center ${className}`,
      role: "alert",
    },
    icon &&
      React.createElement(
        "div",
        { className: "text-[var(--color-destructive,#fa5252)]" },
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
      message &&
        React.createElement(
          "p",
          { className: "mt-1 text-sm text-[var(--color-muted-foreground,#868e96)]" },
          message
        )
    ),
    retry &&
      React.createElement(
        "button",
        {
          type: "button",
          onClick: retry,
          className:
            "mt-2 rounded-md bg-[var(--color-destructive,#fa5252)] px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90",
        },
        retryLabel
      )
  );
}
