import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageSection from "../../../components/common/PageSection";
import ProductCard from "../../../components/common/ProductCard";
import LoadingState from "../../../components/feedback/LoadingState";
import NotFoundState from "../../../components/feedback/NotFoundState";
import useAsyncData from "../../../hooks/useAsyncData";
import { useCart } from "../../cart/hooks/useCart";
import { useFavorites } from "../../favorites/hooks/useFavorites";
import { getProductById } from "../services/productService";

function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState("");
  const { data, loading } = useAsyncData(() => getProductById(productId), [productId]);

  if (loading) return <LoadingState label="Loading product details..." />;
  if (!data) {
    return (
      <PageSection eyebrow="Product" title="Product not found" subtitle="This product is unavailable or no longer exists.">
        <NotFoundState title="Product not found" description="Try browsing current categories or explore our live offers instead." primaryAction={{ label: "Browse categories", to: "/categories" }} secondaryAction={{ label: "Open offers", to: "/offers" }} />
      </PageSection>
    );
  }

  const { product, reviews, relatedProducts, recentlyViewed } = data;
  const saved = isFavorite(product.id);
  const ratingBreakdown = useMemo(
    () => [5, 4, 3, 2, 1].map((rating) => ({ rating, count: reviews.filter((review) => Math.round(review.rating) === rating).length })),
    [reviews],
  );

  return (
    <PageSection eyebrow={product.categoryName} title={product.name} subtitle={product.shortDescription}>
      <div className="product-page-grid">
        <div className="product-gallery-shell">
          <div className="product-gallery">
            <img src={product.gallery[activeImage]} alt={product.name} />
          </div>
          <div className="thumbnail-row">
            {product.gallery.map((image, index) => (
              <button key={image} className={`thumbnail${activeImage === index ? " active" : ""}`} type="button" onClick={() => setActiveImage(index)}>
                <img src={image} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-panel">
          <div className="product-meta-row">
            <span className="badge badge-accent">{product.badge}</span>
            <span className={`badge badge-stock ${product.stockState}`}>{product.stockState.replace("-", " ")}</span>
          </div>
          <div className="rating-row">
            <span>★★★★★</span>
            <small>{product.rating} rating · {product.reviewCount} reviews</small>
          </div>
          <div className="price-stack large">
            <strong>${product.price.toFixed(2)}</strong>
            <span>${product.compareAtPrice.toFixed(2)}</span>
          </div>
          <p className="section-subtitle">{product.description}</p>
          <div className="chip-row">
            {product.variants.map((variant) => (
              <button key={variant} className={`chip${selectedVariant === variant ? " active" : ""}`} type="button" onClick={() => setSelectedVariant(variant)}>
                {variant}
              </button>
            ))}
          </div>
          <div className="quantity-picker">
            <button className="icon-button" type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</button>
            <strong>{quantity}</strong>
            <button className="icon-button" type="button" onClick={() => setQuantity((value) => value + 1)}>+</button>
          </div>
          <div className="product-actions">
            <button className="button primary" type="button" onClick={() => addToCart(product, quantity)}>Add to cart</button>
            <button className="button secondary" type="button" onClick={() => { addToCart(product, quantity); navigate("/checkout"); }}>Buy now</button>
            <button className="button ghost" type="button" onClick={() => toggleFavorite(product)}>{saved ? "Saved to wishlist" : "Add to wishlist"}</button>
          </div>
          <div className="product-info-list">
            <div><strong>Shipping</strong><span>{product.shipping}</span></div>
            <div><strong>Returns</strong><span>{product.returns}</span></div>
            <div><strong>Seller</strong><span>{product.seller}</span></div>
          </div>
        </div>
      </div>

      <div className="tab-shell">
        <div className="offers-tabs">
          {["description", "specifications", "reviews", "faq"].map((tab) => (
            <button key={tab} className={`offer-tab${activeTab === tab ? " active" : ""}`} type="button" onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>

        {activeTab === "description" ? (
          <div className="summary-box">
            <h3>Product highlights</h3>
            <div className="list-stack compact">
              {product.highlights.map((item) => <div key={item} className="list-card compact-row"><span>{item}</span></div>)}
            </div>
          </div>
        ) : null}

        {activeTab === "specifications" ? (
          <div className="summary-box">
            <h3>Specifications</h3>
            <div className="list-stack compact">
              {Object.entries(product.specifications).map(([label, value]) => (
                <div key={label} className="price-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === "reviews" ? (
          <div className="review-layout">
            <div className="summary-box">
              <h3>Average rating</h3>
              <div className="price-stack large">
                <strong>{product.rating}</strong>
                <span>{product.reviewCount} verified reviews</span>
              </div>
              {ratingBreakdown.map((item) => (
                <div key={item.rating} className="price-row">
                  <span>{item.rating} stars</span>
                  <strong>{item.count}</strong>
                </div>
              ))}
            </div>
            <div className="list-stack">
              {reviews.map((review) => (
                <article key={review.id} className="review-card">
                  <div className="price-row">
                    <strong>{review.title}</strong>
                    <span>{review.date}</span>
                  </div>
                  <div className="rating-row"><span>{"★".repeat(review.rating)}</span><small>{review.author} {review.verified ? "· Verified" : ""}</small></div>
                  <p>{review.body}</p>
                  {review.reply ? <div className="support-reply"><strong>Support reply</strong><p>{review.reply}</p></div> : null}
                </article>
              ))}
              <form className="summary-box">
                <h3>Write a review</h3>
                <label className="field"><span>Headline</span><input type="text" placeholder="Share your quick take" /></label>
                <label className="field"><span>Review</span><textarea rows="4" placeholder="What stood out about the product?" /></label>
                <button className="button primary" type="button">Submit review</button>
              </form>
            </div>
          </div>
        ) : null}

        {activeTab === "faq" ? (
          <div className="summary-box">
            <h3>Frequently asked questions</h3>
            <div className="faq-list">
              <details open><summary>How quickly will this ship?</summary><p>{product.shipping}</p></details>
              <details><summary>Can I return or exchange it?</summary><p>{product.returns}</p></details>
              <details><summary>Is support available after purchase?</summary><p>Yes. Order support and live chat stay available from the account and support pages.</p></details>
            </div>
          </div>
        ) : null}
      </div>

      <div className="section-block">
        <SectionTitle title="Related products" />
        <div className="product-grid">{relatedProducts.map((item) => <ProductCard key={item.id} product={item} />)}</div>
      </div>
      <div className="section-block">
        <SectionTitle title="Recently viewed style picks" />
        <div className="product-grid">{recentlyViewed.map((item) => <ProductCard key={item.id} product={item} compact />)}</div>
      </div>
    </PageSection>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="section-heading">
      <div><h2>{title}</h2></div>
    </div>
  );
}

export default ProductPage;
