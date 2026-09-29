# @lambofyasha/loy-webapp-essentials

UI, hooks, and pure helpers for LOY Next.js apps. Version 1.1.0.

This package does not talk to a database. Editorial rows and community documents belong in [`@lambofyasha/loy-dual-store`](https://github.com/LambOfYasha/loy-dual-store): Postgres for blogs, lessons, pages, tags, and media; Mongo for communities, posts, comments, and profiles; Clerk for sign-in. Do not start a new app on Sanity.

## Install

```ini
# .npmrc
@lambofyasha:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

`NODE_AUTH_TOKEN` is a GitHub personal access token with `read:packages`. Do not commit the token.

```bash
npm install @lambofyasha/loy-webapp-essentials
```

React 18 or 19 is required. Next and Tailwind are optional peers. Tailwind apps also install `tailwindcss`.

## Entry points

```ts
import { createApiClient, slugify } from "@lambofyasha/loy-webapp-essentials/core";
import { AuthProvider, useAuth, ThemeProvider, useTheme } from "@lambofyasha/loy-webapp-essentials/hooks";
import { DashboardLayout, ToastProvider, useToast } from "@lambofyasha/loy-webapp-essentials/ui";
import { generateThemeStylesheet } from "@lambofyasha/loy-webapp-essentials/theme";
```

`core` has no React dependency. `ThemeProvider` is a hook export, not a UI export.

## App shell

```js
// tailwind.config.js
module.exports = {
  presets: [require("@lambofyasha/loy-webapp-essentials/tailwind-preset")],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@lambofyasha/loy-webapp-essentials/dist/**/*.{js,cjs}",
  ],
  darkMode: "class",
};
```

```tsx
// app/layout.tsx
import { ThemeProvider } from "@lambofyasha/loy-webapp-essentials/hooks";
import { ModalProvider, ToastProvider } from "@lambofyasha/loy-webapp-essentials/ui";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system">
          <ToastProvider position="top-right">
            <ModalProvider>{children}</ModalProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Generate the color variables once with `generateThemeStylesheet()` from `theme`, or keep the `:root` and `.dark` blocks from `src/theme/css-variables.ts`.

## core

| Area | Exports |
| --- | --- |
| HTTP | `createApiClient` |
| Pages | `buildPaginationParams`, `buildPaginatedResponse`, `getOffset` |
| Errors | `AppError` |
| Checks | `isValidEmail`, `validatePassword`, `isValidPhone`, `isValidUrl`, `isNonEmpty`, `isValidHexColor` |
| Text | `formatPhone`, `formatDate`, `formatRelativeTime`, `formatCurrency`, `formatNumber`, `formatCompactNumber`, `formatBytes`, `slugify`, `truncate`, `capitalize`, `titleCase`, `initials`, `safeJsonParse`, `maskEmail`, `maskPhone` |
| Async | `sleep`, `debounce`, `throttle`, `retry`, `withTimeout`, `settled` |
| Roles | `hasRole`, `hasAnyRole`, `hasAllRoles`, `can`, `canAny`, `canAll`, `isAuthenticated`, `guard` |
| Security | `sanitizeHtml`, `sanitizeObject`, `stripTags`, `createRateLimiter`, `generateCsrfToken`, `constantTimeCompare` |
| Logs | `createLogger`, `logger`, `createEventTracker` |
| Env | `env`, `envOptional`, `envNumber`, `envBool`, `envList`, `envUrl`, `createFeatureFlags`, `defineConstants` |

```ts
const api = createApiClient({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  getAuthToken: () => sessionToken,
});

throw new AppError("NOT_FOUND", "Profile missing", { clerkId });
```

## hooks

`AuthProvider`, `useAuth`, `useApi`, `useDebounce`, `useDebouncedCallback`, `useLocalStorage`, `usePagination`, `useSocket`, `ThemeProvider`, `useTheme`, `usePermissions`.

`useAuth` is an in-memory session for apps that bring their own login. It does not replace Clerk. On LIFE, Clerk stays the sign-in system. Read the member profile from Mongo through `@lambofyasha/loy-dual-store`.

## ui

Layouts: `AppLayout`, `DashboardLayout`, `AuthLayout`.

Navigation: `Sidebar`, `Header`, `Breadcrumbs`.

States: `LoadingState`, `EmptyState`, `ErrorState`, `LoadingOverlay`.

Data: `DataTable`, `PaginationFooter`.

UX: `ConfirmDialog`, `DeleteDialog`, `CopyToClipboard`, `ToastProvider`, `useToast`, `ModalProvider`, `useModal`.

Components use Tailwind classes and the theme CSS variables (`--color-background`, `--color-primary`, and the rest of the preset).

## theme

`colors`, `lightTheme`, `darkTheme`, `generateThemeStylesheet`, `loyTailwindPreset`, plus typography, spacing, radius, shadow, and animation tokens.

Palettes: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `neutral`, shades 50–950.

## Where data goes

| Concern | Package | Store |
| --- | --- | --- |
| Buttons, tables, toasts, formatters | this package | none |
| Blogs, lessons, pages, tags, media | Payload, or your own SQL | Postgres |
| Communities, posts, comments, profiles | `@lambofyasha/loy-dual-store` | Mongo |
| Sign-in | Clerk | Clerk |

Do not mirror a document into both databases. The dual-store package throws if a known editorial name is written to Mongo, or a known community name is written to Postgres.

## Scripts

```bash
npm run build
npm run typecheck
```

`prepublishOnly` builds before `npm publish`. The registry in `publishConfig` is GitHub Packages, not the public npm registry.

```bash
NODE_AUTH_TOKEN=... npm publish
```

## Layout

```
src/core     pure logic
src/hooks    React hooks
src/ui       Tailwind components
src/theme    tokens and the preset
```

Dependency direction: `core` ← `hooks` ← `ui` ← the app. Neither `core` nor `ui` imports a database driver.
