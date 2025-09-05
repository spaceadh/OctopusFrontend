# Enterprise SaaS Platform - Frontend

This is the frontend for the Enterprise SaaS Platform, a multi-product application built with a micro-frontend architecture.

## Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** TailwindCSS with Dark/Light mode
- **UI Components:** shadcn/ui
- **State Management:**
  - **Global State:** Zustand (for auth, subscriptions, UI settings)
  - **Server State:** React Query (for API caching and data fetching)
- **Routing:** React Router DOM v6
- **Forms:** React Hook Form + Yup
- **i18n:** i18next

## Directory Structure

- `src/app`: Core application shell (layout, routing, providers).
- `src/modules`: Micro-frontend modules for each product (e.g., `properties`, `sacco`).
- `src/components`: Shared UI components.
- `src/store`: Zustand stores for global state.
- `src/theme`: Theming configuration and tokens.
- `src/locales`: JSON files for internationalization.
- `src/utils`: Utility functions and API client.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker (optional, for running with Docker)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

To start the Vite development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Building for Production

To create a production build, run:

```bash
npm run build
```

The optimized static assets will be placed in the `dist/` directory.

## Running with Docker

This project includes a `Dockerfile` and `docker-compose.yml` for running the application in a container.

1.  **Build the Docker image:**
    ```bash
    docker-compose build
    ```

2.  **Run the container:**
    ```bash
    docker-compose up
    ```

The application will be served by Nginx and available at `http://localhost:8080`.

## Key Features

- **Micro-frontend Architecture:** Each product module is self-contained, allowing for independent development and deployment.
- **Subscription-based Access:** Routes are protected based on the user's subscriptions.
- **Theming:** Dark and light mode support, with the theme preference persisted in local storage.
- **Localization:** Support for multiple languages (English, Swahili, French).
- **Reusable Components:** A rich set of UI components built with shadcn/ui.
