# OptiZenqor Website Documentation

## Overview

This project is a React + Vite ecommerce storefront for **Shob Bazaar / OptiZenqor**. It is designed as a website-first shopping experience with desktop-style navigation, category browsing, product discovery, favorites, cart management, checkout, and simple account/auth flows.

The app uses:

- `React 18`
- `React Router DOM 6`
- `Vite 5`
- browser `localStorage` for client-side persistence

The current implementation is a **frontend-only mock storefront**. Product data, account content, offers, and order history are all driven from local static data in the codebase. There is no backend API, authentication service, or payment integration yet.

## Purpose

The site appears to be a web adaptation of an earlier app-style shopping experience. The implementation shifts that experience into a more typical ecommerce website layout by adding:

- a persistent header and footer
- global search in the header
- desktop-friendly category and product grids
- promotional offer sections
- separate auth pages outside the main store shell
- a slide-out drawer for support/info pages

## Tech Stack

- Entry point: `src/main.jsx`
- Root app and routes: `src/App.jsx`
- Shared styling: `src/styles.css`
- Local mock data: `src/data.js`
- Route navigation config: `src/constants/navigation.js`
- Local storage helper: `src/utils/storage.js`

## How To Run

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Application Architecture

## Routing Structure

The router is defined in `src/App.jsx`.

### Routes inside the shared website layout

These routes render inside `WebsiteLayout`, which includes the top strip, header, drawer, main content area, and footer.

- `/` -> Home page
- `/shop` -> Full product listing with search/filter/sort
- `/categories` -> All category collections
- `/categories/:categoryId` -> Category details page
- `/offers` -> Promotional offers page
- `/product/:productId` -> Product details page
- `/favorites` -> Saved products page
- `/cart` -> Shopping cart
- `/checkout` -> Checkout page
- `/account` -> Account overview
- `/info/:slug` -> Drawer-linked info pages like support/help/about/order history

### Routes outside the shared layout

- `/sign-in` -> Sign-in page
- `/sign-up` -> Sign-up page

These auth pages intentionally sit outside the main storefront shell.

## Layout System

`src/components/layout/WebsiteLayout.jsx` controls the shell of the site:

- `TopStrip`
- `SiteHeader`
- `WebDrawer`
- `Outlet` for page content
- `Footer`

This gives the storefront a consistent structure across all main shopping routes.

## State Management

There is no external state library. The app uses local React state in `src/App.jsx`.

### Stored state

- `favorites`
- `cart`

### Persistence

Both values are persisted in `localStorage`:

- `optizenqor_favorites`
- `optizenqor_cart`

On first load, the app falls back to seeded mock values from `src/data.js`.

### Shared actions passed down as props

- `toggleFavorite(product)`
- `addToCart(product, quantity)`
- `updateCartQuantity(productId, nextQuantity)`
- `removeFromCart(productId)`
- `clearCart()`

This makes `App.jsx` the central controller for storefront interactions.

## Data Model

All data is currently local and static in `src/data.js`.

### Main datasets

- `categories`
- `products`
- `featuredProducts`
- `popularProducts`
- `favoriteSeed`
- `cartSeed`
- `accountActions`
- `drawerItems`
- `offerTabs`
- `homeHighlights`

### Utility helpers

- `getProductsByCategory(categoryId)`
- `getProductById(productId)`

### Product shape

Each product includes:

- `id`
- `name`
- `categoryId`
- `categoryName`
- `price`
- `rating`
- `imageUrl`
- `description`

## Page Documentation

## 1. Home Page

File: `src/pages/HomePage.jsx`

The homepage is a merchandised landing page with multiple sections:

- hero banner with primary calls to action
- trust points row
- search-first discovery/sourcing section
- promo ribbon using offer tabs
- category grid
- featured collection
- buy again carousel-like row
- editorial cards
- popular products section

### Key behavior

- Uses the current favorites list to build the "Buy Again" section
- Supports save-to-favorites and add-to-cart directly from product cards
- Links users into product, category, shop, and offers pages

## 2. Shop Page

File: `src/pages/ShopPage.jsx`

This is the main catalog page.

### Features

- header search can navigate here with `?q=...`
- local search filtering by product name and category
- sorting by:
  - featured/default
  - price low to high
  - price high to low
  - rating
  - name
- minimum rating filter

### Notes

- Filtering is done client-side using `useMemo`
- Query state is synced from the URL search parameter on load/change

## 3. Categories Page

File: `src/pages/CategoriesPage.jsx`

Displays all available categories in a large tile grid, linking to category detail pages.

## 4. Category Details Page

File: `src/pages/CategoryDetailsPage.jsx`

Shows all products for a selected category.

### Behavior

- reads `categoryId` from the route
- resolves category metadata from `categories`
- fetches matching products via `getProductsByCategory`
- supports favorite and cart actions for each product

## 5. Offers Page

File: `src/pages/OffersPage.jsx`

Displays promotional offer tabs and a list of offer cards.

### Behavior

- active tab is controlled by local state
- each tab remaps an `offerLabel` over the same product list
- users can save products or add them to cart directly

### Important note

Offers are currently **visual/promotional labels only**. They do not change pricing or inventory.

## 6. Product Page

File: `src/pages/ProductPage.jsx`

Shows an individual product detail view.

### Features

- product image
- category and description
- price and rating
- quantity selector
- add to cart
- save to favorites
- buy now
- estimated total based on selected quantity

