import { Link } from "react-router-dom";
import EmptyState from "../../../components/feedback/EmptyState";
import PageSection from "../../../components/common/PageSection";
import { useCart } from "../../cart/hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";

function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  return (
    <PageSection eyebrow="Wishlist" title="Saved products ready for your next order" subtitle="A responsive wishlist with remove and move-to-cart actions.">
      <div className="list-stack">
        {favorites.length === 0 ? (
          <EmptyState title="Your wishlist is empty" description="Save products from the shop to create a quick comeback list here." action={{ label: "Start shopping", to: "/shop" }} />
        ) : (
          favorites.map((product) => (
            <article className="list-card" key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <div className="list-copy">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
                <p>{product.shortDescription}</p>
                <div className="rating-row"><span>★★★★★</span><small>{product.rating} rating</small></div>
              </div>
              <div className="list-actions">
                <strong>${product.price.toFixed(2)}</strong>
                <button className="button primary small" type="button" onClick={() => addToCart(product, 1)}>Move to cart</button>
                <button className="button ghost small" type="button" onClick={() => toggleFavorite(product)}>Remove</button>
              </div>
            </article>
          ))
        )}
      </div>
    </PageSection>
  );
}

export default FavoritesPage;
