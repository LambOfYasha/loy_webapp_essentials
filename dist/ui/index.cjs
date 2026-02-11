"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/ui/index.ts
var ui_exports = {};
__export(ui_exports, {
  AppLayout: () => AppLayout,
  AuthLayout: () => AuthLayout,
  Breadcrumbs: () => Breadcrumbs,
  ConfirmDialog: () => ConfirmDialog,
  CopyToClipboard: () => CopyToClipboard,
  DashboardLayout: () => DashboardLayout,
  DataTable: () => DataTable,
  DeleteDialog: () => DeleteDialog,
  EmptyState: () => EmptyState,
  ErrorState: () => ErrorState,
  Header: () => Header,
  LoadingOverlay: () => LoadingOverlay,
  LoadingState: () => LoadingState,
  ModalProvider: () => ModalProvider,
  PaginationFooter: () => PaginationFooter,
  Sidebar: () => Sidebar,
  ToastProvider: () => ToastProvider,
  useModal: () => useModal,
  useToast: () => useToast
});
module.exports = __toCommonJS(ui_exports);

// src/ui/layouts/AppLayout.tsx
var import_react = __toESM(require("react"), 1);
function AppLayout({
  children,
  sidebar,
  header,
  footer,
  sidebarWidth = "16rem",
  className = ""
}) {
  return import_react.default.createElement(
    "div",
    { className: `loy-app-layout flex min-h-screen flex-col ${className}` },
    header,
    import_react.default.createElement(
      "div",
      { className: "flex flex-1" },
      sidebar && import_react.default.createElement(
        "aside",
        {
          className: "loy-sidebar shrink-0 border-r border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)]",
          style: { width: sidebarWidth }
        },
        sidebar
      ),
      import_react.default.createElement(
        "main",
        { className: "loy-main flex-1 overflow-auto" },
        children
      )
    ),
    footer
  );
}

