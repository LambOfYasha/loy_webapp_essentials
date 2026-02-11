import React, { type ReactNode } from "react";
import type { TableColumn, SortState, SortDirection } from "../../core/types";

export interface DataTableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  sort?: SortState;
  onSort?: (column: string, direction: SortDirection) => void;
  onRowClick?: (row: T, index: number) => void;
  emptyMessage?: string;
  loading?: boolean;
  className?: string;
  rowKey?: (row: T, index: number) => string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  sort,
  onSort,
  onRowClick,
  emptyMessage = "No data available",
  loading = false,
  className = "",
  rowKey,
}: DataTableProps<T>) {
  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable || !onSort) return;
    const direction: SortDirection =
      sort?.column === column.key && sort.direction === "asc" ? "desc" : "asc";
    onSort(column.key, direction);
  };

  const getSortIndicator = (column: TableColumn<T>): string => {
    if (!column.sortable) return "";
    if (sort?.column !== column.key) return " \u2195";
    return sort.direction === "asc" ? " \u2191" : " \u2193";
  };

  // Table wrapper
  return React.createElement(
    "div",
    { className: `loy-datatable overflow-auto rounded-lg border border-[var(--color-border,#e9ecef)] ${className}` },
    React.createElement(
      "table",
      { className: "w-full text-sm" },
      // Head
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          { className: "border-b border-[var(--color-border,#e9ecef)] bg-[var(--color-muted,#f1f3f5)]" },
          columns.map((col) =>
            React.createElement(
              "th",
              {
                key: col.key,
                className: [
                  "px-4 py-3 text-left font-medium text-[var(--color-muted-foreground,#868e96)]",
                  col.sortable ? "cursor-pointer select-none hover:text-[var(--color-foreground,#212529)]" : "",
                  col.className || "",
                ].join(" "),
                style: col.width ? { width: col.width } : undefined,
                onClick: () => handleSort(col),
              },
              col.header + getSortIndicator(col)
            )
          )
        )
      ),
      // Body
      React.createElement(
        "tbody",
        null,
        loading
          ? React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                {
                  colSpan: columns.length,
                  className: "px-4 py-12 text-center text-[var(--color-muted-foreground,#868e96)]",
                },
                "Loading..."
              )
            )
          : data.length === 0
            ? React.createElement(
                "tr",
                null,
                React.createElement(
                  "td",
                  {
                    colSpan: columns.length,
                    className: "px-4 py-12 text-center text-[var(--color-muted-foreground,#868e96)]",
                  },
                  emptyMessage
                )
              )
            : data.map((row, rowIndex) =>
                React.createElement(
                  "tr",
                  {
                    key: rowKey ? rowKey(row, rowIndex) : rowIndex,
                    className: [
                      "border-b border-[var(--color-border,#e9ecef)] last:border-b-0",
                      onRowClick ? "cursor-pointer hover:bg-[var(--color-muted,#f1f3f5)]" : "",
                    ].join(" "),
                    onClick: onRowClick ? () => onRowClick(row, rowIndex) : undefined,
                  },
                  columns.map((col) =>
                    React.createElement(
                      "td",
                      {
                        key: col.key,
                        className: `px-4 py-3 text-[var(--color-foreground,#212529)] ${col.className || ""}`,
                      },
                      col.render
                        ? (col.render(row[col.key], row) as ReactNode)
                        : (String(row[col.key] ?? "") as ReactNode)
                    )
                  )
                )
              )
      )
    )
  );
}
