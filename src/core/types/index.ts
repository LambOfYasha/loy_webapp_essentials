// Common shared types used across packages

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Nullable<T> = T | null;
export type Maybe<T> = T | null | undefined;

export type AsyncFunction<T = void> = () => Promise<T>;

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiListResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
  children?: NavItem[];
  roles?: string[];
  permissions?: string[];
}

export interface TableColumn<T = unknown> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => unknown;
  className?: string;
  width?: string;
}

export type SortDirection = "asc" | "desc";

export interface SortState {
  column: string;
  direction: SortDirection;
}

export type Status = "idle" | "loading" | "success" | "error";

export interface AsyncState<T> {
  data: T | null;
  status: Status;
  error: string | null;
}

export type ColorVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "muted";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
