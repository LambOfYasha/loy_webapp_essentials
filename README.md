# loy-webapp-essentials

Internal NPM package for **Lamb Of Yasha Software** — a comprehensive toolkit of utilities, hooks, UI components, and a theme system for Next.js + Tailwind + shadcn webapps.

## Installation

```bash
npm install loy-webapp-essentials
```

**Peer dependencies** (install alongside):

```bash
npm install react react-dom
# Optional:
npm install next tailwindcss
```

## Package Modules

Import from four subpath entry points:

```ts
import { ... } from "loy-webapp-essentials/core"   // Pure logic, no React
import { ... } from "loy-webapp-essentials/hooks"   // React hooks
import { ... } from "loy-webapp-essentials/ui"      // React + Tailwind components
import { ... } from "loy-webapp-essentials/theme"   // Tailwind preset & tokens
```

---

## `core` — Utilities & Pure Logic

Works in frontend, backend, and scripts. Zero React dependency.

### API Client

```ts
import { createApiClient } from "loy-webapp-essentials/core"

const api = createApiClient({
  baseUrl: "https://api.example.com",
  getAuthToken: () => localStorage.getItem("token"),
  retries: 2,
  timeout: 10000,
})

const { data } = await api.get("/users", { params: { page: 1, limit: 20 } })
await api.post("/tickets", { title: "Bug report" })
```

### Pagination Helpers

```ts
import { buildPaginationParams, buildPaginatedResponse, getOffset } from "loy-webapp-essentials/core"
```

### Error System

```ts
import { AppError } from "loy-webapp-essentials/core"

throw new AppError("NOT_FOUND", "User not found", { userId: "123" })

// Error codes: BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND,
// CONFLICT, VALIDATION_ERROR, RATE_LIMITED, INTERNAL_ERROR, SERVICE_UNAVAILABLE, TIMEOUT
```

### Validators

```ts
import { isValidEmail, validatePassword, isValidPhone, isValidUrl, isNonEmpty } from "loy-webapp-essentials/core"

validatePassword("MyP@ss1", { minLength: 8, requireSpecial: true })
// => { valid: false, score: 4, issues: ["Must be at least 8 characters"] }
```

### Formatters

```ts
import {
  formatPhone, formatDate, formatRelativeTime, formatCurrency,
  formatNumber, formatCompactNumber, formatBytes,
  slugify, truncate, capitalize, titleCase, initials,
  safeJsonParse, maskEmail, maskPhone,
} from "loy-webapp-essentials/core"

formatCurrency(29.99)            // "$29.99"
formatRelativeTime(someDate)     // "3h ago"
slugify("Hello World!")          // "hello-world"
initials("Lamb Of Yasha")       // "LO"
maskEmail("user@example.com")   // "u**r@example.com"
```

### Auth Helpers

```ts
import { hasRole, can, canAny, guard, isAuthenticated } from "loy-webapp-essentials/core"

hasRole(user, "ADMIN")       // true/false
can(user, "DELETE_USERS")    // true/false
guard(user, { requireRoles: ["ADMIN"], redirectTo: "/unauthorized" })
```

### Async Helpers

```ts
import { sleep, debounce, throttle, retry, withTimeout, settled } from "loy-webapp-essentials/core"

await retry(() => fetchData(), { attempts: 3, backoff: true })
await withTimeout(longOperation(), 5000, "Took too long")
```

### Security

```ts
import { sanitizeHtml, sanitizeObject, stripTags, createRateLimiter, generateCsrfToken } from "loy-webapp-essentials/core"

const limiter = createRateLimiter(100, 60_000) // 100 req/min
limiter.check("user-123") // { allowed: true, remaining: 99, resetAt: ... }
```

### Logging & Event Tracking

```ts
import { createLogger, createEventTracker } from "loy-webapp-essentials/core"

const log = createLogger({ context: "PaymentService", level: "debug" })
log.info("Payment processed", { amount: 99.99 })

const tracker = createEventTracker()
tracker.track("button_click", { page: "/dashboard" }, userId)
```

### Config & Feature Flags

```ts
import { env, envNumber, envBool, envUrl, createFeatureFlags } from "loy-webapp-essentials/core"

const apiUrl = envUrl("API_URL")
const port = envNumber("PORT", 3000)
const debug = envBool("DEBUG", false)

const features = createFeatureFlags({ payments: true, beta_ui: false })
features.isEnabled("payments") // true
```

---

## `hooks` — React Hooks

### useAuth & AuthProvider

```tsx
import { AuthProvider, useAuth } from "loy-webapp-essentials/hooks"

// Wrap your app
<AuthProvider onLogin={(user, token) => console.log("Logged in")}>
  <App />
</AuthProvider>

// In any component
const { user, login, logout, hasRole, can, isAuthenticated } = useAuth()
```

### useApi

```ts
const { data, isLoading, isError, error, execute } = useApi(
  (id: string) => api.get(`/users/${id}`),
  { immediate: false }
)
await execute("user-123")
```

### useDebounce

```ts
const debouncedSearch = useDebounce(searchTerm, 300)
```

### usePagination

```ts
const { page, limit, hasNext, hasPrev, nextPage, prevPage, setTotal, params } = usePagination({ initialLimit: 20 })
```

