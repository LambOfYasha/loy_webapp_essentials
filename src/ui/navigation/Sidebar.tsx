import React, { useState, type ReactNode } from "react";
import type { NavItem } from "../../core/types";

export interface SidebarProps {
  items: NavItem[];
  header?: ReactNode;
  footer?: ReactNode;
  activeHref?: string;
  onNavigate?: (href: string) => void;
  collapsed?: boolean;
  className?: string;
}

function SidebarItem({
  item,
  activeHref,
  onNavigate,
  depth = 0,
}: {
  item: NavItem;
  activeHref?: string;
  onNavigate?: (href: string) => void;
  depth?: number;
}): React.ReactElement {
  const [expanded, setExpanded] = useState(false);
  const isActive = activeHref === item.href;
  const hasChildren = item.children && item.children.length > 0;

  return React.createElement(
    "li",
    null,
    React.createElement(
      "button",
      {
        type: "button",
        onClick: () => {
          if (hasChildren) {
            setExpanded(!expanded);
          } else {
            onNavigate?.(item.href);
          }
        },
        className: [
          "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-[var(--color-primary,#4c6ef5)]/10 font-medium text-[var(--color-primary,#4c6ef5)]"
            : "text-[var(--color-muted-foreground,#868e96)] hover:bg-[var(--color-muted,#f1f3f5)] hover:text-[var(--color-foreground,#212529)]",
        ].join(" "),
        style: { paddingLeft: `${0.75 + depth * 1}rem` },
      },
      React.createElement("span", { className: "flex-1 text-left" }, item.label),
      item.badge !== undefined &&
        React.createElement(
          "span",
          {
            className:
              "rounded-full bg-[var(--color-primary,#4c6ef5)] px-2 py-0.5 text-xs font-medium text-white",
          },
          item.badge
        ),
      hasChildren &&
        React.createElement(
          "svg",
          {
            className: `h-4 w-4 shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`,
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: "2",
          },
          React.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M9 5l7 7-7 7",
          })
        )
    ),
    hasChildren &&
      expanded &&
      React.createElement(
        "ul",
        { className: "mt-1 space-y-1" },
        item.children!.map((child, idx) =>
          React.createElement(SidebarItem, {
            key: idx,
            item: child,
            activeHref,
            onNavigate,
            depth: depth + 1,
          })
        )
      )
  );
}

export function Sidebar({
  items,
  header,
  footer,
  activeHref,
  onNavigate,
  className = "",
}: SidebarProps) {
  return React.createElement(
    "nav",
    {
      className: `loy-sidebar flex h-full flex-col ${className}`,
    },
    header && React.createElement("div", { className: "border-b border-[var(--color-border,#e9ecef)] p-4" }, header),
    React.createElement(
      "div",
      { className: "flex-1 overflow-auto p-3" },
      React.createElement(
        "ul",
        { className: "space-y-1" },
        items.map((item, idx) =>
          React.createElement(SidebarItem, {
            key: idx,
            item,
            activeHref,
            onNavigate,
          })
        )
      )
    ),
    footer && React.createElement("div", { className: "border-t border-[var(--color-border,#e9ecef)] p-4" }, footer)
  );
}
