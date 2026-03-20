import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageSection from "../components/common/PageSection";

function CheckoutPage({ cart, clearCart }) {
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = cart.length ? 4.99 : 0;
  const total = subtotal + delivery;

  return (
    <PageSection
      eyebrow="Checkout"
      title="Secure checkout"
      subtitle="Shipping, order recap, and payment summary in a website-style two-column layout."
    >
      {placed ? (
        <div className="success-banner">
          Order placed successfully. Your cart has been cleared and you are being sent back to the homepage.
        </div>
      ) : null}
      <div className="checkout-grid">
        <section className="summary-box">
          <h3>Shipping Address</h3>
          <p>House 12, Road 4, Mirpur 1, Dhaka</p>
          <p>Phone: +880 1700 000000</p>
          <p>Email: support@yourapp.com</p>
        </section>
        <section className="summary-box">
          <h3>Order Items</h3>
          <div className="list-stack compact">
            {cart.length === 0 ? (
              <div className="empty-state">Your cart is empty. Add items before checkout.</div>
            ) : (
              cart.map((item) => (
                <div className="price-row" key={item.product.id}>
                  <span>
                    {item.product.name} x{item.quantity}
                  </span>
                  <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))
            )}
          </div>
        </section>
        <section className="summary-box">
          <h3>Payment Summary</h3>
          <div className="price-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="price-row">
            <span>Delivery</span>
            <strong>${delivery.toFixed(2)}</strong>
          </div>
          <div className="price-row total-row">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button
            className="button primary full-width"
            type="button"
            disabled={cart.length === 0}
            onClick={() => {
              setPlaced(true);
              clearCart();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.setTimeout(() => navigate("/"), 1200);
            }}
          >
            Place Order
          </button>
        </section>
      </div>
    </PageSection>
  );
}

export default CheckoutPage;
