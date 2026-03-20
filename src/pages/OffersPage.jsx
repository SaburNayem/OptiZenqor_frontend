import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageSection from "../components/common/PageSection";
import { offerTabs, products } from "../data";

function OffersPage({ addToCart, favorites, toggleFavorite }) {
  const [activeTab, setActiveTab] = useState(offerTabs[0]);
  const favoriteIds = favorites.map((item) => item.id);
  const offerProducts = useMemo(() => {
    const offset = offerTabs.indexOf(activeTab);
    return products.map((product, index) => ({
      ...product,
      offerLabel: offerTabs[(index + Math.max(offset, 0)) % offerTabs.length],
    }));
  }, [activeTab]);

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
                  {favoriteIds.includes(product.id) ? "Saved" : "Save"}
                </button>
                <button className="button primary small" type="button" onClick={() => addToCart(product, 1)}>
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}

export default OffersPage;
