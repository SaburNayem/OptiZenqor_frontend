import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../../components/feedback/EmptyState";
import PageSection from "../../../components/common/PageSection";
import { useCart } from "../../cart/hooks/useCart";
import { placeOrder } from "../services/checkoutService";
import { isEmail, validateMinLength, validateRequired } from "../../../utils/validation";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  note: "",
};

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, subtotal, delivery, total, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const checkoutItems = useMemo(() => cart.map((item) => item.product.id), [cart]);

  function validateForm() {
    const nextErrors = {};

    if (!validateRequired(form.fullName)) nextErrors.fullName = "Full name is required.";
    if (!isEmail(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!validateMinLength(form.phone, 7)) nextErrors.phone = "Enter a valid phone number.";
    if (!validateMinLength(form.address, 8)) nextErrors.address = "Enter a fuller address.";
    if (!validateRequired(form.city)) nextErrors.city = "City is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function submitOrder() {
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    await placeOrder({ ...form, items: cart });
    setPlaced(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => navigate("/"), 1200);
  }

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
          <label className="field">
            <span>Full Name</span>
            <input
              type="text"
              value={form.fullName}
              onChange={(event) => setForm({ ...form, fullName: event.target.value })}
            />
            {errors.fullName ? <small className="field-error">{errors.fullName}</small> : null}
          </label>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
            {errors.email ? <small className="field-error">{errors.email}</small> : null}
          </label>
          <label className="field">
            <span>Phone</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
            />
            {errors.phone ? <small className="field-error">{errors.phone}</small> : null}
          </label>
          <label className="field">
            <span>Address</span>
            <input
              type="text"
              value={form.address}
              onChange={(event) => setForm({ ...form, address: event.target.value })}
            />
            {errors.address ? <small className="field-error">{errors.address}</small> : null}
          </label>
          <label className="field">
            <span>City</span>
            <input
              type="text"
              value={form.city}
              onChange={(event) => setForm({ ...form, city: event.target.value })}
            />
            {errors.city ? <small className="field-error">{errors.city}</small> : null}
          </label>
          <label className="field">
            <span>Delivery Note</span>
            <input
              type="text"
              value={form.note}
              onChange={(event) => setForm({ ...form, note: event.target.value })}
            />
          </label>
        </section>
        <section className="summary-box">
          <h3>Order Items</h3>
          <div className="list-stack compact">
            {cart.length === 0 ? (
              <EmptyState
                title="Cart required for checkout"
                description="Add at least one product before placing an order."
                action={{ label: "Return to shop", to: "/shop" }}
              />
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
          <p className="section-subtitle">Items ready for order: {checkoutItems.length}</p>
          <button
            className="button primary full-width"
            type="button"
            disabled={cart.length === 0 || submitting}
            onClick={submitOrder}
          >
            {submitting ? "Placing Order..." : "Place Order"}
          </button>
        </section>
      </div>
    </PageSection>
  );
}

export default CheckoutPage;
