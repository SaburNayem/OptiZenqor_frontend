# OptiZenqor Frontend Documentation

## Overview

OptiZenqor is a React + Vite ecommerce storefront prototype. It is a frontend-only shopping experience with a sticky header, single navigation bar, product browsing, wishlist and cart flows, checkout screens, account pages, support pages, and a merchandised homepage.

The current UI includes:

- a single navbar under the logo and search area
- a teal primary brand color: `#20B2AA`
- a 3-slide auto-rotating homepage hero
- category browsing, offers, wishlist, cart, account, orders, and support pages
- client-side persistence through `localStorage`

There is no backend API, payment gateway, or real authentication yet.

## Stack

- `React 18`
- `React Router DOM 6`
- `Vite 5`
- local mock data from `src/data/mockStorefront.js`
- local persistence from `src/hooks/usePersistentState.js`

## Important Files

- `src/main.jsx` -> React bootstrap
- `src/App.jsx` -> root app composition
- `src/app/router.jsx` -> route definitions
- `src/app/providers.jsx` -> app providers
- `src/components/layout/WebsiteLayout.jsx` -> main site shell
- `src/components/layout/SiteHeader.jsx` -> logo, search, and single navbar
- `src/components/layout/WebDrawer.jsx` -> drawer navigation
- `src/features/products/pages/HomePage.jsx` -> homepage with auto hero slider
- `src/styles/index.css` -> global styles and theme tokens
- `src/constants/navigation.js` -> navigation config
- `src/data/mockStorefront.js` -> all mock storefront content

## Run Locally

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

On Windows PowerShell, if `npm.ps1` is blocked, use:

```powershell
npm.cmd run dev -- --host
```

Build for production:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

If the local site is running, it is usually available at:

```text
http://localhost:5173/
```

or

```text
http://127.0.0.1:5173/
```

## Routing

Routes inside the main website layout:

- `/` -> Home page
- `/shop` -> Shop page
- `/search` -> Search results page
- `/categories` -> Category list
- `/categories/:categoryId` -> Category details
- `/offers` -> Offers page
- `/product/:productId` -> Product details
- `/favorites` -> Wishlist page
- `/cart` -> Cart page
- `/checkout` -> Checkout page
- `/account` -> Account page
- `/orders` -> Orders overview
- `/orders/history` -> Order history
- `/orders/:orderId` -> Order details
- `/orders/:orderId/tracking` -> Order tracking
- `/settings` -> Settings page
- `/support` -> Support page

Auth routes outside the main layout:

- `/sign-in`
- `/sign-up`
- `/forgot-password`
- `/verify-code`
- `/reset-password`

## Layout

The main shell is rendered by `src/components/layout/WebsiteLayout.jsx`.

It includes:

- `TopStrip`
- `SiteHeader`
- `WebDrawer`
- page content through `Outlet`
- `Footer`

## Header

File: `src/components/layout/SiteHeader.jsx`

Current header behavior:

- logo at the left
- product search in the top row
- one single navbar below the search row
- navbar items from `primaryHeaderLinks` and `utilityHeaderLinks`
- search suggestions and trending search chips

Search behavior:

- query present -> `/search?q=<query>`
- empty query -> `/search`

## Homepage

File: `src/features/products/pages/HomePage.jsx`

The homepage includes:

- a top hero carousel with 3 slides
- automatic slide change every `3500ms`
- manual dot navigation for each slide
- promo ribbon
- categories grid
- featured products
- popular products
- new arrivals
- recommended products
- offers section
- trust section
- customer reviews
- newsletter CTA
- support CTA

### Hero Slider

The top hero now uses the first three featured products as rotating slides.

Each slide shows:

- eyebrow text
- product title
- product description
- current and compare price
- product image
- CTA buttons

## State Management

There is no Redux or external store.

The app uses:

- React context for cart
- React context for favorites
- `localStorage` persistence through `usePersistentState`

Stored keys:

- `optizenqor_cart`
- `optizenqor_favorites`

## Data Source

Mock content lives in:

- `src/data/mockStorefront.js`

Main data groups include:

- categories
- products
- featured and popular product collections
- banners
- testimonials
- reviews
- orders
- support data
- account data

## Theme And Styling

Global styles live in:

- `src/styles/index.css`

Current theme notes:

- primary color is `#20B2AA`
- primary buttons use a teal gradient
- brand badge uses a teal gradient
- homepage hero has custom carousel styling
- the layout is responsive for desktop and mobile

## Current Limitations

This project is still a frontend prototype.

Not implemented yet:

- backend API integration
- real login/auth session handling
- payment processing
- real checkout validation
- real order creation
- inventory sync
- admin/product management
- coupon engine
- live search API

## Suggested Next Steps

1. Replace mock data with API-driven services.
2. Add test coverage for routing, cart logic, and the homepage slider.
3. Connect auth pages to a real authentication system.
4. Connect checkout and order pages to backend services.
5. Add error boundaries and user-facing fallback states for runtime failures.

## Summary

OptiZenqor is currently a polished frontend ecommerce demo with:

- a single header navbar
- teal brand styling
- a rotating 3-slide homepage hero
- category, cart, wishlist, account, orders, and support flows
- local mock data and local persistence

It is suitable for UI review, demo use, and the next phase of backend integration.
