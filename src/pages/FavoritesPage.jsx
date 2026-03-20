import { Link } from "react-router-dom";
import PageSection from "../components/common/PageSection";

function FavoritesPage({ favorites, toggleFavorite }) {
  return (
    <PageSection
      eyebrow="Saved"
      title="Favorites"
      subtitle="A cleaner saved-items list that fits desktop browsing."
    >
      <div className="list-stack">
        {favorites.length === 0 ? (
          <div className="empty-state">No saved products yet.</div>
        ) : (
          favorites.map((product) => (
            <article className="list-card" key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <div className="list-copy">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
                <p>{product.categoryName}</p>
              </div>
              <strong>${product.price.toFixed(2)}</strong>
              <button className="button ghost small" type="button" onClick={() => toggleFavorite(product)}>
                Remove
              </button>
            </article>
          ))
        )}
      </div>
    </PageSection>
  );
}

export default FavoritesPage;
