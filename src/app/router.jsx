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
import DrawerInfoPage from "../features/info/pages/DrawerInfoPage";
import HomePage from "../features/products/pages/HomePage";
import OffersPage from "../features/products/pages/OffersPage";
import ProductPage from "../features/products/pages/ProductPage";
import ShopPage from "../features/products/pages/ShopPage";

function RouteNotFoundPage() {
  return (
    <section className="page-section">
      <div className="container">
        <NotFoundState
          title="Page not found"
          description="The page you are looking for does not exist in this storefront."
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
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:categoryId" element={<CategoryDetailsPage />} />
        <Route path="offers" element={<OffersPage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="info/:slug" element={<DrawerInfoPage />} />
        <Route path="*" element={<RouteNotFoundPage />} />
      </Route>
      <Route path="/sign-in" element={<AuthPage mode="sign-in" />} />
      <Route path="/sign-up" element={<AuthPage mode="sign-up" />} />
    </Routes>
  );
}

export default AppRouter;
