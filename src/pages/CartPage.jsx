import { Link } from "react-router-dom";
import PageSection from "../components/common/PageSection";

function CartPage({ cart, updateCartQuantity, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <PageSection
      eyebrow="Cart"
      title="Review your order"
      subtitle="A desktop order summary with line items and totals."
    >
      <div className="cart-layout">
        <div className="list-stack">
          {cart.length === 0 ? (
            <div className="empty-state">Your cart is empty. Add products from the shop to continue.</div>
          ) : (
            cart.map((item) => (
              <article className="list-card" key={item.product.id}>
                <img src={item.product.imageUrl} alt={item.product.name} />
                <div className="list-copy">
                  <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                  <p>{item.product.categoryName}</p>
                  <div className="inline-controls">
                    <button
                      className="icon-button"
                      type="button"
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <small>Qty: {item.quantity}</small>
                    <button
                      className="icon-button"
                      type="button"
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="button ghost small"
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
              </article>
            ))
          )}
        </div>
        <aside className="summary-box">
          <h3>Order Summary</h3>
          <div className="price-row">
            <span>Subtotal</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <div className="price-row">
            <span>Delivery</span>
            <strong>$4.99</strong>
          </div>
          <div className="price-row total-row">
            <span>Total</span>
            <strong>${(total + (cart.length ? 4.99 : 0)).toFixed(2)}</strong>
          </div>
          <Link className="button primary full-width" to="/checkout">
            Proceed To Checkout
          </Link>
        </aside>
      </div>
    </PageSection>
  );
}

export default CartPage;
