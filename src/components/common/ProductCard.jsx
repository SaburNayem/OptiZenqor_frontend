import { Link } from "react-router-dom";
import { useCart } from "../../features/cart/hooks/useCart";
import { useFavorites } from "../../features/favorites/hooks/useFavorites";

function ProductCard({ product, compact = false }) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(product.id);
<<<<<<< HEAD
  const discount = Number(product.compareAtPrice || 0) - Number(product.price || 0);
  const price = `BDT ${Number(product.price || 0).toLocaleString()}`;
  const compareAtPrice = `BDT ${Number(product.compareAtPrice || 0).toLocaleString()}`;
=======
  const discount = product.compareAtPrice - product.price;
>>>>>>> 76c39d318260a223b65d88e39d8d2933dcaa0cfe

  return (
    <article className={`product-card${compact ? " compact" : ""}`}>
      <Link className="product-image" to={`/product/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
        <div className="product-badges">
          <span className="badge badge-accent">{product.badge}</span>
<<<<<<< HEAD
          {discount > 0 ? <span className="badge">{`Save BDT ${discount.toLocaleString()}`}</span> : null}
=======
          {discount > 0 ? <span className="badge">Save ${discount}</span> : null}
>>>>>>> 76c39d318260a223b65d88e39d8d2933dcaa0cfe
        </div>
      </Link>
      <div className="product-card-body">
        <p className="card-kicker">{product.categoryName}</p>
        <Link className="product-title" to={`/product/${product.id}`}>
          {product.name}
        </Link>
        <p className="product-summary">{product.shortDescription}</p>
        <div className="rating-row">
<<<<<<< HEAD
          <span>Rating</span>
=======
          <span>{"★".repeat(Math.round(product.rating))}</span>
>>>>>>> 76c39d318260a223b65d88e39d8d2933dcaa0cfe
          <small>
            {product.rating} ({product.reviewCount})
          </small>
        </div>
        <div className="price-stack">
<<<<<<< HEAD
          <strong>{price}</strong>
          <span>{compareAtPrice}</span>
=======
          <strong>${product.price.toFixed(2)}</strong>
          <span>${product.compareAtPrice.toFixed(2)}</span>
>>>>>>> 76c39d318260a223b65d88e39d8d2933dcaa0cfe
        </div>
      </div>
      <div className="card-actions">
        <button className="button icon-pill" type="button" onClick={() => toggleFavorite(product)}>
          {saved ? "Saved" : "Wishlist"}
        </button>
        <button className="button primary" type="button" onClick={() => addToCart(product, 1)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
