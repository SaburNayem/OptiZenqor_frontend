import { useLocation } from "react-router-dom";
import PageSection from "../../../components/common/PageSection";
import ProductCard from "../../../components/common/ProductCard";
import EmptyState from "../../../components/feedback/EmptyState";
import LoadingState from "../../../components/feedback/LoadingState";
import useAsyncData from "../../../hooks/useAsyncData";
import { getSearchExperience } from "../services/productService";

function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") ?? "";
  const { data, loading } = useAsyncData(() => getSearchExperience(query), [query]);

  if (loading || !data) {
    return (
      <PageSection eyebrow="Search" title="Searching the catalog" subtitle="Bringing together suggestions, history, and live results.">
        <LoadingState label="Searching products..." />
      </PageSection>
    );
  }

  return (
    <PageSection
      eyebrow="Search"
      title={query ? `Results for "${query}"` : "Search the store"}
      subtitle="Large search surface with recent searches, trending terms, and friendly no-result handling."
    >
      <div className="search-experience-grid">
        <aside className="summary-box">
          <h3>Recent searches</h3>
          <div className="chip-row">
            {data.recentSearches.map((item) => <span key={item} className="chip">{item}</span>)}
          </div>
          <h3>Trending now</h3>
          <div className="chip-row">
            {data.trendingSearches.map((item) => <span key={item} className="chip">{item}</span>)}
          </div>
        </aside>
        <div>
          {data.results.length ? (
            <div className="product-grid">{data.results.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          ) : (
            <EmptyState title="No search results yet" description="Try another keyword, browse a category, or explore current offers." action={{ label: "Browse categories", to: "/categories" }} />
          )}
        </div>
      </div>
    </PageSection>
  );
}

export default SearchPage;
