import { CartProvider } from "../features/cart/context/CartContext";
import { FavoritesProvider } from "../features/favorites/context/FavoritesContext";

function AppProviders({ children }) {
  return (
    <FavoritesProvider>
      <CartProvider>{children}</CartProvider>
    </FavoritesProvider>
  );
}

export default AppProviders;