### Behavior

- `Add To Cart` adds the selected quantity and redirects to `/cart`
- `Buy Now` adds the selected quantity and redirects to `/checkout`
- if the product ID is invalid, a fallback "Product not found" page is shown

## 7. Favorites Page

File: `src/pages/FavoritesPage.jsx`

Displays saved items in a list layout.

### Behavior

- shows all favorited products
- allows removing a product from favorites
- links back to the product page

## 8. Cart Page

File: `src/pages/CartPage.jsx`

Shows the shopping cart and order summary.

### Features

- line items with image, title, category, quantity controls, and remove action
- subtotal calculation
- flat delivery fee of `$4.99` when cart is not empty
- final total calculation
- checkout CTA

### Behavior

- quantity decrement below `1` removes the item
- totals are calculated entirely on the client

## 9. Checkout Page

File: `src/pages/CheckoutPage.jsx`

Displays a simplified checkout flow.

### Sections

- shipping address
- order items
- payment summary

### Behavior

- "Place Order" is disabled when the cart is empty
- on successful place order:
  - success banner is shown
  - cart is cleared
  - page scrolls to top
  - user is redirected to `/` after `1.2` seconds

### Important note

This is a mock checkout. There is no real payment gateway, order creation API, or form submission to a backend.

## 10. Account Page

File: `src/pages/AccountPage.jsx`

Shows a simple profile and account services dashboard.

### Features

- profile hero section
- interactive account action cards
- active selection detail box

### Important note

The sections are presentational. Selecting an action updates the displayed text but does not open real account management forms.

## 11. Auth Pages

File: `src/pages/AuthPage.jsx`

The same component is used for both sign-in and sign-up modes.

### Routes

- `/sign-in`
- `/sign-up`

### Behavior

- sign-up mode includes a full name field
- sign-in mode shows email and password only
- submitting the form redirects to `/`

### Important note

Authentication is mocked. No credentials are validated or persisted.

## 12. Drawer Info Pages

File: `src/pages/DrawerInfoPage.jsx`

This page handles informational routes opened from the slide-out drawer.

### Supported destinations

- Order History
- Support
- Review
- Help
- About Us
- Logout

### Behavior

- `Order History` renders sample order cards
- other drawer items render informational content plus quick action buttons
- `Logout` from the drawer navigates to `/sign-in`

## Shared Components

## `ProductCard`

File: `src/components/common/ProductCard.jsx`

Reusable product card used across the homepage, shop page, category page, and offers.

### Supports

- navigation to product details
- favorite toggle
- add to cart
- price and rating display

## `PageSection`

File: `src/components/common/PageSection.jsx`

Reusable section wrapper for internal pages with:

- eyebrow label
- page title
- subtitle
- content area

## `SectionHeading`

File: `src/components/common/SectionHeading.jsx`

Used on the homepage for section titles with a "View all" link.

## Navigation And UI Behavior

## Header

File: `src/components/layout/SiteHeader.jsx`

### Features

- brand area
- search form
- favorites count
- cart quantity count
- sign-in button
- nav links
- menu button to open the drawer

### Search flow

When a user submits the header search:

- if the query is non-empty, they are taken to `/shop?q=<query>`
- if empty, they are taken to `/shop`

## Drawer

File: `src/components/layout/WebDrawer.jsx`

The drawer overlays the page and is controlled by local state in `WebsiteLayout`.

### Behavior

- opens from the header "Menu" button
- closes on overlay click
- routes drawer items to `/info/:slug`
- special-cases `Logout` to redirect to `/sign-in`

## Footer

File: `src/components/layout/Footer.jsx`

Provides shortcut navigation for:

- shop
- account
- checkout
- saved items

## Styling

All core styling is in `src/styles.css`.

The current visual system uses:

- a storefront-style marketing homepage
- desktop-oriented grid and card layouts
- reusable utility-like classes such as `container`, `summary-box`, `product-grid`, and `button`

## Current Limitations

This project is production-shaped, but not production-connected.

### Not implemented yet

- backend API integration
- real authentication
- real customer accounts
- dynamic product management
- live search API
- persistent server-side carts
- payment processing
- checkout form validation
- order creation and tracking backend
- inventory and stock logic
- coupon or discount calculations

## Suggested Next Steps

If this website is going to production, the next practical milestones would be:

1. Replace `src/data.js` with API-driven data.
2. Introduce authentication and protected account flows.
3. Connect cart and checkout to a backend service.
4. Add form validation for auth and checkout.
5. Move seeded/localStorage state into a proper API or global store.
6. Add tests for route rendering, cart logic, and checkout behavior.

## File Map

Key files for future maintenance:

- `src/main.jsx` -> React bootstrap
- `src/App.jsx` -> route setup and global storefront state
- `src/data.js` -> mock data and helper selectors
- `src/constants/navigation.js` -> navigation and homepage content config
- `src/components/layout/*` -> layout shell
- `src/components/common/*` -> reusable UI pieces
- `src/pages/*` -> page-level route components
- `src/utils/storage.js` -> localStorage loader
- `src/styles.css` -> all styles

## Summary

This website is a clean frontend ecommerce prototype with:

- static catalog data
- client-side cart and favorites
- route-based browsing and product detail pages
- a website-style homepage and layout
- mocked auth/account/checkout flows

It is well-suited for UI demonstration, stakeholder review, or the next phase of backend integration.
