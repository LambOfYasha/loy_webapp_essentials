import React, { type ReactNode } from "react";

export interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  logo?: ReactNode;
  footer?: ReactNode;
  className?: string;
  maxWidth?: string;
}

export function AuthLayout({
  children,
  title,
  description,
  logo,
  footer,
  className = "",
  maxWidth = "24rem",
}: AuthLayoutProps) {
  return React.createElement(
    "div",
    {
      className: `loy-auth-layout flex min-h-screen items-center justify-center bg-[var(--color-muted,#f1f3f5)] p-4 ${className}`,
    },
    React.createElement(
      "div",
      {
        className:
          "w-full rounded-xl border border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] p-8 shadow-lg",
        style: { maxWidth },
      },
      logo &&
        React.createElement(
          "div",
          { className: "mb-6 flex justify-center" },
          logo
        ),
      title &&
        React.createElement(
          "h1",
          {
            className:
              "mb-2 text-center text-2xl font-bold text-[var(--color-foreground,#212529)]",
          },
          title
        ),
      description &&
        React.createElement(
          "p",
          {
            className:
              "mb-6 text-center text-sm text-[var(--color-muted-foreground,#868e96)]",
          },
          description
        ),
      children,
      footer &&
        React.createElement(
          "div",
          {
            className:
              "mt-6 border-t border-[var(--color-border,#e9ecef)] pt-4 text-center text-sm text-[var(--color-muted-foreground,#868e96)]",
          },
          footer
        )
    )
  );
}
