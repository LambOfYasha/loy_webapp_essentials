import React from "react";
import type { BreadcrumbItem } from "../../core/types";

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
}

export function Breadcrumbs({
  items,
  separator = "/",
  className = "",
}: BreadcrumbsProps) {
  return React.createElement(
    "nav",
    {
      "aria-label": "Breadcrumb",
      className: `loy-breadcrumbs ${className}`,
    },
    React.createElement(
      "ol",
      { className: "flex items-center gap-2 text-sm" },
      items.map((item, index) =>
        React.createElement(
          "li",
          { key: index, className: "flex items-center gap-2" },
          index > 0 &&
            React.createElement(
              "span",
              {
                className: "text-[var(--color-muted-foreground,#868e96)]",
                "aria-hidden": "true",
              },
              separator
            ),
          item.href
            ? React.createElement(
                "a",
                {
                  href: item.href,
                  className:
                    "text-[var(--color-muted-foreground,#868e96)] transition-colors hover:text-[var(--color-foreground,#212529)]",
                },
                item.label
              )
            : React.createElement(
                "span",
                {
                  className: "font-medium text-[var(--color-foreground,#212529)]",
                  "aria-current": "page",
                },
                item.label
              )
        )
      )
    )
  );
}
