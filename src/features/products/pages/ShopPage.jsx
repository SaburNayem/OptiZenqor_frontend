import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EmptyState from "../../../components/feedback/EmptyState";
import ErrorState from "../../../components/feedback/ErrorState";
import LoadingState from "../../../components/feedback/LoadingState";
import ProductCard from "../../../components/common/ProductCard";
import PageSection from "../../../components/common/PageSection";
import useAsyncData from "../../../hooks/useAsyncData";
import { searchProducts } from "../services/productService";

function ShopPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("default");
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const { data: filteredProducts, loading, error, reload } = useAsyncData(
    () => searchProducts({ query, sort, minRating }),
    [query, sort, minRating],
  );

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
            <strong>{filteredProducts?.length ?? 0} products</strong>
            <span>Clean catalogue browsing with persistent filters.</span>
          </div>
          {loading ? <LoadingState label="Refreshing catalog..." /> : null}
          {error ? (
            <ErrorState
              title="The catalog could not be loaded"
              description="Please try the catalog request again."
              onRetry={reload}
            />
          ) : null}
          {!loading && !error ? (
            <div className="product-grid">
              {filteredProducts.length === 0 ? (
                <EmptyState
                  title="No matching products"
                  description="Try a broader search term or lower the rating filter."
                  action={{ label: "Reset with shop", to: "/shop" }}
                />
              ) : (
                filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
              )}
            </div>
          ) : null}
        </div>
      </div>
    </PageSection>
  );
}

export default ShopPage;
