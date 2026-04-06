import { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { primaryHeaderLinks, utilityHeaderLinks } from "../../constants/navigation";
import { recentSearches, trendingSearches } from "../../data/mockStorefront";

function SiteHeader({ onOpenDrawer }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const headerLinks = primaryHeaderLinks.concat(utilityHeaderLinks);

  const suggestions = useMemo(() => {
    const base = [...recentSearches, ...trendingSearches];
    return query
      ? base.filter((item) => item.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
      : base.slice(0, 5);
  }, [query]);

  function submitSearch(event) {
    event.preventDefault();
    const nextQuery = query.trim();
    navigate(nextQuery ? `/search?q=${encodeURIComponent(nextQuery)}` : "/search");
    setSearchOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-row">
          <button className="header-menu-button" type="button" onClick={onOpenDrawer}>
            Menu
          </button>

          <Link className="brand-mark" to="/">
            <span className="brand-badge">OZ</span>
            <span>
              <strong>Optizenqor Store</strong>
              <small>Design-led ecommerce</small>
            </span>
          </Link>

          <form
            className={`header-search${searchOpen ? " open" : ""}`}
            onSubmit={submitSearch}
            onFocus={() => setSearchOpen(true)}
          >
            <input
              type="search"
              placeholder="Search products, collections, and offers"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button className="button primary" type="submit">
              Search
            </button>
            <div className={`search-panel${searchOpen ? " open" : ""}`}>
              <div className="search-panel-group">
                <span className="search-label">Suggestions</span>
                {suggestions.map((item) => (
                  <button
                    key={item}
                    className="search-chip"
                    type="button"
                    onClick={() => {
                      setQuery(item);
                      navigate(`/search?q=${encodeURIComponent(item)}`);
                      setSearchOpen(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="search-panel-group">
                <span className="search-label">Trending now</span>
                <div className="chip-row">
                  {trendingSearches.map((item) => (
                    <button
                      key={item}
                      className="chip"
                      type="button"
                      onClick={() => {
                        navigate(`/search?q=${encodeURIComponent(item)}`);
                        setSearchOpen(false);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </form>

        </div>

        <nav className="header-tabs" aria-label="Primary">
          {headerLinks.map((item) => (
            <NavLink
              key={item.to}
              end={item.to === "/"}
              to={item.to}
              className={({ isActive }) => `header-link header-pill${isActive ? " active" : ""}`}
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
