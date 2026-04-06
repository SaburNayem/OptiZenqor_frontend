import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageSection from "../../../components/common/PageSection";
import ProductCard from "../../../components/common/ProductCard";
import EmptyState from "../../../components/feedback/EmptyState";
import ErrorState from "../../../components/feedback/ErrorState";
import LoadingState from "../../../components/feedback/LoadingState";
import { categories } from "../../../data/mockStorefront";
import useAsyncData from "../../../hooks/useAsyncData";
import { searchProducts } from "../services/productService";

function ShopPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("featured");
  const [minRating, setMinRating] = useState(0);
  const [categoryId, setCategoryId] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [tab, setTab] = useState("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => setQuery(initialQuery), [initialQuery]);

  const { data, loading, error, reload } = useAsyncData(
    () => searchProducts({ query, sort, minRating, categoryId, maxPrice, tab }),
    [query, sort, minRating, categoryId, maxPrice, tab],
  );

  const filters = (
    <>
      <h3>Refine products</h3>
      <label className="field">
        <span>Search</span>
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} />
      </label>
      <label className="field">
        <span>Sort</span>
        <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price_low_to_high">Price: Low to High</option>
          <option value="price_high_to_low">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </label>
      <label className="field">
        <span>Category</span>
        <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
      </label>
      <label className="field">
        <span>Minimum rating</span>
        <select value={minRating} onChange={(event) => setMinRating(Number(event.target.value))}>
          {[0, 4, 4.5].map((value) => <option key={value} value={value}>{value === 0 ? "All ratings" : `${value}+ stars`}</option>)}
        </select>
      </label>
      <label className="field">
        <span>Max price: ${maxPrice}</span>
        <input type="range" min="20" max="2000" step="10" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
      </label>
    </>
  );

  return (
    <PageSection
      eyebrow="Shop"
      title="Advanced product browsing with premium filtering"
      subtitle="Responsive sidebar filters on desktop and a mobile drawer for smaller screens."
      aside={<button className="button ghost mobile-only" type="button" onClick={() => setMobileFiltersOpen(true)}>Filter & sort</button>}
    >
      <div className="offers-tabs">
        {["all", "featured", "trending", "new"].map((value) => (
          <button key={value} className={`offer-tab${tab === value ? " active" : ""}`} type="button" onClick={() => setTab(value)}>
            {value === "all" ? "All products" : value}
          </button>
        ))}
      </div>

      <div className="shop-layout">
        <aside className="filters-panel desktop-only">{filters}</aside>
        <div className={`mobile-filter-drawer${mobileFiltersOpen ? " open" : ""}`}>
          <div className="filters-panel">
            <div className="drawer-top">
              <h3>Filters</h3>
              <button className="icon-button" type="button" onClick={() => setMobileFiltersOpen(false)}>x</button>
            </div>
            {filters}
          </div>
        </div>

        <div className="shop-results">
          <div className="results-bar">
            <strong>{data?.length ?? 0} products</strong>
            <span>Loading, empty, and no-result states are all handled.</span>
          </div>
          {loading ? <LoadingState label="Refreshing catalog..." /> : null}
          {error ? <ErrorState title="Catalog unavailable" description="Please try loading the catalog again." onRetry={reload} /> : null}
          {!loading && !error ? (
            data?.length ? (
              <div className="product-grid">{data.map((product) => <ProductCard key={product.id} product={product} />)}</div>
            ) : (
              <EmptyState title="No products matched these filters" description="Try a broader search term or reset one of the filters." action={{ label: "Return to shop", to: "/shop" }} />
            )
          ) : null}
        </div>
      </div>
    </PageSection>
  );
}

export default ShopPage;
