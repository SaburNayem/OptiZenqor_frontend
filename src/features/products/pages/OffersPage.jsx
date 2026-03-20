import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ErrorState from "../../../components/feedback/ErrorState";
import LoadingState from "../../../components/feedback/LoadingState";
import PageSection from "../../../components/common/PageSection";
import useAsyncData from "../../../hooks/useAsyncData";
import { offerTabs } from "../../../data/mockStorefront";
import { getOfferProducts } from "../services/productService";
import { useCart } from "../../cart/hooks/useCart";
import { useFavorites } from "../../favorites/hooks/useFavorites";

function OffersPage() {
  const [activeTab, setActiveTab] = useState(offerTabs[0]);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const request = useMemo(() => () => getOfferProducts(activeTab), [activeTab]);
  const { data: offerProducts, loading, error, reload } = useAsyncData(request, [request]);

  return (
    <PageSection
      eyebrow="Offers"
      title="Deals, tabs, and promotional collections from your original app"
      subtitle="This restores the offers section in a website-friendly form with tabs and animated cards."
    >
      <div className="offers-tabs">
        {offerTabs.map((tab) => (
          <button
            key={tab}
            className={`offer-tab${activeTab === tab ? " active" : ""}`}
            type="button"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {loading ? <LoadingState label="Loading offers..." /> : null}
      {error ? (
        <ErrorState
          title="Offers are temporarily unavailable"
          description="The promotional cards could not be loaded."
          onRetry={reload}
        />
      ) : null}
      {offerProducts ? (
        <div className="offer-list">
          {offerProducts.map((product) => (
            <article className="offer-card" key={`${activeTab}-${product.id}`}>
              <img src={product.imageUrl} alt={product.name} />
              <div className="offer-card-body">
                <span className="offer-badge">{product.offerLabel}</span>
                <Link className="product-title" to={`/product/${product.id}`}>
                  {product.name}
                </Link>
                <p>{product.categoryName}</p>
                <div className="price-row">
                  <strong>${product.price.toFixed(2)}</strong>
                  <span>{product.rating}★</span>
                </div>
                <div className="card-actions">
                  <button className="button ghost small" type="button" onClick={() => toggleFavorite(product)}>
                    {isFavorite(product.id) ? "Saved" : "Save"}
                  </button>
                  <button className="button primary small" type="button" onClick={() => addToCart(product, 1)}>
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </PageSection>
  );
}

export default OffersPage;
