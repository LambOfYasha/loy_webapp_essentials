import React from "react";

export interface PaginationFooterProps {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
  onFirst?: () => void;
  onLast?: () => void;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function PaginationFooter({
  page,
  totalPages,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
  onFirst,
  onLast,
  className = "",
}: PaginationFooterProps) {
  const btnBase =
    "rounded-md border border-[var(--color-border,#e9ecef)] px-3 py-1.5 text-sm font-medium transition-colors";
  const btnEnabled =
    "bg-[var(--color-card,#fff)] text-[var(--color-foreground,#212529)] hover:bg-[var(--color-muted,#f1f3f5)]";
  const btnDisabled = "cursor-not-allowed bg-[var(--color-muted,#f1f3f5)] text-[var(--color-muted-foreground,#868e96)] opacity-50";

  return React.createElement(
    "div",
    {
      className: `loy-pagination flex items-center justify-between gap-4 py-3 ${className}`,
    },
    React.createElement(
      "span",
      { className: "text-sm text-[var(--color-muted-foreground,#868e96)]" },
      `Page ${page} of ${totalPages}`
    ),
    React.createElement(
      "div",
      { className: "flex items-center gap-2" },
      onFirst &&
        React.createElement(
          "button",
          {
            type: "button",
            onClick: onFirst,
            disabled: !hasPrev,
            className: `${btnBase} ${hasPrev ? btnEnabled : btnDisabled}`,
          },
          "First"
        ),
      React.createElement(
        "button",
        {
          type: "button",
          onClick: onPrev,
          disabled: !hasPrev,
          className: `${btnBase} ${hasPrev ? btnEnabled : btnDisabled}`,
        },
        "Previous"
      ),
      React.createElement(
        "button",
        {
          type: "button",
          onClick: onNext,
          disabled: !hasNext,
          className: `${btnBase} ${hasNext ? btnEnabled : btnDisabled}`,
        },
        "Next"
      ),
      onLast &&
        React.createElement(
          "button",
          {
            type: "button",
            onClick: onLast,
            disabled: !hasNext,
            className: `${btnBase} ${hasNext ? btnEnabled : btnDisabled}`,
          },
          "Last"
        )
    )
  );
}