### useSocket

```ts
const { status, lastMessage, sendJson, connect, disconnect } = useSocket({
  url: "wss://api.example.com/ws",
  reconnect: true,
  onMessage: (event) => console.log(event.data),
})
```

### useLocalStorage

```ts
const [theme, setTheme, removeTheme] = useLocalStorage("theme", "light")
```

### useTheme & ThemeProvider

```tsx
import { ThemeProvider, useTheme } from "loy-webapp-essentials/hooks"

<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>

const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
```

### usePermissions

```ts
const { can, hasRole, canAny, isAuthenticated, roles } = usePermissions()
```

---

## `ui` — React Components

All components use Tailwind CSS classes and respect CSS variable theming.

### Layouts

```tsx
import { AppLayout, DashboardLayout, AuthLayout } from "loy-webapp-essentials/ui"

<DashboardLayout
  sidebar={<Sidebar items={navItems} />}
  header={<Header title="My App" />}
  pageTitle="Dashboard"
  pageDescription="Overview of your data"
  actions={<button>New Item</button>}
>
  {children}
</DashboardLayout>

<AuthLayout title="Sign In" description="Welcome back">
  <LoginForm />
</AuthLayout>
```

### Navigation

```tsx
import { Sidebar, Header, Breadcrumbs } from "loy-webapp-essentials/ui"

<Sidebar
  items={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Users", href: "/users", badge: 5 },
    { label: "Settings", href: "/settings", children: [...] },
  ]}
  activeHref="/dashboard"
  onNavigate={(href) => router.push(href)}
/>

<Breadcrumbs items={[
  { label: "Home", href: "/" },
  { label: "Users", href: "/users" },
  { label: "Edit" },
]} />
```

### Feedback States

```tsx
import { LoadingState, EmptyState, ErrorState, LoadingOverlay } from "loy-webapp-essentials/ui"

<LoadingState message="Fetching data..." size="lg" />
<EmptyState title="No users" description="Create your first user" action={<button>Add User</button>} />
<ErrorState title="Failed to load" message={error} retry={() => refetch()} />
<LoadingOverlay visible={isSaving} message="Saving changes..." />
```

### Data Display

```tsx
import { DataTable, PaginationFooter } from "loy-webapp-essentials/ui"

<DataTable
  columns={[
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", render: (val) => <Badge>{val}</Badge> },
  ]}
  data={users}
  sort={sort}
  onSort={handleSort}
  onRowClick={(row) => router.push(`/users/${row.id}`)}
/>
```

### UX Helpers

```tsx
import { ConfirmDialog, DeleteDialog, CopyToClipboard, ToastProvider, useToast, ModalProvider, useModal } from "loy-webapp-essentials/ui"

// Toast system
<ToastProvider position="top-right">
  <App />
</ToastProvider>

const toast = useToast()
toast.success("Saved!")
toast.error("Something went wrong")

// Modal system
<ModalProvider>
  <App />
</ModalProvider>

const { openModal, closeModal } = useModal()
openModal({ title: "Edit User", content: <EditForm /> })

// Dialogs
<ConfirmDialog open={open} message="Proceed?" onConfirm={handleConfirm} onCancel={handleCancel} />
<DeleteDialog open={open} itemName="John Doe" onConfirm={handleDelete} onCancel={handleCancel} />
```

---

## `theme` — Tailwind Preset & Tokens

### Tailwind Config

```js
// tailwind.config.js
module.exports = {
  presets: [require("loy-webapp-essentials/tailwind-preset")],
  // ...your config
}
```

### Color Tokens & CSS Variables

```ts
import { colors, lightTheme, darkTheme, generateThemeStylesheet } from "loy-webapp-essentials/theme"

// Generate CSS for your global stylesheet
const css = generateThemeStylesheet()
// Outputs :root { ... } .dark { ... }
```

### Available Palettes

`primary`, `secondary`, `success`, `danger`, `warning`, `info`, `neutral` — each with 50-950 shades.

---

## Architecture

```
src/
  core/        # Pure logic — NO React dependency
    api/       # Fetch client, pagination
    errors/    # AppError
    validators/# Email, password, phone, URL
    formatters/# Date, currency, phone, slug, etc.
    async/     # sleep, debounce, throttle, retry
    auth/      # Roles, permissions, guards
    security/  # Sanitize, rate limiter, CSRF
    logging/   # Logger, event tracker
    config/    # Env reader, feature flags
    types/     # Shared TypeScript types
  hooks/       # React hooks (depends on core)
  ui/          # React components (depends on core)
    layouts/   # AppLayout, DashboardLayout, AuthLayout
    navigation/# Sidebar, Header, Breadcrumbs
    feedback/  # Loading, Empty, Error states
    data-display/ # DataTable, PaginationFooter
    ux/        # Toast, Modal, Confirm/Delete dialog, Copy
  theme/       # Tailwind preset, tokens, CSS variables
```

**Dependency flow:** `core` <- `hooks` <- `ui` <- your app

---

## Building

```bash
npm run build    # Build all entry points
npm run dev      # Watch mode
npm run typecheck # Type checking
```

## License

MIT - Lamb Of Yasha Software
