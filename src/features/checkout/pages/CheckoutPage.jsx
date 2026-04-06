import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageSection from "../../../components/common/PageSection";
import { checkoutSteps } from "../../../constants/navigation";
import { addresses, paymentMethods } from "../../../data/mockStorefront";
import { useCart } from "../../cart/hooks/useCart";
import { placeOrder } from "../services/checkoutService";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, subtotal, delivery, total, clearCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id ?? "");
  const [selectedShipping, setSelectedShipping] = useState("Express");
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]?.id ?? "");
  const [placing, setPlacing] = useState(false);

  const chosenAddress = useMemo(
    () => addresses.find((address) => address.id === selectedAddress) ?? addresses[0],
    [selectedAddress],
  );

  async function handlePlaceOrder() {
    setPlacing(true);
    await placeOrder({ cart, selectedAddress, selectedShipping, selectedPayment });
    clearCart();
    navigate("/orders");
  }

  return (
    <PageSection eyebrow="Checkout" title="Premium multi-step checkout" subtitle="Address, shipping, payment, and review surfaces tuned for speed and trust.">
      <div className="checkout-steps">
        {checkoutSteps.map((step, index) => (
          <div key={step} className={`checkout-step${index === 3 ? " active" : ""}`}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>

      <div className="checkout-grid">
        <section className="summary-box">
          <div className="price-row"><h3>Delivery address</h3><button className="button ghost small" type="button">Add new</button></div>
          <div className="address-grid">
            {addresses.map((address) => (
              <button key={address.id} className={`address-card${selectedAddress === address.id ? " active" : ""}`} type="button" onClick={() => setSelectedAddress(address.id)}>
                <strong>{address.label}</strong>
                <span>{address.name}</span>
                <span>{address.line1}</span>
                <span>{address.city}, {address.country}</span>
                {address.primary ? <small>Default</small> : null}
              </button>
            ))}
          </div>
        </section>

        <section className="summary-box">
          <h3>Shipping method</h3>
          <div className="option-grid">
            {["Express", "Standard", "Scheduled"].map((option) => (
              <button key={option} className={`option-card${selectedShipping === option ? " active" : ""}`} type="button" onClick={() => setSelectedShipping(option)}>
                <strong>{option}</strong>
                <span>{option === "Express" ? "1-2 business days" : option === "Standard" ? "3-5 business days" : "Choose a preferred slot"}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="summary-box">
          <div className="price-row"><h3>Payment method</h3><button className="button ghost small" type="button">Manage cards</button></div>
          <div className="option-grid">
            {paymentMethods.map((method) => (
              <button key={method.id} className={`option-card${selectedPayment === method.id ? " active" : ""}`} type="button" onClick={() => setSelectedPayment(method.id)}>
                <strong>{method.label}</strong>
                <span>{method.expires}</span>
              </button>
            ))}
          </div>
          <div className="security-note">Secure checkout. Payment details are protected and can be saved for faster reorder flow.</div>
        </section>

        <aside className="summary-box sticky-summary">
          <h3>Order summary</h3>
          <div className="list-stack compact">
            {cart.map((item) => (
              <div className="price-row" key={item.product.id}>
                <span>{item.product.name} x{item.quantity}</span>
                <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))}
          </div>
          <div className="price-row"><span>Ship to</span><strong>{chosenAddress?.label}</strong></div>
          <div className="price-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
          <div className="price-row"><span>Shipping</span><strong>${delivery.toFixed(2)}</strong></div>
          <div className="price-row total-row"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
          <button className="button primary full-width" type="button" onClick={handlePlaceOrder} disabled={!cart.length || placing}>
            {placing ? "Placing order..." : "Place order"}
          </button>
        </aside>
      </div>
    </PageSection>
  );
}

export default CheckoutPage;
