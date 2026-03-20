import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { headerLinks } from "../../constants/navigation";
import { useCart } from "../../features/cart/hooks/useCart";
import { useFavorites } from "../../features/favorites/hooks/useFavorites";

function SiteHeader({ onOpenDrawer }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();

  function submitSearch(event) {
    event.preventDefault();
    navigate(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : "/shop");
  }

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-row">
          <Link className="brand-mark" to="/">
            <span className="brand-badge">SQ</span>
            <span>
              <strong>Shob Bazaar</strong>
              <small>OptiZenqor Storefront</small>
            </span>
          </Link>

          <form className="header-search" onSubmit={submitSearch}>
            <input
              type="search"
              placeholder="Search products, categories, collections"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button className="button primary" type="submit">
              Search
            </button>
          </form>

          <div className="header-actions">
            <button className="button ghost small" type="button" onClick={onOpenDrawer}>
              Menu
            </button>
            <Link className="header-stat" to="/favorites">
              Favorites
              <strong>{favoritesCount}</strong>
            </Link>
            <Link className="header-stat" to="/cart">
              Cart
              <strong>{cartCount}</strong>
            </Link>
            <Link className="button ghost small" to="/sign-in">
              Sign In
            </Link>
          </div>
        </div>

        <nav className="header-nav">
          {headerLinks.map((item) => (
            <NavLink
              key={item.to}
              end={item.to === "/"}
              to={item.to}
              className={({ isActive }) => `header-link${isActive ? " active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
