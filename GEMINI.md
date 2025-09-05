Prompt:
```
I want you to scaffold a React + Vite frontend platform that follows a micro-frontend architecture with a shell + plugin model.
The platform should support multi-product experiences (e.g., properties, sacco, chama, lending) where the shell controls navigation, authentication, authorization, and subscriptions, and each product module is self-contained.
```
✅ Requirements
1. Project Setup
```
Tech stack:

React 18

Vite

TypeScript

TailwindCSS

Zustand (global state: auth, subscription, UI settings)

React Query (server state + API caching)

React Router DOM v6 (routing, protected routes)
```
2. Directory Structure
```
Use this structure (scaffold empty files where appropriate):

src/
  app/
    App.tsx
    routes.tsx
    layout/
      DashboardLayout.tsx
    providers/
      AuthProvider.tsx
      QueryProvider.tsx
  modules/
    properties/
      routes.tsx
      pages/
      components/
    sacco/
      routes.tsx
      pages/
      components/
    chama/
      routes.tsx
      pages/
      components/
    lending/
      routes.tsx
      pages/
      components/
  components/
    Navbar.tsx
    Sidebar.tsx
    ProductSwitcher.tsx
    ThemeToggle.tsx
    LanguageSwitcher.tsx
    Loader.tsx
    Toast.tsx
  store/
    authStore.ts
    subscriptionStore.ts
    uiStore.ts
  theme/
    index.ts
    tokens.ts
  locales/
    en.json
    sw.json
    fr.json
  utils/
    apiClient.ts
    helpers.ts
vite.config.ts
tailwind.config.js
Dockerfile
docker-compose.yml
README.md
```

3. Authentication & Authorization
```
Login, logout, refresh token handling.

Zustand authStore stores user, roles, subscriptions.

Route guards that check both login state and subscription access.

Example: /properties/dashboard is only visible if subscriptions includes "PROPERTIES".
```
4. Navigation & Layout
```
Navbar:

Product switcher (jump between properties, sacco, etc.).

Profile dropdown (account, logout).

Dark/light theme toggle.

Language switcher.

Sidebar:

Each product module defines its own nav items.

Collapsible, responsive.

Dashboard Layout:

Shared shell layout with Navbar + Sidebar + content.

Breadcrumbs.
```
5. Theming & Branding
```
TailwindCSS dark/light mode toggle, persisted in uiStore.

Configurable themes:

Colors, typography, spacing defined in theme/tokens.ts.

Tenant-specific branding (custom logo + theme override).
```
6. Localization (i18n)
```
JSON-based translations stored in src/locales.

Support English (en), Swahili (sw), French (fr).

Global i18n provider.

Language switcher in navbar.
```
7. Reusable Components
```
Generate:

Buttons (variants).

Cards.

Tables (sortable, paginated).

Forms (with validation via react-hook-form + yup).

Toast notifications.

Skeleton loaders + global loading overlay.
```
8. Developer Experience
```
Dockerfile → production-ready build.

docker-compose.yml → runs frontend + backend services.

README.md → setup, development, deployment instructions.

GitHub Actions workflow for lint + build.

ESLint + Prettier config.

Mock API mode for frontend-only dev.
```
9. Example Flow
```
User logs in → token + subscriptions stored in Zustand.

Navbar shows only products the user has access to.

User clicks “Properties” → routed to /properties/dashboard.

Properties module lazy loads its routes + components.

Sidebar updates to show property-specific nav items.
```
🎯 Deliverable
```
Generate the initial scaffold with:
1. The proposed directory structure.
2. Boilerplate code for App.tsx, Navbar, Sidebar, AuthStore, ThemeToggle, LanguageSwitcher, ProductSwitcher.
Example subscription-guarded route (e.g., /properties/dashboard).

Example localization usage (t("dashboard.title")).

Basic dark/light theme toggle.

Docker + Compose configs.

README with setup + run instructions.
```
```
⚡ Build it modular, extensible, and enterprise-grade — so that multiple teams can work on different product modules in parallel without stepping on each other.
```