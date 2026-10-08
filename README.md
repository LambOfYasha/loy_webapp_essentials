# @lambofyasha/loy-webapp-essentials

Internal NPM package for **Lamb Of Yasha Software** — a comprehensive toolkit of utilities, hooks, UI components, and a theme system for Next.js + Tailwind + shadcn webapps.

## Installation

```bash
npm install @lambofyasha/loy-webapp-essentials
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
import { ... } from "@lambofyasha/loy-webapp-essentials/core"   // Pure logic, no React
import { ... } from "@lambofyasha/loy-webapp-essentials/hooks"   // React hooks
import { ... } from "@lambofyasha/loy-webapp-essentials/ui"      // React + Tailwind components
import { ... } from "@lambofyasha/loy-webapp-essentials/theme"   // Tailwind preset & tokens
```

---

## `core` — Utilities & Pure Logic

Works in frontend, backend, and scripts. Zero React dependency.

### API Client

```ts
import { createApiClient } from "@lambofyasha/loy-webapp-essentials/core"

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
import { buildPaginationParams, buildPaginatedResponse, getOffset } from "@lambofyasha/loy-webapp-essentials/core"
```

### Error System

```ts
import { AppError } from "@lambofyasha/loy-webapp-essentials/core"

throw new AppError("NOT_FOUND", "User not found", { userId: "123" })

// Error codes: BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND,
// CONFLICT, VALIDATION_ERROR, RATE_LIMITED, INTERNAL_ERROR, SERVICE_UNAVAILABLE, TIMEOUT
```

### Validators

```ts
import { isValidEmail, validatePassword, isValidPhone, isValidUrl, isNonEmpty } from "@lambofyasha/loy-webapp-essentials/core"

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
} from "@lambofyasha/loy-webapp-essentials/core"

formatCurrency(29.99)            // "$29.99"
formatRelativeTime(someDate)     // "3h ago"
slugify("Hello World!")          // "hello-world"
initials("Lamb Of Yasha")       // "LO"
maskEmail("user@example.com")   // "u**r@example.com"
```

### Auth Helpers

```ts
import { hasRole, can, canAny, guard, isAuthenticated } from "@lambofyasha/loy-webapp-essentials/core"

hasRole(user, "ADMIN")       // true/false
can(user, "DELETE_USERS")    // true/false
guard(user, { requireRoles: ["ADMIN"], redirectTo: "/unauthorized" })
```

### Async Helpers

```ts
import { sleep, debounce, throttle, retry, withTimeout, settled } from "@lambofyasha/loy-webapp-essentials/core"

await retry(() => fetchData(), { attempts: 3, backoff: true })
await withTimeout(longOperation(), 5000, "Took too long")
```

### Security

```ts
import { sanitizeHtml, sanitizeObject, stripTags, createRateLimiter, generateCsrfToken } from "@lambofyasha/loy-webapp-essentials/core"

const limiter = createRateLimiter(100, 60_000) // 100 req/min
limiter.check("user-123") // { allowed: true, remaining: 99, resetAt: ... }
```

### Logging & Event Tracking

```ts
import { createLogger, createEventTracker } from "@lambofyasha/loy-webapp-essentials/core"

const log = createLogger({ context: "PaymentService", level: "debug" })
log.info("Payment processed", { amount: 99.99 })

const tracker = createEventTracker()
tracker.track("button_click", { page: "/dashboard" }, userId)
```

### Config & Feature Flags

```ts
import { env, envNumber, envBool, envUrl, createFeatureFlags } from "@lambofyasha/loy-webapp-essentials/core"

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
import { AuthProvider, useAuth } from "@lambofyasha/loy-webapp-essentials/hooks"

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
import { ThemeProvider, useTheme } from "@lambofyasha/loy-webapp-essentials/hooks"

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
import { AppLayout, DashboardLayout, AuthLayout } from "@lambofyasha/loy-webapp-essentials/ui"

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
import { Sidebar, Header, Breadcrumbs } from "@lambofyasha/loy-webapp-essentials/ui"

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
import { LoadingState, EmptyState, ErrorState, LoadingOverlay } from "@lambofyasha/loy-webapp-essentials/ui"

<LoadingState message="Fetching data..." size="lg" />
<EmptyState title="No users" description="Create your first user" action={<button>Add User</button>} />
<ErrorState title="Failed to load" message={error} retry={() => refetch()} />
<LoadingOverlay visible={isSaving} message="Saving changes..." />
```

