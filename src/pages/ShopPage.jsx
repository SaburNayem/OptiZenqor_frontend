import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import PageSection from "../components/common/PageSection";
import { products } from "../data";

function ShopPage({ favorites, toggleFavorite, addToCart }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("default");
  const [minRating, setMinRating] = useState(0);
  const favoriteIds = favorites.map((item) => item.id);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const filteredProducts = useMemo(() => {
    let next = products.filter((product) =>
      `${product.name} ${product.categoryName}`.toLowerCase().includes(query.toLowerCase()),
    );

    next = next.filter((product) => product.rating >= minRating);

    switch (sort) {
      case "price_low_to_high":
        return [...next].sort((a, b) => a.price - b.price);
      case "price_high_to_low":
        return [...next].sort((a, b) => b.price - a.price);
      case "rating":
        return [...next].sort((a, b) => b.rating - a.rating);
      case "name":
        return [...next].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return next;
    }
  }, [minRating, query, sort]);

  return (
    <PageSection
      eyebrow="Shop"
      title="Search, filter, and browse the full catalog"
      subtitle="This page is laid out like a desktop product listing page instead of a mobile app tab."
    >
      <div className="shop-layout">
        <aside className="filters-panel">
          <h3>Refine</h3>
          <label className="field">
            <span>Search</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <label className="field">
            <span>Sort</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="default">Featured</option>
              <option value="price_low_to_high">Price: Low to High</option>
              <option value="price_high_to_low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name</option>
            </select>
          </label>
          <label className="field">
            <span>Minimum Rating</span>
            <select value={minRating} onChange={(event) => setMinRating(Number(event.target.value))}>
              {[0, 3, 3.5, 4, 4.5].map((value) => (
                <option key={value} value={value}>
                  {value === 0 ? "All ratings" : `${value}+ stars`}
                </option>
              ))}
            </select>
          </label>
        </aside>

        <div className="shop-results">
          <div className="results-bar">
            <strong>{filteredProducts.length} products</strong>
            <span>Clean catalogue browsing with persistent filters.</span>
          </div>
          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <div className="empty-state">No products matched your search or filter.</div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favoriteIds={favoriteIds}
                  onFavorite={() => toggleFavorite(product)}
                  onAddToCart={() => addToCart(product, 1)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </PageSection>
  );
}

export default ShopPage;
