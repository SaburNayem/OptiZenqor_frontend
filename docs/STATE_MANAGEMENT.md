# State Management

## What Changed

Cart and favorites state were moved out of `src/App.jsx` and into dedicated React Context providers:

- `CartProvider` with `useCart()`
- `FavoritesProvider` with `useFavorites()`

Persistence is now abstracted through:

- `src/hooks/usePersistentState.js`
- `src/utils/storage.js`
- `src/constants/storageKeys.js`

## Why It Changed

The earlier prop-based approach created unnecessary prop drilling from the app root into pages and shared layout components. Context reduces that coupling and keeps shared interactions available where they are needed:

- header counts
- product cards
- product detail actions
- cart and favorites pages

## Current Responsibilities

### Cart context

Owns:

- cart items
- cart count
- subtotal
- delivery total
- final total
- add/update/remove/clear actions

### Favorites context

Owns:

- saved products
- favorite ids
- count
- toggle behavior

## How To Continue

- Use `useCart()` for any new cart-related UI
- Use `useFavorites()` for any new save/unsave behavior
- Keep server sync out of components; add it inside the context or service layer later
- Reuse `usePersistentState()` only for state that truly needs browser persistence
