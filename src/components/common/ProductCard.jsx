import { Link } from "react-router-dom";

function ProductCard({ product, favoriteIds, onFavorite, onAddToCart }) {
  const isFavorite = favoriteIds.includes(product.id);

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
        <button className="button ghost small" type="button" onClick={onFavorite}>
          {isFavorite ? "Saved" : "Save"}
        </button>
        <button className="button primary small" type="button" onClick={onAddToCart}>
          Add
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
