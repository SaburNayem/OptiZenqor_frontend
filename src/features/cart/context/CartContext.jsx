import { createContext, useEffect, useMemo, useState } from "react";
import { apiRequest, getAccessToken } from "../../../services/apiClient";
import { mapProduct } from "../../products/services/productService";

export const CartContext = createContext(null);

function mapCartItem(item) {
  return {
    id: item.id,
    product: mapProduct(item.product),
    quantity: item.quantity,
  };
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  async function loadCart() {
    if (!getAccessToken()) {
      setCart([]);
      return;
    }

    try {
      const result = await apiRequest("/cart");
      setCart((result.items || []).map(mapCartItem));
    } catch {
      setCart([]);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function addToCart(product, quantity = 1) {
    await apiRequest("/cart/items", {
      method: "POST",
      body: JSON.stringify({ productId: product.id, quantity }),
    });
    await loadCart();
  }

  async function updateCartQuantity(itemOrProductId, nextQuantity) {
    const target = cart.find((entry) => entry.id === itemOrProductId || entry.product.id === itemOrProductId);
    if (!target) return;

    if (nextQuantity < 1) {
      await removeFromCart(itemOrProductId);
      return;
    }

    await apiRequest(`/cart/items/${target.id}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity: nextQuantity }),
    });
    await loadCart();
  }

  async function removeFromCart(itemOrProductId) {
    const target = cart.find((entry) => entry.id === itemOrProductId || entry.product.id === itemOrProductId);
    if (!target) return;

    await apiRequest(`/cart/items/${target.id}`, {
      method: "DELETE",
    });
    await loadCart();
  }

  async function clearCart() {
    await apiRequest("/cart/clear", { method: "DELETE" });
    await loadCart();
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
      reloadCart: loadCart,
    }),
    [cart, cartCount, subtotal, delivery, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
