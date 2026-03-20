import { createContext, useMemo } from "react";
import { cartSeed } from "../../../data/mockStorefront";
import { STORAGE_KEYS } from "../../../constants/storageKeys";
import usePersistentState from "../../../hooks/usePersistentState";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = usePersistentState(STORAGE_KEYS.cart, cartSeed);

  function addToCart(product, quantity = 1) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...current, { product, quantity }];
    });
  }

  function updateCartQuantity(productId, nextQuantity) {
    if (nextQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((current) =>
      current.map((item) =>
        item.product.id === productId ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  }

  function removeFromCart(productId) {
    setCart((current) => current.filter((item) => item.product.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = cart.length ? 4.99 : 0;
  const total = subtotal + delivery;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      subtotal,
      delivery,
      total,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
    }),
    [cart, cartCount, subtotal, delivery, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
