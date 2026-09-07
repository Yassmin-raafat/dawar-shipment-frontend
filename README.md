# Dawar Shipment Frontend

Next.js App Router with TypeScript, Tailwind CSS, Axios, and TanStack Query.

## Development

Run npm install, then npm run dev. Edit src/app/page.tsx for the home page.
Set NEXT_PUBLIC_API_URL in .env.local to the backend URL provided by the team.
This value is public browser configuration; do not put secrets in it.

## Structure

- src/app: routes, root layout, and global styles.
- src/components/ui: shared UI building blocks.
- src/components/layout: shared navigation and page layout components.
- src/features/auth and src/features/shipments: feature-specific components and logic.
- src/hooks: hooks reused across features.
- src/lib: configured libraries (Axios and QueryProvider).
- src/services: API request functions using the shared Axios instance.
- src/types: types shared across features.
- src/utils: shared pure utility functions.
- public: static assets.

Use @/ to import from src/. Keep feature-specific code in its feature folder;
move it to a shared folder only when reused. The root layout mounts QueryProvider.
.gitkeep files preserve the initial empty folders in Git.

## Checks

- npm run typecheck
- npm run lint
- npm run build

The starter page remains in place until the shipment screens are implemented.
