import React, { type ReactNode } from "react";

export interface AppLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  sidebarWidth?: string;
  className?: string;
}

export function AppLayout({
  children,
  sidebar,
  header,
  footer,
  sidebarWidth = "16rem",
  className = "",
}: AppLayoutProps) {
  return React.createElement(
    "div",
    { className: `loy-app-layout flex min-h-screen flex-col ${className}` },
    header,
    React.createElement(
      "div",
      { className: "flex flex-1" },
      sidebar &&
        React.createElement(
          "aside",
          {
            className: "loy-sidebar shrink-0 border-r border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)]",
            style: { width: sidebarWidth },
          },
          sidebar
        ),
      React.createElement(
        "main",
        { className: "loy-main flex-1 overflow-auto" },
        children
      )
    ),
    footer
  );
}
