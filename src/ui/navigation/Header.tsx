import React, { type ReactNode } from "react";

export interface HeaderProps {
  logo?: ReactNode;
  title?: string;
  nav?: ReactNode;
  actions?: ReactNode;
  className?: string;
  sticky?: boolean;
}

export function Header({
  logo,
  title,
  nav,
  actions,
  className = "",
  sticky = true,
}: HeaderProps) {
  return React.createElement(
    "header",
    {
      className: [
        "loy-header flex items-center justify-between border-b border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] px-6 py-3",
        sticky ? "sticky top-0 z-40" : "",
        className,
      ]
        .filter(Boolean)
        .join(" "),
    },
    React.createElement(
      "div",
      { className: "flex items-center gap-4" },
      logo,
      title &&
        React.createElement(
          "h1",
          { className: "text-lg font-semibold text-[var(--color-foreground,#212529)]" },
          title
        )
    ),
    nav && React.createElement("nav", { className: "hidden md:block" }, nav),
    actions &&
      React.createElement(
        "div",
        { className: "flex items-center gap-3" },
        actions
      )
  );
}
