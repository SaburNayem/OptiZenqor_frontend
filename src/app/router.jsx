import { Route, Routes } from "react-router-dom";
import NotFoundState from "../components/feedback/NotFoundState";
import WebsiteLayout from "../components/layout/WebsiteLayout";
import AccountPage from "../features/account/pages/AccountPage";
import AuthPage from "../features/auth/pages/AuthPage";
import CartPage from "../features/cart/pages/CartPage";
import CategoriesPage from "../features/categories/pages/CategoriesPage";
import CategoryDetailsPage from "../features/categories/pages/CategoryDetailsPage";
import CheckoutPage from "../features/checkout/pages/CheckoutPage";
import FavoritesPage from "../features/favorites/pages/FavoritesPage";
import OrdersPage from "../features/orders/pages/OrdersPage";
import OrderDetailsPage from "../features/orders/pages/OrderDetailsPage";
import OrderHistoryPage from "../features/orders/pages/OrderHistoryPage";
import OrderTrackingPage from "../features/orders/pages/OrderTrackingPage";
import SearchPage from "../features/products/pages/SearchPage";
import HomePage from "../features/products/pages/HomePage";
import OffersPage from "../features/products/pages/OffersPage";
import ProductPage from "../features/products/pages/ProductPage";
import ShopPage from "../features/products/pages/ShopPage";
import SettingsPage from "../features/settings/pages/SettingsPage";
import SupportPage from "../features/support/pages/SupportPage";

function RouteNotFoundPage() {
  return (
    <section className="page-section">
      <div className="container">
        <NotFoundState
          title="Page not found"
          description="This destination is not part of the current storefront experience."
          primaryAction={{ label: "Back to home", to: "/" }}
          secondaryAction={{ label: "Browse shop", to: "/shop" }}
        />
      </div>
    </section>
  );
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:categoryId" element={<CategoryDetailsPage />} />
        <Route path="offers" element={<OffersPage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/history" element={<OrderHistoryPage />} />
        <Route path="orders/:orderId" element={<OrderDetailsPage />} />
        <Route path="orders/:orderId/tracking" element={<OrderTrackingPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="*" element={<RouteNotFoundPage />} />
      </Route>
      <Route path="/sign-in" element={<AuthPage mode="sign-in" />} />
      <Route path="/sign-up" element={<AuthPage mode="sign-up" />} />
      <Route path="/forgot-password" element={<AuthPage mode="forgot-password" />} />
      <Route path="/verify-code" element={<AuthPage mode="verify-code" />} />
      <Route path="/reset-password" element={<AuthPage mode="reset-password" />} />
    </Routes>
  );
}

export default AppRouter;
