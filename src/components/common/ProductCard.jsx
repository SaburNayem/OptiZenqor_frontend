import { Link } from "react-router-dom";
import { useCart } from "../../features/cart/hooks/useCart";
import { useFavorites } from "../../features/favorites/hooks/useFavorites";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(product.id);

  return (
    <article className="product-card">
      <Link className="product-image" to={`/product/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
      </Link>
      <div className="product-card-body">
        <p>{product.categoryName}</p>
        <Link className="product-title" to={`/product/${product.id}`}>
          {product.name}
        </Link>
        <div className="price-row">
          <strong>${product.price.toFixed(2)}</strong>
          <span>{product.rating}★</span>
        </div>
      </div>
      <div className="card-actions">
        <button className="button ghost small" type="button" onClick={() => toggleFavorite(product)}>
          {saved ? "Saved" : "Save"}
        </button>
        <button className="button primary small" type="button" onClick={() => addToCart(product, 1)}>
          Add
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
