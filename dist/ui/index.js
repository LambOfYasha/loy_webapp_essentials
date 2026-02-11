"use client";

// src/ui/layouts/AppLayout.tsx
import React from "react";
function AppLayout({
  children,
  sidebar,
  header,
  footer,
  sidebarWidth = "16rem",
  className = ""
}) {
  return React.createElement(
    "div",
    { className: `loy-app-layout flex min-h-screen flex-col ${className}` },
    header,
    React.createElement(
      "div",
      { className: "flex flex-1" },
      sidebar && React.createElement(
        "aside",
        {
          className: "loy-sidebar shrink-0 border-r border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)]",
          style: { width: sidebarWidth }
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

// src/ui/layouts/DashboardLayout.tsx
import React2 from "react";
function DashboardLayout({
  children,
  sidebar,
  header,
  pageTitle,
  pageDescription,
  actions,
  className = ""
}) {
  return React2.createElement(
    "div",
    { className: `loy-dashboard flex min-h-screen ${className}` },
    sidebar && React2.createElement(
      "aside",
      {
        className: "loy-dash-sidebar w-64 shrink-0 border-r border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)]"
      },
      sidebar
    ),
    React2.createElement(
      "div",
      { className: "flex flex-1 flex-col overflow-hidden" },
      header && React2.createElement(
        "header",
        {
          className: "loy-dash-header shrink-0 border-b border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] px-6 py-3"
        },
        header
      ),
      React2.createElement(
        "main",
        { className: "flex-1 overflow-auto p-6" },
        (pageTitle || actions) && React2.createElement(
          "div",
          { className: "mb-6 flex items-center justify-between" },
          React2.createElement(
            "div",
            null,
            pageTitle && React2.createElement(
              "h1",
              {
                className: "text-2xl font-bold text-[var(--color-foreground,#212529)]"
              },
              pageTitle
            ),
            pageDescription && React2.createElement(
              "p",
              {
                className: "mt-1 text-sm text-[var(--color-muted-foreground,#868e96)]"
              },
              pageDescription
            )
          ),
          actions && React2.createElement(
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

// src/ui/layouts/AuthLayout.tsx
import React3 from "react";
function AuthLayout({
  children,
  title,
  description,
  logo,
  footer,
  className = "",
  maxWidth = "24rem"
}) {
  return React3.createElement(
    "div",
    {
      className: `loy-auth-layout flex min-h-screen items-center justify-center bg-[var(--color-muted,#f1f3f5)] p-4 ${className}`
    },
    React3.createElement(
      "div",
      {
        className: "w-full rounded-xl border border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] p-8 shadow-lg",
        style: { maxWidth }
      },
      logo && React3.createElement(
        "div",
        { className: "mb-6 flex justify-center" },
        logo
      ),
      title && React3.createElement(
        "h1",
        {
          className: "mb-2 text-center text-2xl font-bold text-[var(--color-foreground,#212529)]"
        },
        title
      ),
      description && React3.createElement(
        "p",
        {
          className: "mb-6 text-center text-sm text-[var(--color-muted-foreground,#868e96)]"
        },
        description
      ),
      children,
      footer && React3.createElement(
        "div",
        {
          className: "mt-6 border-t border-[var(--color-border,#e9ecef)] pt-4 text-center text-sm text-[var(--color-muted-foreground,#868e96)]"
        },
        footer
      )
    )
  );
}

// src/ui/navigation/Breadcrumbs.tsx
import React4 from "react";
function Breadcrumbs({
  items,
  separator = "/",
  className = ""
}) {
  return React4.createElement(
    "nav",
    {
      "aria-label": "Breadcrumb",
      className: `loy-breadcrumbs ${className}`
    },
    React4.createElement(
      "ol",
      { className: "flex items-center gap-2 text-sm" },
      items.map(
        (item, index) => React4.createElement(
          "li",
          { key: index, className: "flex items-center gap-2" },
          index > 0 && React4.createElement(
            "span",
            {
              className: "text-[var(--color-muted-foreground,#868e96)]",
              "aria-hidden": "true"
            },
            separator
          ),
          item.href ? React4.createElement(
            "a",
            {
              href: item.href,
              className: "text-[var(--color-muted-foreground,#868e96)] transition-colors hover:text-[var(--color-foreground,#212529)]"
            },
            item.label
          ) : React4.createElement(
            "span",
            {
              className: "font-medium text-[var(--color-foreground,#212529)]",
              "aria-current": "page"
            },
            item.label
          )
        )
      )
    )
  );
}

// src/ui/navigation/Sidebar.tsx
import React5, { useState } from "react";
function SidebarItem({
  item,
  activeHref,
  onNavigate,
  depth = 0
}) {
  const [expanded, setExpanded] = useState(false);
  const isActive = activeHref === item.href;
  const hasChildren = item.children && item.children.length > 0;
  return React5.createElement(
    "li",
    null,
    React5.createElement(
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
          isActive ? "bg-[var(--color-primary,#4c6ef5)]/10 font-medium text-[var(--color-primary,#4c6ef5)]" : "text-[var(--color-muted-foreground,#868e96)] hover:bg-[var(--color-muted,#f1f3f5)] hover:text-[var(--color-foreground,#212529)]"
        ].join(" "),
        style: { paddingLeft: `${0.75 + depth * 1}rem` }
      },
      React5.createElement("span", { className: "flex-1 text-left" }, item.label),
      item.badge !== void 0 && React5.createElement(
        "span",
        {
          className: "rounded-full bg-[var(--color-primary,#4c6ef5)] px-2 py-0.5 text-xs font-medium text-white"
        },
        item.badge
      ),
      hasChildren && React5.createElement(
        "svg",
        {
          className: `h-4 w-4 shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`,
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          strokeWidth: "2"
        },
        React5.createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M9 5l7 7-7 7"
        })
      )
    ),
    hasChildren && expanded && React5.createElement(
      "ul",
      { className: "mt-1 space-y-1" },
      item.children.map(
        (child, idx) => React5.createElement(SidebarItem, {
          key: idx,
          item: child,
          activeHref,
          onNavigate,
          depth: depth + 1
        })
      )
    )
  );
}
function Sidebar({
  items,
  header,
  footer,
  activeHref,
  onNavigate,
  className = ""
}) {
  return React5.createElement(
    "nav",
    {
      className: `loy-sidebar flex h-full flex-col ${className}`
    },
    header && React5.createElement("div", { className: "border-b border-[var(--color-border,#e9ecef)] p-4" }, header),
    React5.createElement(
      "div",
      { className: "flex-1 overflow-auto p-3" },
      React5.createElement(
        "ul",
        { className: "space-y-1" },
        items.map(
          (item, idx) => React5.createElement(SidebarItem, {
            key: idx,
            item,
            activeHref,
            onNavigate
          })
        )
      )
    ),
    footer && React5.createElement("div", { className: "border-t border-[var(--color-border,#e9ecef)] p-4" }, footer)
  );
}

// src/ui/navigation/Header.tsx
import React6 from "react";
function Header({
  logo,
  title,
  nav,
  actions,
  className = "",
  sticky = true
}) {
  return React6.createElement(
    "header",
    {
      className: [
        "loy-header flex items-center justify-between border-b border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] px-6 py-3",
        sticky ? "sticky top-0 z-40" : "",
        className
      ].filter(Boolean).join(" ")
    },
    React6.createElement(
      "div",
      { className: "flex items-center gap-4" },
      logo,
      title && React6.createElement(
        "h1",
        { className: "text-lg font-semibold text-[var(--color-foreground,#212529)]" },
        title
      )
    ),
    nav && React6.createElement("nav", { className: "hidden md:block" }, nav),
    actions && React6.createElement(
      "div",
      { className: "flex items-center gap-3" },
      actions
    )
  );
}

// src/ui/feedback/LoadingState.tsx
import React7 from "react";
var SIZES = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };
function LoadingState({
  message = "Loading...",
  size = "md",
  className = ""
}) {
  return React7.createElement(
    "div",
    {
      className: `loy-loading flex flex-col items-center justify-center gap-3 p-8 ${className}`,
      role: "status"
    },
    React7.createElement(
      "svg",
      {
        className: `animate-spin text-[var(--color-primary,#4c6ef5)] ${SIZES[size]}`,
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24"
      },
      React7.createElement("circle", {
        className: "opacity-25",
        cx: "12",
        cy: "12",
        r: "10",
        stroke: "currentColor",
        strokeWidth: "4"
      }),
      React7.createElement("path", {
        className: "opacity-75",
        fill: "currentColor",
        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      })
    ),
    message && React7.createElement(
      "p",
      { className: "text-sm text-[var(--color-muted-foreground,#868e96)]" },
      message
    )
  );
}

// src/ui/feedback/EmptyState.tsx
import React8 from "react";
function EmptyState({
  title = "No data found",
  description,
  icon,
  action,
  className = ""
}) {
  return React8.createElement(
    "div",
    {
      className: `loy-empty flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-[var(--color-border,#e9ecef)] p-12 text-center ${className}`
    },
    icon && React8.createElement(
      "div",
      { className: "text-[var(--color-muted-foreground,#868e96)]" },
      icon
    ),
    React8.createElement(
      "div",
      null,
      React8.createElement(
        "h3",
        { className: "text-lg font-semibold text-[var(--color-foreground,#212529)]" },
        title
      ),
      description && React8.createElement(
        "p",
        { className: "mt-1 text-sm text-[var(--color-muted-foreground,#868e96)]" },
        description
      )
    ),
    action && React8.createElement("div", { className: "mt-2" }, action)
  );
}

// src/ui/feedback/ErrorState.tsx
import React9 from "react";
function ErrorState({
  title = "Something went wrong",
  message,
  icon,
  retry,
  retryLabel = "Try again",
  className = ""
}) {
  return React9.createElement(
    "div",
    {
      className: `loy-error flex flex-col items-center justify-center gap-4 rounded-lg border border-[var(--color-destructive,#fa5252)]/20 bg-[var(--color-destructive,#fa5252)]/5 p-12 text-center ${className}`,
      role: "alert"
    },
    icon && React9.createElement(
      "div",
      { className: "text-[var(--color-destructive,#fa5252)]" },
      icon
    ),
    React9.createElement(
      "div",
      null,
      React9.createElement(
        "h3",
        { className: "text-lg font-semibold text-[var(--color-foreground,#212529)]" },
        title
      ),
      message && React9.createElement(
        "p",
        { className: "mt-1 text-sm text-[var(--color-muted-foreground,#868e96)]" },
        message
      )
    ),
    retry && React9.createElement(
      "button",
      {
        type: "button",
        onClick: retry,
        className: "mt-2 rounded-md bg-[var(--color-destructive,#fa5252)] px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
      },
      retryLabel
    )
  );
}

// src/ui/feedback/LoadingOverlay.tsx
import React10 from "react";
function LoadingOverlay({
  visible,
  message = "Loading...",
  className = ""
}) {
  if (!visible) return null;
  return React10.createElement(
    "div",
    {
      className: `loy-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${className}`
    },
    React10.createElement(
      "div",
      {
        className: "rounded-xl bg-[var(--color-card,#fff)] p-8 shadow-2xl"
      },
      React10.createElement(LoadingState, { message, size: "lg" })
    )
  );
}

// src/ui/data-display/DataTable.tsx
import React11 from "react";
function DataTable({
  columns,
  data,
  sort,
  onSort,
  onRowClick,
  emptyMessage = "No data available",
  loading = false,
  className = "",
  rowKey
}) {
  const handleSort = (column) => {
    if (!column.sortable || !onSort) return;
    const direction = sort?.column === column.key && sort.direction === "asc" ? "desc" : "asc";
    onSort(column.key, direction);
  };
  const getSortIndicator = (column) => {
    if (!column.sortable) return "";
    if (sort?.column !== column.key) return " \u2195";
    return sort.direction === "asc" ? " \u2191" : " \u2193";
  };
  return React11.createElement(
    "div",
    { className: `loy-datatable overflow-auto rounded-lg border border-[var(--color-border,#e9ecef)] ${className}` },
    React11.createElement(
      "table",
      { className: "w-full text-sm" },
      // Head
      React11.createElement(
        "thead",
        null,
        React11.createElement(
          "tr",
          { className: "border-b border-[var(--color-border,#e9ecef)] bg-[var(--color-muted,#f1f3f5)]" },
          columns.map(
            (col) => React11.createElement(
              "th",
              {
                key: col.key,
                className: [
                  "px-4 py-3 text-left font-medium text-[var(--color-muted-foreground,#868e96)]",
                  col.sortable ? "cursor-pointer select-none hover:text-[var(--color-foreground,#212529)]" : "",
                  col.className || ""
                ].join(" "),
                style: col.width ? { width: col.width } : void 0,
                onClick: () => handleSort(col)
              },
              col.header + getSortIndicator(col)
            )
          )
        )
      ),
      // Body
      React11.createElement(
        "tbody",
        null,
        loading ? React11.createElement(
          "tr",
          null,
          React11.createElement(
            "td",
            {
              colSpan: columns.length,
              className: "px-4 py-12 text-center text-[var(--color-muted-foreground,#868e96)]"
            },
            "Loading..."
          )
        ) : data.length === 0 ? React11.createElement(
          "tr",
          null,
          React11.createElement(
            "td",
            {
              colSpan: columns.length,
              className: "px-4 py-12 text-center text-[var(--color-muted-foreground,#868e96)]"
            },
            emptyMessage
          )
        ) : data.map(
          (row, rowIndex) => React11.createElement(
            "tr",
            {
              key: rowKey ? rowKey(row, rowIndex) : rowIndex,
              className: [
                "border-b border-[var(--color-border,#e9ecef)] last:border-b-0",
                onRowClick ? "cursor-pointer hover:bg-[var(--color-muted,#f1f3f5)]" : ""
              ].join(" "),
              onClick: onRowClick ? () => onRowClick(row, rowIndex) : void 0
            },
            columns.map(
              (col) => React11.createElement(
                "td",
                {
                  key: col.key,
                  className: `px-4 py-3 text-[var(--color-foreground,#212529)] ${col.className || ""}`
                },
                col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")
              )
            )
          )
        )
      )
    )
  );
}

// src/ui/data-display/PaginationFooter.tsx
import React12 from "react";
function PaginationFooter({
  page,
  totalPages,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
  onFirst,
  onLast,
  className = ""
}) {
  const btnBase = "rounded-md border border-[var(--color-border,#e9ecef)] px-3 py-1.5 text-sm font-medium transition-colors";
  const btnEnabled = "bg-[var(--color-card,#fff)] text-[var(--color-foreground,#212529)] hover:bg-[var(--color-muted,#f1f3f5)]";
  const btnDisabled = "cursor-not-allowed bg-[var(--color-muted,#f1f3f5)] text-[var(--color-muted-foreground,#868e96)] opacity-50";
  return React12.createElement(
    "div",
    {
      className: `loy-pagination flex items-center justify-between gap-4 py-3 ${className}`
    },
    React12.createElement(
      "span",
      { className: "text-sm text-[var(--color-muted-foreground,#868e96)]" },
      `Page ${page} of ${totalPages}`
    ),
    React12.createElement(
      "div",
      { className: "flex items-center gap-2" },
      onFirst && React12.createElement(
        "button",
        {
          type: "button",
          onClick: onFirst,
          disabled: !hasPrev,
          className: `${btnBase} ${hasPrev ? btnEnabled : btnDisabled}`
        },
        "First"
      ),
      React12.createElement(
        "button",
        {
          type: "button",
          onClick: onPrev,
          disabled: !hasPrev,
          className: `${btnBase} ${hasPrev ? btnEnabled : btnDisabled}`
        },
        "Previous"
      ),
      React12.createElement(
        "button",
        {
          type: "button",
          onClick: onNext,
          disabled: !hasNext,
          className: `${btnBase} ${hasNext ? btnEnabled : btnDisabled}`
        },
        "Next"
      ),
      onLast && React12.createElement(
        "button",
        {
          type: "button",
          onClick: onLast,
          disabled: !hasNext,
          className: `${btnBase} ${hasNext ? btnEnabled : btnDisabled}`
        },
        "Last"
      )
    )
  );
}

// src/ui/ux/ConfirmDialog.tsx
import React13, { useEffect, useCallback } from "react";
var VARIANT_STYLES = {
  primary: "bg-[var(--color-primary,#4c6ef5)] hover:opacity-90",
  danger: "bg-[var(--color-destructive,#fa5252)] hover:opacity-90",
  warning: "bg-[var(--color-warning,#fab005)] hover:opacity-90 text-[var(--color-foreground,#212529)]"
};
function ConfirmDialog({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  onConfirm,
  onCancel,
  className = ""
}) {
  const handleKeyDown = useCallback(
    (e) => {
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
  return React13.createElement(
    "div",
    {
      className: `loy-confirm-dialog fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${className}`,
      onClick: onCancel
    },
    React13.createElement(
      "div",
      {
        className: "w-full max-w-md animate-[scale-in_200ms_ease-out] rounded-xl border border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] p-6 shadow-2xl",
        onClick: (e) => e.stopPropagation()
      },
      React13.createElement(
        "h2",
        { className: "text-lg font-semibold text-[var(--color-foreground,#212529)]" },
        title
      ),
      React13.createElement(
        "p",
        { className: "mt-2 text-sm text-[var(--color-muted-foreground,#868e96)]" },
        message
      ),
      React13.createElement(
        "div",
        { className: "mt-6 flex justify-end gap-3" },
        React13.createElement(
          "button",
          {
            type: "button",
            onClick: onCancel,
            className: "rounded-md border border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] px-4 py-2 text-sm font-medium text-[var(--color-foreground,#212529)] transition-colors hover:bg-[var(--color-muted,#f1f3f5)]"
          },
          cancelLabel
        ),
        React13.createElement(
          "button",
          {
            type: "button",
            onClick: onConfirm,
            className: `rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${VARIANT_STYLES[variant] || VARIANT_STYLES.primary}`
          },
          confirmLabel
        )
      )
    )
  );
}

// src/ui/ux/DeleteDialog.tsx
import React14 from "react";
function DeleteDialog({
  title = "Delete Item",
  confirmLabel = "Delete",
  itemName,
  message,
  ...props
}) {
  const finalMessage = itemName ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.` : message;
  return React14.createElement(ConfirmDialog, {
    ...props,
    title,
    message: finalMessage,
    confirmLabel,
    variant: "danger"
  });
}

// src/ui/ux/CopyToClipboard.tsx
import React15, { useState as useState2, useCallback as useCallback2 } from "react";
function CopyToClipboard({
  text,
  children,
  className = "",
  copiedDuration = 2e3,
  onCopy
}) {
  const [copied, setCopied] = useState2(false);
  const handleCopy = useCallback2(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), copiedDuration);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), copiedDuration);
    }
  }, [text, copiedDuration, onCopy]);
  if (children) {
    return React15.createElement(
      "button",
      { type: "button", onClick: handleCopy, className },
      children
    );
  }
  return React15.createElement(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      className: `loy-copy inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border,#e9ecef)] px-3 py-1.5 text-sm transition-colors hover:bg-[var(--color-muted,#f1f3f5)] ${className}`,
      title: "Copy to clipboard"
    },
    copied ? "Copied!" : "Copy"
  );
}

// src/ui/ux/Toast.tsx
import React16, {
  createContext,
  useContext,
  useState as useState3,
  useCallback as useCallback3,
  useEffect as useEffect2,
  useMemo
} from "react";
var ToastContext = createContext(null);
var toastCounter = 0;
var VARIANT_STYLES2 = {
  success: "border-l-4 border-l-[var(--color-success,#40c057)] bg-[var(--color-card,#fff)]",
  error: "border-l-4 border-l-[var(--color-destructive,#fa5252)] bg-[var(--color-card,#fff)]",
  warning: "border-l-4 border-l-[var(--color-warning,#fab005)] bg-[var(--color-card,#fff)]",
  info: "border-l-4 border-l-[var(--color-info,#228be6)] bg-[var(--color-card,#fff)]"
};
function ToastItem({
  toast,
  onRemove
}) {
  useEffect2(() => {
    const duration = toast.duration ?? 5e3;
    if (duration <= 0) return;
    const timer = setTimeout(() => onRemove(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);
  return React16.createElement(
    "div",
    {
      className: `loy-toast animate-[slide-in-from-right_300ms_ease-out] rounded-lg border border-[var(--color-border,#e9ecef)] px-4 py-3 shadow-lg ${VARIANT_STYLES2[toast.variant]}`,
      role: "alert"
    },
    React16.createElement(
      "div",
      { className: "flex items-start justify-between gap-3" },
      React16.createElement(
        "div",
        null,
        toast.title && React16.createElement(
          "p",
          {
            className: "text-sm font-semibold text-[var(--color-foreground,#212529)]"
          },
          toast.title
        ),
        React16.createElement(
          "p",
          {
            className: "text-sm text-[var(--color-muted-foreground,#868e96)]"
          },
          toast.message
        )
      ),
      React16.createElement(
        "button",
        {
          type: "button",
          onClick: () => onRemove(toast.id),
          className: "shrink-0 text-[var(--color-muted-foreground,#868e96)] transition-colors hover:text-[var(--color-foreground,#212529)]",
          "aria-label": "Close"
        },
        "\xD7"
      )
    )
  );
}
var POSITION_STYLES = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2"
};
function ToastProvider({
  children,
  position = "top-right",
  maxToasts = 5
}) {
  const [toasts, setToasts] = useState3([]);
  const removeToast = useCallback3((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const addToast = useCallback3(
    (toast) => {
      const id = `toast-${++toastCounter}`;
      setToasts((prev) => {
        const next = [...prev, { ...toast, id }];
        return next.slice(-maxToasts);
      });
      return id;
    },
    [maxToasts]
  );
  const clearToasts = useCallback3(() => setToasts([]), []);
  const success = useCallback3(
    (message, title) => addToast({ message, title, variant: "success" }),
    [addToast]
  );
  const error = useCallback3(
    (message, title) => addToast({ message, title, variant: "error" }),
    [addToast]
  );
  const warning = useCallback3(
    (message, title) => addToast({ message, title, variant: "warning" }),
    [addToast]
  );
  const info = useCallback3(
    (message, title) => addToast({ message, title, variant: "info" }),
    [addToast]
  );
  const value = useMemo(
    () => ({ toasts, addToast, removeToast, clearToasts, success, error, warning, info }),
    [toasts, addToast, removeToast, clearToasts, success, error, warning, info]
  );
  return React16.createElement(
    ToastContext.Provider,
    { value },
    children,
    toasts.length > 0 && React16.createElement(
      "div",
      {
        className: `fixed z-[100] flex w-80 flex-col gap-2 ${POSITION_STYLES[position] || POSITION_STYLES["top-right"]}`,
        "aria-live": "polite"
      },
      toasts.map(
        (toast) => React16.createElement(ToastItem, {
          key: toast.id,
          toast,
          onRemove: removeToast
        })
      )
    )
  );
}
function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// src/ui/ux/ModalManager.tsx
import React17, {
  createContext as createContext2,
  useContext as useContext2,
  useState as useState4,
  useCallback as useCallback4,
  useMemo as useMemo2,
  useEffect as useEffect3
} from "react";
var ModalContext = createContext2(null);
var modalCounter = 0;
var SIZE_STYLES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[90vw] max-h-[90vh]"
};
function ModalItem({
  modal,
  onClose
}) {
  const handleClose = useCallback4(() => {
    modal.onClose?.();
    onClose(modal.id);
  }, [modal, onClose]);
  useEffect3(() => {
    if (modal.closable === false) return;
    const handler = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [modal.closable, handleClose]);
  return React17.createElement(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
      onClick: modal.closable !== false ? handleClose : void 0
    },
    React17.createElement(
      "div",
      {
        className: `w-full animate-[scale-in_200ms_ease-out] rounded-xl border border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] shadow-2xl ${SIZE_STYLES[modal.size || "md"]}`,
        onClick: (e) => e.stopPropagation()
      },
      (modal.title || modal.closable !== false) && React17.createElement(
        "div",
        {
          className: "flex items-center justify-between border-b border-[var(--color-border,#e9ecef)] px-6 py-4"
        },
        modal.title ? React17.createElement(
          "h2",
          {
            className: "text-lg font-semibold text-[var(--color-foreground,#212529)]"
          },
          modal.title
        ) : React17.createElement("div"),
        modal.closable !== false && React17.createElement(
          "button",
          {
            type: "button",
            onClick: handleClose,
            className: "text-xl text-[var(--color-muted-foreground,#868e96)] transition-colors hover:text-[var(--color-foreground,#212529)]",
            "aria-label": "Close modal"
          },
          "\xD7"
        )
      ),
      React17.createElement("div", { className: "p-6" }, modal.content)
    )
  );
}
function ModalProvider({ children }) {
  const [modals, setModals] = useState4([]);
  const openModal = useCallback4(
    (config) => {
      const id = config.id || `modal-${++modalCounter}`;
      const modal = { ...config, id, closable: config.closable ?? true };
      setModals((prev) => [...prev.filter((m) => m.id !== id), modal]);
      return id;
    },
    []
  );
  const closeModal = useCallback4((id) => {
    setModals((prev) => {
      if (id) return prev.filter((m) => m.id !== id);
      return prev.slice(0, -1);
    });
  }, []);
  const closeAllModals = useCallback4(() => setModals([]), []);
  const value = useMemo2(
    () => ({ openModal, closeModal, closeAllModals, activeModals: modals }),
    [openModal, closeModal, closeAllModals, modals]
  );
  return React17.createElement(
    ModalContext.Provider,
    { value },
    children,
    modals.map(
      (modal) => React17.createElement(ModalItem, {
        key: modal.id,
        modal,
        onClose: (id) => {
          closeModal(id);
        }
      })
    )
  );
}
function useModal() {
  const context = useContext2(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
export {
  AppLayout,
  AuthLayout,
  Breadcrumbs,
  ConfirmDialog,
  CopyToClipboard,
  DashboardLayout,
  DataTable,
  DeleteDialog,
  EmptyState,
  ErrorState,
  Header,
  LoadingOverlay,
  LoadingState,
  ModalProvider,
  PaginationFooter,
  Sidebar,
  ToastProvider,
  useModal,
  useToast
};
//# sourceMappingURL=index.js.map