# Architecture

## What Changed

The storefront was refactored from a route-and-state-heavy `src/App.jsx` into a more modular frontend structure:

- `src/app/router.jsx` now owns route configuration
- `src/app/providers.jsx` composes app-wide providers
- feature folders now own their pages and mock service access
- shared layout and feedback UI stay in reusable component folders

## Why It Changed

The old structure worked for a small mock app, but shared state and route wiring were too centralized. That made future backend integration, feature expansion, and maintenance harder.

This version keeps the same storefront behavior while making ownership clearer:

- routing belongs to the app layer
- shared state belongs to contexts
- mock data access belongs to services
- page components focus on rendering and UX states

## Current Shape

Key directories:

- `src/app` for app bootstrap concerns
- `src/components/common` for reusable display components
- `src/components/layout` for shell components
- `src/components/feedback` for empty/error/loading/not-found states
- `src/features/*` for feature-owned pages, hooks, services, and contexts
- `src/data` for mock catalog and mock account data
- `src/services` for cross-feature service helpers
- `src/hooks` for generic hooks like async data loading and persistence
- `src/styles` for shared global styling

## How To Continue

- Put new route definitions in `src/app/router.jsx`
- Put feature-specific data access logic in that feature's `services/`
- Keep presentational UI inside components and async logic inside hooks/services
- Avoid pushing new shared business logic back into `App.jsx`
- If backend APIs are added later, replace service internals first, not page code