// src/ui/layouts/DashboardLayout.tsx
var import_react2 = __toESM(require("react"), 1);
function DashboardLayout({
  children,
  sidebar,
  header,
  pageTitle,
  pageDescription,
  actions,
  className = ""
}) {
  return import_react2.default.createElement(
    "div",
    { className: `loy-dashboard flex min-h-screen ${className}` },
    sidebar && import_react2.default.createElement(
      "aside",
      {
        className: "loy-dash-sidebar w-64 shrink-0 border-r border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)]"
      },
      sidebar
    ),
    import_react2.default.createElement(
      "div",
      { className: "flex flex-1 flex-col overflow-hidden" },
      header && import_react2.default.createElement(
        "header",
        {
          className: "loy-dash-header shrink-0 border-b border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] px-6 py-3"
        },
        header
      ),
      import_react2.default.createElement(
        "main",
        { className: "flex-1 overflow-auto p-6" },
        (pageTitle || actions) && import_react2.default.createElement(
          "div",
          { className: "mb-6 flex items-center justify-between" },
          import_react2.default.createElement(
            "div",
            null,
            pageTitle && import_react2.default.createElement(
              "h1",
              {
                className: "text-2xl font-bold text-[var(--color-foreground,#212529)]"
              },
              pageTitle
            ),
            pageDescription && import_react2.default.createElement(
              "p",
              {
                className: "mt-1 text-sm text-[var(--color-muted-foreground,#868e96)]"
              },
              pageDescription
            )
          ),
          actions && import_react2.default.createElement(
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
var import_react3 = __toESM(require("react"), 1);
function AuthLayout({
  children,
  title,
  description,
  logo,
  footer,
  className = "",
  maxWidth = "24rem"
}) {
  return import_react3.default.createElement(
    "div",
    {
      className: `loy-auth-layout flex min-h-screen items-center justify-center bg-[var(--color-muted,#f1f3f5)] p-4 ${className}`
    },
    import_react3.default.createElement(
      "div",
      {
        className: "w-full rounded-xl border border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] p-8 shadow-lg",
        style: { maxWidth }
      },
      logo && import_react3.default.createElement(
        "div",
        { className: "mb-6 flex justify-center" },
        logo
      ),
      title && import_react3.default.createElement(
        "h1",
        {
          className: "mb-2 text-center text-2xl font-bold text-[var(--color-foreground,#212529)]"
        },
        title
      ),
      description && import_react3.default.createElement(
        "p",
        {
          className: "mb-6 text-center text-sm text-[var(--color-muted-foreground,#868e96)]"
        },
        description
      ),
      children,
      footer && import_react3.default.createElement(
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
var import_react4 = __toESM(require("react"), 1);
function Breadcrumbs({
  items,
  separator = "/",
  className = ""
}) {
  return import_react4.default.createElement(
    "nav",
    {
      "aria-label": "Breadcrumb",
      className: `loy-breadcrumbs ${className}`
    },
    import_react4.default.createElement(
      "ol",
      { className: "flex items-center gap-2 text-sm" },
      items.map(
        (item, index) => import_react4.default.createElement(
          "li",
          { key: index, className: "flex items-center gap-2" },
          index > 0 && import_react4.default.createElement(
            "span",
            {
              className: "text-[var(--color-muted-foreground,#868e96)]",
              "aria-hidden": "true"
            },
            separator
          ),
          item.href ? import_react4.default.createElement(
            "a",
            {
              href: item.href,
              className: "text-[var(--color-muted-foreground,#868e96)] transition-colors hover:text-[var(--color-foreground,#212529)]"
            },
            item.label
          ) : import_react4.default.createElement(
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
var import_react5 = __toESM(require("react"), 1);
function SidebarItem({
  item,
  activeHref,
  onNavigate,
  depth = 0
}) {
  const [expanded, setExpanded] = (0, import_react5.useState)(false);
  const isActive = activeHref === item.href;
  const hasChildren = item.children && item.children.length > 0;
  return import_react5.default.createElement(
    "li",
    null,
    import_react5.default.createElement(
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
      import_react5.default.createElement("span", { className: "flex-1 text-left" }, item.label),
      item.badge !== void 0 && import_react5.default.createElement(
        "span",
        {
          className: "rounded-full bg-[var(--color-primary,#4c6ef5)] px-2 py-0.5 text-xs font-medium text-white"
        },
        item.badge
      ),
      hasChildren && import_react5.default.createElement(
        "svg",
        {
          className: `h-4 w-4 shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`,
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          strokeWidth: "2"
        },
        import_react5.default.createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M9 5l7 7-7 7"
        })
      )
    ),
    hasChildren && expanded && import_react5.default.createElement(
      "ul",
      { className: "mt-1 space-y-1" },
      item.children.map(
        (child, idx) => import_react5.default.createElement(SidebarItem, {
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
  return import_react5.default.createElement(
    "nav",
    {
      className: `loy-sidebar flex h-full flex-col ${className}`
    },
    header && import_react5.default.createElement("div", { className: "border-b border-[var(--color-border,#e9ecef)] p-4" }, header),
    import_react5.default.createElement(
      "div",
      { className: "flex-1 overflow-auto p-3" },
      import_react5.default.createElement(
        "ul",
        { className: "space-y-1" },
        items.map(
          (item, idx) => import_react5.default.createElement(SidebarItem, {
            key: idx,
            item,
            activeHref,
            onNavigate
          })
        )
      )
    ),
    footer && import_react5.default.createElement("div", { className: "border-t border-[var(--color-border,#e9ecef)] p-4" }, footer)
  );
}

// src/ui/navigation/Header.tsx
var import_react6 = __toESM(require("react"), 1);
function Header({
  logo,
  title,
  nav,
  actions,
  className = "",
  sticky = true
}) {
  return import_react6.default.createElement(
    "header",
    {
      className: [
        "loy-header flex items-center justify-between border-b border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] px-6 py-3",
        sticky ? "sticky top-0 z-40" : "",
        className
      ].filter(Boolean).join(" ")
    },
    import_react6.default.createElement(
      "div",
      { className: "flex items-center gap-4" },
      logo,
      title && import_react6.default.createElement(
        "h1",
        { className: "text-lg font-semibold text-[var(--color-foreground,#212529)]" },
        title
      )
    ),
    nav && import_react6.default.createElement("nav", { className: "hidden md:block" }, nav),
    actions && import_react6.default.createElement(
      "div",
      { className: "flex items-center gap-3" },
      actions
    )
  );
}

// src/ui/feedback/LoadingState.tsx
var import_react7 = __toESM(require("react"), 1);
var SIZES = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };
function LoadingState({
  message = "Loading...",
  size = "md",
  className = ""
}) {
  return import_react7.default.createElement(
    "div",
    {
      className: `loy-loading flex flex-col items-center justify-center gap-3 p-8 ${className}`,
      role: "status"
    },
    import_react7.default.createElement(
      "svg",
      {
        className: `animate-spin text-[var(--color-primary,#4c6ef5)] ${SIZES[size]}`,
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24"
      },
      import_react7.default.createElement("circle", {
        className: "opacity-25",
        cx: "12",
        cy: "12",
        r: "10",
        stroke: "currentColor",
        strokeWidth: "4"
      }),
      import_react7.default.createElement("path", {
        className: "opacity-75",
        fill: "currentColor",
        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      })
    ),
    message && import_react7.default.createElement(
      "p",
      { className: "text-sm text-[var(--color-muted-foreground,#868e96)]" },
      message
    )
  );
}

// src/ui/feedback/EmptyState.tsx
var import_react8 = __toESM(require("react"), 1);
function EmptyState({
  title = "No data found",
  description,
  icon,
  action,
  className = ""
}) {
  return import_react8.default.createElement(
    "div",
    {
      className: `loy-empty flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-[var(--color-border,#e9ecef)] p-12 text-center ${className}`
    },
    icon && import_react8.default.createElement(
      "div",
      { className: "text-[var(--color-muted-foreground,#868e96)]" },
      icon
    ),
    import_react8.default.createElement(
      "div",
      null,
      import_react8.default.createElement(
        "h3",
        { className: "text-lg font-semibold text-[var(--color-foreground,#212529)]" },
        title
      ),
      description && import_react8.default.createElement(
        "p",
        { className: "mt-1 text-sm text-[var(--color-muted-foreground,#868e96)]" },
        description
      )
    ),
    action && import_react8.default.createElement("div", { className: "mt-2" }, action)
  );
}

// src/ui/feedback/ErrorState.tsx
var import_react9 = __toESM(require("react"), 1);
function ErrorState({
  title = "Something went wrong",
  message,
  icon,
  retry,
  retryLabel = "Try again",
  className = ""
}) {
  return import_react9.default.createElement(
    "div",
    {
      className: `loy-error flex flex-col items-center justify-center gap-4 rounded-lg border border-[var(--color-destructive,#fa5252)]/20 bg-[var(--color-destructive,#fa5252)]/5 p-12 text-center ${className}`,
      role: "alert"
    },
    icon && import_react9.default.createElement(
      "div",
      { className: "text-[var(--color-destructive,#fa5252)]" },
      icon
    ),
    import_react9.default.createElement(
      "div",
      null,
      import_react9.default.createElement(
        "h3",
        { className: "text-lg font-semibold text-[var(--color-foreground,#212529)]" },
        title
      ),
      message && import_react9.default.createElement(
        "p",
        { className: "mt-1 text-sm text-[var(--color-muted-foreground,#868e96)]" },
        message
      )
    ),
    retry && import_react9.default.createElement(
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
var import_react10 = __toESM(require("react"), 1);
function LoadingOverlay({
  visible,
  message = "Loading...",
  className = ""
}) {
  if (!visible) return null;
  return import_react10.default.createElement(
    "div",
    {
      className: `loy-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${className}`
    },
    import_react10.default.createElement(
      "div",
      {
        className: "rounded-xl bg-[var(--color-card,#fff)] p-8 shadow-2xl"
      },
      import_react10.default.createElement(LoadingState, { message, size: "lg" })
    )
  );
}

// src/ui/data-display/DataTable.tsx
var import_react11 = __toESM(require("react"), 1);
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
  return import_react11.default.createElement(
    "div",
    { className: `loy-datatable overflow-auto rounded-lg border border-[var(--color-border,#e9ecef)] ${className}` },
    import_react11.default.createElement(
      "table",
      { className: "w-full text-sm" },
      // Head
      import_react11.default.createElement(
        "thead",
        null,
        import_react11.default.createElement(
          "tr",
          { className: "border-b border-[var(--color-border,#e9ecef)] bg-[var(--color-muted,#f1f3f5)]" },
          columns.map(
            (col) => import_react11.default.createElement(
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
      import_react11.default.createElement(
        "tbody",
        null,
        loading ? import_react11.default.createElement(
          "tr",
          null,
          import_react11.default.createElement(
            "td",
            {
              colSpan: columns.length,
              className: "px-4 py-12 text-center text-[var(--color-muted-foreground,#868e96)]"
            },
            "Loading..."
          )
        ) : data.length === 0 ? import_react11.default.createElement(
          "tr",
          null,
          import_react11.default.createElement(
            "td",
            {
              colSpan: columns.length,
              className: "px-4 py-12 text-center text-[var(--color-muted-foreground,#868e96)]"
            },
            emptyMessage
          )
        ) : data.map(
          (row, rowIndex) => import_react11.default.createElement(
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
              (col) => import_react11.default.createElement(
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
var import_react12 = __toESM(require("react"), 1);
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
  return import_react12.default.createElement(
    "div",
    {
      className: `loy-pagination flex items-center justify-between gap-4 py-3 ${className}`
    },
    import_react12.default.createElement(
      "span",
      { className: "text-sm text-[var(--color-muted-foreground,#868e96)]" },
      `Page ${page} of ${totalPages}`
    ),
    import_react12.default.createElement(
      "div",
      { className: "flex items-center gap-2" },
      onFirst && import_react12.default.createElement(
        "button",
        {
          type: "button",
          onClick: onFirst,
          disabled: !hasPrev,
          className: `${btnBase} ${hasPrev ? btnEnabled : btnDisabled}`
        },
        "First"
      ),
      import_react12.default.createElement(
        "button",
        {
          type: "button",
          onClick: onPrev,
          disabled: !hasPrev,
          className: `${btnBase} ${hasPrev ? btnEnabled : btnDisabled}`
        },
        "Previous"
      ),
      import_react12.default.createElement(
        "button",
        {
          type: "button",
          onClick: onNext,
          disabled: !hasNext,
          className: `${btnBase} ${hasNext ? btnEnabled : btnDisabled}`
        },
        "Next"
      ),
      onLast && import_react12.default.createElement(
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
var import_react13 = __toESM(require("react"), 1);
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
  const handleKeyDown = (0, import_react13.useCallback)(
    (e) => {
      if (e.key === "Escape") onCancel();
    },
    [onCancel]
  );
  (0, import_react13.useEffect)(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);
  if (!open) return null;
  return import_react13.default.createElement(
    "div",
    {
      className: `loy-confirm-dialog fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${className}`,
      onClick: onCancel
    },
    import_react13.default.createElement(
      "div",
      {
        className: "w-full max-w-md animate-[scale-in_200ms_ease-out] rounded-xl border border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] p-6 shadow-2xl",
        onClick: (e) => e.stopPropagation()
      },
      import_react13.default.createElement(
        "h2",
        { className: "text-lg font-semibold text-[var(--color-foreground,#212529)]" },
        title
      ),
      import_react13.default.createElement(
        "p",
        { className: "mt-2 text-sm text-[var(--color-muted-foreground,#868e96)]" },
        message
      ),
      import_react13.default.createElement(
        "div",
        { className: "mt-6 flex justify-end gap-3" },
        import_react13.default.createElement(
          "button",
          {
            type: "button",
            onClick: onCancel,
            className: "rounded-md border border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] px-4 py-2 text-sm font-medium text-[var(--color-foreground,#212529)] transition-colors hover:bg-[var(--color-muted,#f1f3f5)]"
          },
          cancelLabel
        ),
        import_react13.default.createElement(
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
var import_react14 = __toESM(require("react"), 1);
function DeleteDialog({
  title = "Delete Item",
  confirmLabel = "Delete",
  itemName,
  message,
  ...props
}) {
  const finalMessage = itemName ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.` : message;
  return import_react14.default.createElement(ConfirmDialog, {
    ...props,
    title,
    message: finalMessage,
    confirmLabel,
    variant: "danger"
  });
}

// src/ui/ux/CopyToClipboard.tsx
var import_react15 = __toESM(require("react"), 1);
function CopyToClipboard({
  text,
  children,
  className = "",
  copiedDuration = 2e3,
  onCopy
}) {
  const [copied, setCopied] = (0, import_react15.useState)(false);
  const handleCopy = (0, import_react15.useCallback)(async () => {
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
    return import_react15.default.createElement(
      "button",
      { type: "button", onClick: handleCopy, className },
      children
    );
  }
  return import_react15.default.createElement(
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
var import_react16 = __toESM(require("react"), 1);
var ToastContext = (0, import_react16.createContext)(null);
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
  (0, import_react16.useEffect)(() => {
    const duration = toast.duration ?? 5e3;
    if (duration <= 0) return;
    const timer = setTimeout(() => onRemove(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);
  return import_react16.default.createElement(
    "div",
    {
      className: `loy-toast animate-[slide-in-from-right_300ms_ease-out] rounded-lg border border-[var(--color-border,#e9ecef)] px-4 py-3 shadow-lg ${VARIANT_STYLES2[toast.variant]}`,
      role: "alert"
    },
    import_react16.default.createElement(
      "div",
      { className: "flex items-start justify-between gap-3" },
      import_react16.default.createElement(
        "div",
        null,
        toast.title && import_react16.default.createElement(
          "p",
          {
            className: "text-sm font-semibold text-[var(--color-foreground,#212529)]"
          },
          toast.title
        ),
        import_react16.default.createElement(
          "p",
          {
            className: "text-sm text-[var(--color-muted-foreground,#868e96)]"
          },
          toast.message
        )
      ),
      import_react16.default.createElement(
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
  const [toasts, setToasts] = (0, import_react16.useState)([]);
  const removeToast = (0, import_react16.useCallback)((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const addToast = (0, import_react16.useCallback)(
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
  const clearToasts = (0, import_react16.useCallback)(() => setToasts([]), []);
  const success = (0, import_react16.useCallback)(
    (message, title) => addToast({ message, title, variant: "success" }),
    [addToast]
  );
  const error = (0, import_react16.useCallback)(
    (message, title) => addToast({ message, title, variant: "error" }),
    [addToast]
  );
  const warning = (0, import_react16.useCallback)(
    (message, title) => addToast({ message, title, variant: "warning" }),
    [addToast]
  );
  const info = (0, import_react16.useCallback)(
    (message, title) => addToast({ message, title, variant: "info" }),
    [addToast]
  );
  const value = (0, import_react16.useMemo)(
    () => ({ toasts, addToast, removeToast, clearToasts, success, error, warning, info }),
    [toasts, addToast, removeToast, clearToasts, success, error, warning, info]
  );
  return import_react16.default.createElement(
    ToastContext.Provider,
    { value },
    children,
    toasts.length > 0 && import_react16.default.createElement(
      "div",
      {
        className: `fixed z-[100] flex w-80 flex-col gap-2 ${POSITION_STYLES[position] || POSITION_STYLES["top-right"]}`,
        "aria-live": "polite"
      },
      toasts.map(
        (toast) => import_react16.default.createElement(ToastItem, {
          key: toast.id,
          toast,
          onRemove: removeToast
        })
      )
    )
  );
}
function useToast() {
  const context = (0, import_react16.useContext)(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// src/ui/ux/ModalManager.tsx
var import_react17 = __toESM(require("react"), 1);
var ModalContext = (0, import_react17.createContext)(null);
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
  const handleClose = (0, import_react17.useCallback)(() => {
    modal.onClose?.();
    onClose(modal.id);
  }, [modal, onClose]);
  (0, import_react17.useEffect)(() => {
    if (modal.closable === false) return;
    const handler = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [modal.closable, handleClose]);
  return import_react17.default.createElement(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
      onClick: modal.closable !== false ? handleClose : void 0
    },
    import_react17.default.createElement(
      "div",
      {
        className: `w-full animate-[scale-in_200ms_ease-out] rounded-xl border border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] shadow-2xl ${SIZE_STYLES[modal.size || "md"]}`,
        onClick: (e) => e.stopPropagation()
      },
      (modal.title || modal.closable !== false) && import_react17.default.createElement(
        "div",
        {
          className: "flex items-center justify-between border-b border-[var(--color-border,#e9ecef)] px-6 py-4"
        },
        modal.title ? import_react17.default.createElement(
          "h2",
          {
            className: "text-lg font-semibold text-[var(--color-foreground,#212529)]"
          },
          modal.title
        ) : import_react17.default.createElement("div"),
        modal.closable !== false && import_react17.default.createElement(
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
      import_react17.default.createElement("div", { className: "p-6" }, modal.content)
    )
  );
}
function ModalProvider({ children }) {
  const [modals, setModals] = (0, import_react17.useState)([]);
  const openModal = (0, import_react17.useCallback)(
    (config) => {
      const id = config.id || `modal-${++modalCounter}`;
      const modal = { ...config, id, closable: config.closable ?? true };
      setModals((prev) => [...prev.filter((m) => m.id !== id), modal]);
      return id;
    },
    []
  );
  const closeModal = (0, import_react17.useCallback)((id) => {
    setModals((prev) => {
      if (id) return prev.filter((m) => m.id !== id);
      return prev.slice(0, -1);
    });
  }, []);
  const closeAllModals = (0, import_react17.useCallback)(() => setModals([]), []);
  const value = (0, import_react17.useMemo)(
    () => ({ openModal, closeModal, closeAllModals, activeModals: modals }),
    [openModal, closeModal, closeAllModals, modals]
  );
  return import_react17.default.createElement(
    ModalContext.Provider,
    { value },
    children,
    modals.map(
      (modal) => import_react17.default.createElement(ModalItem, {
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
  const context = (0, import_react17.useContext)(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.cjs.map