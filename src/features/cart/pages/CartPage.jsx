import { Link } from "react-router-dom";
import EmptyState from "../../../components/feedback/EmptyState";
import PageSection from "../../../components/common/PageSection";
import { useCart } from "../hooks/useCart";

function CartPage() {
  const { cart, subtotal, delivery, total, updateCartQuantity, removeFromCart } = useCart();

  return (
    <PageSection eyebrow="Cart" title="Review your bag before checkout" subtitle="Desktop stays two-column while mobile stacks line items and keeps a strong checkout CTA.">
      <div className="cart-layout">
        <div className="list-stack">
          {cart.length === 0 ? (
            <EmptyState title="Your cart is currently empty" description="Add a few items and return here when you are ready to check out." action={{ label: "Browse products", to: "/shop" }} />
          ) : (
            cart.map((item) => (
              <article className="list-card" key={item.product.id}>
                <img src={item.product.imageUrl} alt={item.product.name} />
                <div className="list-copy">
                  <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                  <p>{item.product.shortDescription}</p>
                  <div className="inline-controls">
                    <button className="icon-button" type="button" onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}>-</button>
                    <small>Qty {item.quantity}</small>
                    <button className="icon-button" type="button" onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="list-actions">
                  <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
                  <button className="button ghost small" type="button" onClick={() => removeFromCart(item.product.id)}>Remove</button>
                </div>
              </article>
            ))
          )}
        </div>

        <aside className="summary-box sticky-summary">
          <h3>Order summary</h3>
          <label className="field">
            <span>Promo code</span>
            <input type="text" placeholder="Enter coupon or gift code" />
          </label>
          <div className="price-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
          <div className="price-row"><span>Shipping fee</span><strong>${delivery.toFixed(2)}</strong></div>
          <div className="price-row total-row"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
          <Link className="button primary full-width" to="/checkout">Proceed to checkout</Link>
          <Link className="button ghost full-width" to="/shop">Continue shopping</Link>
        </aside>
      </div>
    </PageSection>
  );
}

export default CartPage;
