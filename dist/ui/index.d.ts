import React, { ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    sidebar?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
    sidebarWidth?: string;
    className?: string;
}
declare function AppLayout({ children, sidebar, header, footer, sidebarWidth, className, }: AppLayoutProps): React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;

interface DashboardLayoutProps {
    children: ReactNode;
    sidebar?: ReactNode;
    header?: ReactNode;
    pageTitle?: string;
    pageDescription?: string;
    actions?: ReactNode;
    className?: string;
}
declare function DashboardLayout({ children, sidebar, header, pageTitle, pageDescription, actions, className, }: DashboardLayoutProps): React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;

interface AuthLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    logo?: ReactNode;
    footer?: ReactNode;
    className?: string;
    maxWidth?: string;
}
declare function AuthLayout({ children, title, description, logo, footer, className, maxWidth, }: AuthLayoutProps): React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;

interface BreadcrumbItem {
    label: string;
    href?: string;
}
interface NavItem {
    label: string;
    href: string;
    icon?: string;
    badge?: string | number;
    children?: NavItem[];
    roles?: string[];
    permissions?: string[];
}
interface TableColumn<T = unknown> {
    key: string;
    header: string;
    sortable?: boolean;
    render?: (value: unknown, row: T) => unknown;
    className?: string;
    width?: string;
}
type SortDirection = "asc" | "desc";
interface SortState {
    column: string;
    direction: SortDirection;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    separator?: string;
    className?: string;
}
declare function Breadcrumbs({ items, separator, className, }: BreadcrumbsProps): React.DetailedReactHTMLElement<{
    "aria-label": string;
    className: string;
}, HTMLElement>;

interface SidebarProps {
    items: NavItem[];
    header?: ReactNode;
    footer?: ReactNode;
    activeHref?: string;
    onNavigate?: (href: string) => void;
    collapsed?: boolean;
    className?: string;
}
declare function Sidebar({ items, header, footer, activeHref, onNavigate, className, }: SidebarProps): React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;

interface HeaderProps {
    logo?: ReactNode;
    title?: string;
    nav?: ReactNode;
    actions?: ReactNode;
    className?: string;
    sticky?: boolean;
}
declare function Header({ logo, title, nav, actions, className, sticky, }: HeaderProps): React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;

interface LoadingStateProps {
    message?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}
declare function LoadingState({ message, size, className, }: LoadingStateProps): React.DetailedReactHTMLElement<{
    className: string;
    role: "status";
}, HTMLElement>;

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: ReactNode;
    action?: ReactNode;
    className?: string;
}
declare function EmptyState({ title, description, icon, action, className, }: EmptyStateProps): React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;

interface ErrorStateProps {
    title?: string;
    message?: string;
    icon?: ReactNode;
    retry?: () => void;
    retryLabel?: string;
    className?: string;
}
declare function ErrorState({ title, message, icon, retry, retryLabel, className, }: ErrorStateProps): React.DetailedReactHTMLElement<{
    className: string;
    role: "alert";
}, HTMLElement>;

interface LoadingOverlayProps {
    visible: boolean;
    message?: string;
    className?: string;
}
declare function LoadingOverlay({ visible, message, className, }: LoadingOverlayProps): React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement> | null;

interface DataTableProps<T = Record<string, unknown>> {
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
declare function DataTable<T extends Record<string, unknown>>({ columns, data, sort, onSort, onRowClick, emptyMessage, loading, className, rowKey, }: DataTableProps<T>): React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;

interface PaginationFooterProps {
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    onNext: () => void;
    onPrev: () => void;
    onFirst?: () => void;
    onLast?: () => void;
    onPageChange?: (page: number) => void;
    className?: string;
}
declare function PaginationFooter({ page, totalPages, hasNext, hasPrev, onNext, onPrev, onFirst, onLast, className, }: PaginationFooterProps): React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "danger" | "primary" | "warning";
    onConfirm: () => void;
    onCancel: () => void;
    className?: string;
}
declare function ConfirmDialog({ open, title, message, confirmLabel, cancelLabel, variant, onConfirm, onCancel, className, }: ConfirmDialogProps): React.DetailedReactHTMLElement<{
    className: string;
    onClick: () => void;
}, HTMLElement> | null;

interface DeleteDialogProps extends Omit<ConfirmDialogProps, "variant" | "confirmLabel" | "title"> {
    title?: string;
    confirmLabel?: string;
    itemName?: string;
}
declare function DeleteDialog({ title, confirmLabel, itemName, message, ...props }: DeleteDialogProps): React.FunctionComponentElement<ConfirmDialogProps>;

interface CopyToClipboardProps {
    text: string;
    children?: React.ReactNode;
    className?: string;
    copiedDuration?: number;
    onCopy?: () => void;
}
declare function CopyToClipboard({ text, children, className, copiedDuration, onCopy, }: CopyToClipboardProps): React.DetailedReactHTMLElement<{
    type: string;
    onClick: () => Promise<void>;
    className: string;
}, HTMLElement>;

type ToastVariant = "success" | "error" | "warning" | "info";
interface Toast {
    id: string;
    message: string;
    variant: ToastVariant;
    duration?: number;
    title?: string;
}
interface ToastContextValue {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => string;
    removeToast: (id: string) => void;
    clearToasts: () => void;
    success: (message: string, title?: string) => string;
    error: (message: string, title?: string) => string;
    warning: (message: string, title?: string) => string;
    info: (message: string, title?: string) => string;
}
interface ToastProviderProps {
    children: ReactNode;
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
    maxToasts?: number;
}
declare function ToastProvider({ children, position, maxToasts, }: ToastProviderProps): React.FunctionComponentElement<React.ProviderProps<ToastContextValue | null>>;
declare function useToast(): ToastContextValue;

interface ModalConfig {
    id: string;
    content: ReactNode;
    title?: string;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    closable?: boolean;
    onClose?: () => void;
}
interface ModalContextValue {
    openModal: (config: Omit<ModalConfig, "id"> & {
        id?: string;
    }) => string;
    closeModal: (id?: string) => void;
    closeAllModals: () => void;
    activeModals: ModalConfig[];
}
interface ModalProviderProps {
    children: ReactNode;
}
declare function ModalProvider({ children }: ModalProviderProps): React.FunctionComponentElement<React.ProviderProps<ModalContextValue | null>>;
declare function useModal(): ModalContextValue;

export { AppLayout, type AppLayoutProps, AuthLayout, type AuthLayoutProps, Breadcrumbs, type BreadcrumbsProps, ConfirmDialog, type ConfirmDialogProps, CopyToClipboard, type CopyToClipboardProps, DashboardLayout, type DashboardLayoutProps, DataTable, type DataTableProps, DeleteDialog, type DeleteDialogProps, EmptyState, type EmptyStateProps, ErrorState, type ErrorStateProps, Header, type HeaderProps, LoadingOverlay, type LoadingOverlayProps, LoadingState, type LoadingStateProps, type ModalConfig, type ModalContextValue, ModalProvider, type ModalProviderProps, PaginationFooter, type PaginationFooterProps, Sidebar, type SidebarProps, type Toast, type ToastContextValue, ToastProvider, type ToastProviderProps, type ToastVariant, useModal, useToast };
