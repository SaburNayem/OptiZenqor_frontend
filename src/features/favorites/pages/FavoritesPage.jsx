import { Link } from "react-router-dom";
import EmptyState from "../../../components/feedback/EmptyState";
import PageSection from "../../../components/common/PageSection";
import { useFavorites } from "../hooks/useFavorites";

function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <PageSection
      eyebrow="Saved"
      title="Favorites"
      subtitle="A cleaner saved-items list that fits desktop browsing."
    >
      <div className="list-stack">
        {favorites.length === 0 ? (
          <EmptyState
            title="No saved products yet"
            description="Save items from the catalog to build a revisit list here."
            action={{ label: "Browse products", to: "/shop" }}
          />
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
