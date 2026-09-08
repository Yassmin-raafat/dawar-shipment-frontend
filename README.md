# Dawar Shipment Frontend

Next.js App Router with TypeScript, Tailwind CSS, Axios, and TanStack Query.

## Development

Run `npm install`, then `npm run dev`.

Set `NEXT_PUBLIC_API_URL` in `.env.local` to the backend URL provided by the team.

This value is public browser configuration, so do not put secrets in it.

## Structure

- `src/app`: routes, root layout, and global styles.
- `src/components/ui`: shared UI building blocks.
- `src/components/layout`: shared navigation and page layout components.
- `src/features/auth`: authentication-related components and logic.
- `src/features/shipments`: shipment-related components and logic.
- `src/hooks`: hooks reused across features.
- `src/lib`: configured libraries such as Axios and QueryProvider.
- `src/services`: API request and storage helper functions.
- `src/types`: types shared across features.
- `src/utils`: shared pure utility functions.
- `public`: static assets.

Use `@/` to import from `src/`.

Keep feature-specific code inside its feature folder. Move code to a shared folder only when it is reused.

The root layout mounts `QueryProvider`.

`.gitkeep` files preserve initially empty folders in Git.

## Authentication

The frontend currently includes:

- Login and signup pages based on the project design.
- Reusable form input components.
- Frontend validation.
- Mock authentication API functions while the real backend is not connected yet.
- A dummy authentication token returned after login.
- Token storage using `localStorage`.
- Helper functions for reading and removing the stored token.

The mock authentication service will later be replaced with real backend API requests.

## Checks

Run:

```bash
npm run typecheck
npm run lint
npm run build
