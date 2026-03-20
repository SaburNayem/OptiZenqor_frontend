import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import WebsiteLayout from "./components/layout/WebsiteLayout";
import {
  cartSeed,
  favoriteSeed,
} from "./data";
import AccountPage from "./pages/AccountPage";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailsPage from "./pages/CategoryDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import DrawerInfoPage from "./pages/DrawerInfoPage";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import OffersPage from "./pages/OffersPage";
import ProductPage from "./pages/ProductPage";
import ShopPage from "./pages/ShopPage";
import { loadStoredValue } from "./utils/storage";

function App() {
  const [favorites, setFavorites] = useState(() =>
    loadStoredValue("optizenqor_favorites", favoriteSeed),
  );
  const [cart, setCart] = useState(() => loadStoredValue("optizenqor_cart", cartSeed));

  useEffect(() => {
    window.localStorage.setItem("optizenqor_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    window.localStorage.setItem("optizenqor_cart", JSON.stringify(cart));
  }, [cart]);

  function toggleFavorite(product) {
    setFavorites((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product],
    );
  }

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

  const storefrontProps = {
    favorites,
    cart,
    toggleFavorite,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  };

  return (
    <Routes>
      <Route path="/" element={<WebsiteLayout favorites={favorites} cart={cart} />}>
        <Route index element={<HomePage {...storefrontProps} />} />
        <Route path="shop" element={<ShopPage {...storefrontProps} />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:categoryId" element={<CategoryDetailsPage {...storefrontProps} />} />
        <Route path="offers" element={<OffersPage {...storefrontProps} />} />
        <Route path="product/:productId" element={<ProductPage {...storefrontProps} />} />
        <Route path="favorites" element={<FavoritesPage {...storefrontProps} />} />
        <Route path="cart" element={<CartPage {...storefrontProps} />} />
        <Route path="checkout" element={<CheckoutPage {...storefrontProps} />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="info/:slug" element={<DrawerInfoPage />} />
      </Route>
      <Route path="/sign-in" element={<AuthPage mode="sign-in" />} />
      <Route path="/sign-up" element={<AuthPage mode="sign-up" />} />
    </Routes>
  );
}

export default App;