### Data Display

```tsx
import { DataTable, PaginationFooter } from "@lambofyasha/loy-webapp-essentials/ui"

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
import { ConfirmDialog, DeleteDialog, CopyToClipboard, ToastProvider, useToast, ModalProvider, useModal } from "@lambofyasha/loy-webapp-essentials/ui"

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
  presets: [require("@lambofyasha/loy-webapp-essentials/tailwind-preset")],
  // ...your config
}
```

### Color Tokens & CSS Variables

```ts
import { colors, lightTheme, darkTheme, generateThemeStylesheet } from "@lambofyasha/loy-webapp-essentials/theme"

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

---

## 🚀 Getting Started

### New Projects

1. **Initialize your Next.js app with Sanity.io**
   ```bash
   # Create Next.js app
   npx create-next-app@latest my-app --typescript --tailwind --eslint
   cd my-app
   
   # Initialize Sanity.io (optional backend)
   npm create sanity@latest -- --project-id <your-project-id> --dataset production
   # Or use existing Sanity project: npx @sanity/cli init
   ```

2. **Install the package**
   ```bash
   npm install @lambofyasha/loy-webapp-essentials
   ```

3. **Configure Tailwind**
   ```js
   // tailwind.config.js
   module.exports = {
     presets: [require("@lambofyasha/loy-webapp-essentials/tailwind-preset")],
     content: [
       "./src/**/*.{js,ts,jsx,tsx,mdx}",
       "./node_modules/@lambofyasha/loy-webapp-essentials/dist/**/*.{js,cjs}",
     ],
     darkMode: "class",
   };
   ```

4. **Add global CSS variables**
   ```css
   /* app/globals.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   :root {
     --color-background: #ffffff;
     --color-foreground: #212529;
     --color-card: #ffffff;
     --color-primary: #4c6ef5;
     --color-muted: #f1f3f5;
     --color-muted-foreground: #868e96;
     --color-border: #e9ecef;
     --color-destructive: #fa5252;
     --color-success: #40c057;
     --color-warning: #fab005;
     --color-info: #228be6;
   }

   .dark {
     --color-background: #1a1b1e;
     --color-foreground: #e9ecef;
     --color-card: #25262b;
     --color-primary: #748ffc;
     --color-muted: #2c2e33;
     --color-muted-foreground: #909296;
     --color-border: #373a40;
     --color-destructive: #ff6b6b;
     --color-success: #51cf66;
     --color-warning: #fcc419;
     --color-info: #4dabf7;
   }
   ```

5. **Wrap your app with providers**
   ```tsx
   // app/layout.tsx
   import { ToastProvider, ModalProvider, ThemeProvider } from "@lambofyasha/loy-webapp-essentials/ui";

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en" suppressHydrationWarning>
         <body>
           <ThemeProvider defaultTheme="system">
             <ToastProvider position="top-right">
               <ModalProvider>
                 {children}
               </ModalProvider>
             </ToastProvider>
           </ThemeProvider>
         </body>
       </html>
     );
   }
   ```

### Existing Projects (Migration)

#### Gradual Migration Strategy

1. **Phase 1: Install and configure**
   ```bash
   npm install @lambofyasha/loy-webapp-essentials
   ```
   Add the Tailwind preset and CSS variables (see New Projects steps 3-4).

2. **Phase 2: Replace utilities**
   - Replace `fetch` calls with `createApiClient` from `core`
   - Replace formatters with our `formatCurrency`, `formatDate`, etc.
   - Replace validators with `isValidEmail`, `validatePassword`

3. **Phase 3: Add hooks**
   - Replace `useState` + `useEffect` for localStorage with `useLocalStorage`
   - Replace manual debouncing with `useDebounce`
   - Add `useApi` for data fetching
   - Add `useAuth` for authentication context

4. **Phase 4: Component replacement**
   - Replace custom loading states with `LoadingState`
   - Replace data tables with `DataTable`
   - Add toast notifications with `ToastProvider`/`useToast`
   - Replace modals with `ModalProvider`/`useModal`

5. **Phase 5: Layout migration**
   - Replace app layouts with `DashboardLayout`, `AuthLayout`
   - Replace navigation with `Sidebar`, `Header`, `Breadcrumbs`

#### Migration Checklist

- [ ] Install package and configure Tailwind preset
- [ ] Add CSS variables to global styles
- [ ] Wrap app with providers (Toast, Modal, Theme)
- [ ] Replace API calls with core client
- [ ] Replace formatters/validators
- [ ] Add hooks (localStorage, debounce, api, auth)
- [ ] Replace UI components (states, tables, dialogs)
- [ ] Migrate layouts and navigation
- [ ] Test all functionality
- [ ] Remove old code that was replaced

---

## 📦 Publishing to NPM

### Preparation

1. **Build the package**
   ```bash
   npm run build
   ```

2. **Verify the build**
   ```bash
   ls dist/  # Should contain .js, .cjs, .d.ts files
   ```

3. **Update version (see Version Management below)**
   ```bash
   npm version patch  # or minor/major
   ```

### Publishing

1. **Login to NPM (first time only)**
   ```bash
   npm login
   ```

2. **Publish to NPM**
   ```bash
   npm publish
   ```

3. **Verify publishing**
   ```bash
   npm view @lambofyasha/loy-webapp-essentials
   ```

### Private Package (Internal Only)

If this should remain private to Lamb Of Yasha:

1. **Configure package.json**
   ```json
   {
     "publishConfig": {
       "registry": "https://npm.pkg.github.com"
     }
   }
   ```

2. **Publish to GitHub Packages**
   ```bash
   npm publish
   ```

3. **Install in other repos**
   ```bash
   # Set NODE_AUTH_TOKEN in your shell or CI secret store first.
   npm config set @lambofyasha:registry https://npm.pkg.github.com
   npm config set //npm.pkg.github.com/:_authToken "$NODE_AUTH_TOKEN"
   npm install @lambofyasha/loy-webapp-essentials@1.0.0
   ```

   Do not commit the token or a real `.env.local`; use a user-level npm config or CI secret instead.

---

## 🔢 Version Management

### Semantic Versioning (SemVer)

- **Major (X.0.0)**: Breaking changes
  - Removing or renaming exports
  - Changing function signatures
  - Required peer dependency updates
  
- **Minor (0.X.0)**: New features (backwards compatible)
  - Adding new exports
  - Adding optional parameters
  - New components/hooks

- **Patch (0.0.X)**: Bug fixes (backwards compatible)
  - Fixing implementation bugs
  - Type fixes
  - Documentation updates

### Version Management Workflow

1. **Development phase**
   ```bash
   # Work on features/fixes
   git checkout -b feature/new-hook
   # ...make changes...
   git commit -m "feat: add useWebSocket hook"
   ```

2. **Before release**
   ```bash
   # Ensure tests pass
   npm run build
   npm run typecheck
   npm run lint  # if you have linting
   ```

3. **Version bump**
   ```bash
   # Choose based on change type
   npm version patch   # 1.0.0 → 1.0.1 (bug fix)
   npm version minor   # 1.0.0 → 1.1.0 (new feature)
   npm version major   # 1.0.0 → 2.0.0 (breaking change)
   ```

4. **Release**
   ```bash
   git push --follow-tags
   npm publish
   ```

### Automated Versioning (Recommended)

For teams, consider using `changesets`:

1. **Install changesets**
   ```bash
   npm install @changesets/cli -D
   ```

2. **Initialize**
   ```bash
   npx changeset init
   ```

3. **Add changeset for each PR**
   ```bash
   npx changeset
   # Choose version type and describe changes
   ```

4. **Version and publish**
   ```bash
   npx changeset version
   npx changeset publish
   ```

### Breaking Change Guidelines

When making breaking changes:

1. **Deprecate first** (if possible)
   ```ts
   /** @deprecated Use newFunction instead */
   export function oldFunction() { ... }
   export function newFunction() { ... }
   ```

2. **Document clearly in CHANGELOG**
   ```markdown
   ## [2.0.0] - 2024-01-15
   
   ### BREAKING CHANGES
   - `useApi` now requires explicit `immediate` option
   - Removed `createApiClient` default timeout
   ```

3. **Consider migration guide**
   ```markdown
   ### Migration from 1.x to 2.x
   
   ```ts
   // Before
   const api = createApiClient({ baseUrl });
   
   // After
   const api = createApiClient({ baseUrl, timeout: 10000 });
   ```
   ```

---

## 🏗️ Architecture Decisions

### Why Subpath Exports?

```json
{
  "exports": {
    "./core": { "types": "./dist/core/index.d.ts", "import": "./dist/core/index.js", "require": "./dist/core/index.cjs" },
    "./hooks": { "types": "./dist/hooks/index.d.ts", "import": "./dist/hooks/index.js", "require": "./dist/hooks/index.cjs" }
  }
}
```

- **Tree-shaking**: Only import what you need
- **Clear boundaries**: Core (no React) vs Hooks (React) vs UI (React + Tailwind)
- **Future-proofing**: Can extract modules to separate packages later

### Why Tailwind Preset?

- **Consistency**: All projects use same design tokens
- **Upgradability**: Update colors/spacing in one place
- **Optional**: Projects can override or extend the preset

### Why Peer Dependencies?

- **Bundle size**: Don't ship React/Tailwind in the package
- **Version control**: Projects choose their React/Next versions
- **Compatibility**: Works with React 18+ and Next 14+

---

## 🧪 Testing the Package

### Local Testing

1. **Link local package**
   ```bash
   # In package directory
   npm link
   
   # In test app directory
   npm link @lambofyasha/loy-webapp-essentials
   ```

2. **Or use file: protocol (like prototype)**
   ```json
   {
     "dependencies": {
       "@lambofyasha/loy-webapp-essentials": "file:../loy_webapp_essentials"
     }
   }
   ```

### Before Publishing Checklist

- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` passes
- [ ] All exports work in test app
- [ ] Documentation is up to date
- [ ] Version follows SemVer rules
- [ ] CHANGELOG updated for significant changes
- [ ] No sensitive data in package files

---

## 🤝 Contributing

### Development Workflow

1. **Fork and clone**
   ```bash
   git clone https://github.com/LambOfYasha/loy_webapp_essentials.git
   cd loy_webapp_essentials
   npm install
   ```

2. **Create branch**
   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make changes**
   - Add tests for new features
   - Update documentation
   - Ensure TypeScript types are correct

4. **Test locally**
   ```bash
   npm run build
   npm link
   # Test in prototype app
   ```

5. **Submit PR**
   - Describe what changed
   - Link to any issues
   - Include screenshots for UI changes

### Code Style

- **TypeScript**: Strict mode enabled
- **No dependencies**: Core module has zero external deps
- **React components**: Use functional components with hooks
- **Tailwind classes**: Use CSS variables for colors
- **Documentation**: JSDoc comments for public APIs

---

## 📚 Additional Resources

- **Next.js App Router**: [Next.js docs](https://nextjs.org/docs/app)
- **Tailwind CSS**: [Tailwind docs](https://tailwindcss.com/docs)
- **Semantic Versioning**: [semver.org](https://semver.org/)
- **NPM Publishing**: [NPM docs](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- **Changesets**: [changesets.dev](https://changesets.dev/)

## License

MIT - Lamb Of Yasha Software
