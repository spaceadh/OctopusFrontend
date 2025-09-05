High-Level Context

Framework: React + Vite (micro-frontends with shell + plugins).

Styling: TailwindCSS with dark mode toggle.

State: Zustand (global auth/subs/UI) + React Query (data).

Routing: React Router DOM v6 with guards.

2. Project Structure

src/app/ → Shell app (layout, routing, auth, subscription logic).

src/modules/ → Product micro-frontends (properties, sacco, chama, lending).

src/components/ → Shared UI kit (navbar, sidebar, product switcher, toasts, loaders).

src/store/ → Zustand stores (auth, subscriptions, UI theme, i18n).

src/theme/ → Theme tokens (colors, typography, spacing).

src/locales/ → Language JSON files (en.json, fr.json, sw.json, etc.).

src/utils/ → API client, helpers.

Config: vite.config.ts, tailwind.config.js, .eslintrc.js.

3. Core Features to Generate

Authentication

Login/logout, session persistence, refresh tokens.

Global user + role + subscription state.

Authorization

Guarded routes by subscription/product access.

403 page for blocked products.

Navigation

Responsive navbar with:

Product switcher (jump between modules).

Profile menu (account, logout, settings).

Language switcher.

Dark/light theme toggle.

Sidebar (per-product menu items, collapsible).

Dashboard Layout

Shared layout with top navbar + sidebar + content pane.

Breadcrumbs support.

Modules (Plugins)

Each module lazy-loaded, self-contained: routes.tsx, pages/, components/.

Example: /properties/dashboard, /sacco/overview.

Shell decides visibility based on subscriptions[].

4. UI/UX Essentials

Theme System

Dark mode toggle (persisted in store).

Branding support → custom logos, colors, and themes per tenant.

Localization (i18n)

JSON-driven translations.

Language switcher in navbar.

Fallback to English if translation missing.

Reusable Components

Buttons (variants).

Tables (pagination, filters, export).

Modals, cards, forms (with validation).

Notifications/toasts/snackbars.

Skeleton loaders + global loading overlay.

5. Developer Experience

Dockerfile → production build.

docker-compose.yaml → integrate with backend services.

README.md → setup + dev guide.

CI/CD → GitHub Actions workflow.

ESLint + Prettier.

Mock API (for quick dev without backend).

6. Key Mentions in Prompt

When writing the actual prompt, ensure these are explicit:

"Create a React + Vite micro-frontend scaffold with a shell app and plugin modules."

"Include global auth + subscription store with guarded routes."

"Provide a navbar with product switcher, profile menu, dark mode toggle, and language switcher."

"Support multi-language (i18n) with JSON-based translations."

"Allow custom branding: logo, theme colors, tenant styles."

"Each product module is lazy-loaded and exposes its own routes."

"Include Dockerfile, docker-compose, README, linting, and CI/CD configs."