# API Ready Plan

## What Changed

Mock data access is now separated from page components through service functions such as:

- `productService`
- `categoryService`
- `authService`
- `checkoutService`
- `accountService`
- `infoService`

The app also now has lightweight frontend contracts documented in `src/services/contracts.js`.

## Why It Changed

Before the refactor, pages directly imported mock data and handled too much catalog/account logic themselves. That would have made API migration noisy and error-prone.

Now the swap path is clearer:

1. keep component props and rendering mostly unchanged
2. replace mock service internals with API calls
3. normalize responses inside services
4. keep contexts and pages consuming stable service outputs

## Suggested Next Backend Integration Steps

### Products

- Replace `src/features/products/services/productService.js` with fetch-based calls
- Keep search/filter normalization in the service layer
- Return the same product shape currently used by UI components

### Categories

- Fetch category lists and category detail payloads from an API
- Preserve `getCategoryDetails()` output shape to avoid page churn

### Auth

- Replace `signIn()` and `signUp()` with real request handling
- Add token/session storage in a dedicated auth context when needed

### Checkout

- Replace `placeOrder()` with a real order submission endpoint
- Keep client-side validation in the page and server errors in the service response path

### Cart and Favorites

- Optionally sync browser state with authenticated user state later
- Keep optimistic local UX, then reconcile with backend responses

## How Future Developers Should Continue

- Treat services as the API boundary
- Normalize backend responses before returning to pages
- Keep transport details out of JSX
- Add request utilities in `src/services/` rather than scattering fetch logic across features
