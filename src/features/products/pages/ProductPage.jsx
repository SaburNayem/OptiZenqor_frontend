import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingState from "../../../components/feedback/LoadingState";
import NotFoundState from "../../../components/feedback/NotFoundState";
import PageSection from "../../../components/common/PageSection";
import { useCart } from "../../cart/hooks/useCart";
import { useFavorites } from "../../favorites/hooks/useFavorites";
import useAsyncData from "../../../hooks/useAsyncData";
import { getProductById } from "../services/productService";

function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const { data: product, loading } = useAsyncData(() => getProductById(productId), [productId]);

  if (loading) {
    return <LoadingState label="Loading product details..." />;
  }

  if (!product) {
    return (
      <PageSection eyebrow="Product" title="Product not found" subtitle="The selected product could not be found.">
        <NotFoundState
          title="Product not found"
          description="This product link is invalid or the item is no longer in the storefront catalog."
          primaryAction={{ label: "Back to shop", to: "/shop" }}
          secondaryAction={{ label: "Browse categories", to: "/categories" }}
        />
      </PageSection>
    );
  }

  return (
    <PageSection eyebrow={product.categoryName} title={product.name} subtitle={product.description}>
      <div className="product-page-grid">
        <div className="product-gallery">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-panel">
          <div className="product-price-line">
            <strong>${product.price.toFixed(2)}</strong>
            <span>{product.rating} star rating</span>
          </div>
          <div className="product-copy-list">
            <p>Premium selection for everyday use</p>
            <p>Ships in 2-4 business days</p>
            <p>Trusted by returning customers across categories</p>
          </div>
          <div className="quantity-picker">
            <button
              className="icon-button"
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            >
              -
            </button>
            <strong>{quantity}</strong>
            <button className="icon-button" type="button" onClick={() => setQuantity((value) => value + 1)}>
              +
            </button>
          </div>
          <div className="product-actions">
            <button
              className="button primary"
              type="button"
              onClick={() => {
                addToCart(product, quantity);
                navigate("/cart");
              }}
            >
              Add To Cart
            </button>
            <button className="button ghost" type="button" onClick={() => toggleFavorite(product)}>
              {isFavorite(product.id) ? "Saved to Favorites" : "Save Product"}
            </button>
          </div>
          <div className="summary-box">
            <div className="price-row">
              <span>Estimated total</span>
              <strong>${(product.price * quantity).toFixed(2)}</strong>
            </div>
            <button
              className="button ghost full-width"
              type="button"
              onClick={() => {
                addToCart(product, quantity);
                navigate("/checkout");
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </PageSection>
  );
}

export default ProductPage;
