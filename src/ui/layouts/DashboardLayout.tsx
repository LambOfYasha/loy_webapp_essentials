import React, { type ReactNode } from "react";

export interface DashboardLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  pageTitle?: string;
  pageDescription?: string;
  actions?: ReactNode;
  className?: string;
}

export function DashboardLayout({
  children,
  sidebar,
  header,
  pageTitle,
  pageDescription,
  actions,
  className = "",
}: DashboardLayoutProps) {
  return React.createElement(
    "div",
    { className: `loy-dashboard flex min-h-screen ${className}` },
    sidebar &&
      React.createElement(
        "aside",
        {
          className:
            "loy-dash-sidebar w-64 shrink-0 border-r border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)]",
        },
        sidebar
      ),
    React.createElement(
      "div",
      { className: "flex flex-1 flex-col overflow-hidden" },
      header &&
        React.createElement(
          "header",
          {
            className:
              "loy-dash-header shrink-0 border-b border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] px-6 py-3",
          },
          header
        ),
      React.createElement(
        "main",
        { className: "flex-1 overflow-auto p-6" },
        (pageTitle || actions) &&
          React.createElement(
            "div",
            { className: "mb-6 flex items-center justify-between" },
            React.createElement(
              "div",
              null,
              pageTitle &&
                React.createElement(
                  "h1",
                  {
                    className:
                      "text-2xl font-bold text-[var(--color-foreground,#212529)]",
                  },
                  pageTitle
                ),
              pageDescription &&
                React.createElement(
                  "p",
                  {
                    className:
                      "mt-1 text-sm text-[var(--color-muted-foreground,#868e96)]",
                  },
                  pageDescription
                )
            ),
            actions &&
              React.createElement(
                "div",
                { className: "flex items-center gap-3" },
                actions
              )
          ),
        children
      )
    )
  );
}
