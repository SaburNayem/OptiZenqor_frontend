import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageSection from "../../../components/common/PageSection";
import LoadingState from "../../../components/feedback/LoadingState";
import ErrorState from "../../../components/feedback/ErrorState";
import { checkoutSteps } from "../../../constants/navigation";
import useAsyncData from "../../../hooks/useAsyncData";
import { getAccountOverview } from "../../../services/accountService";
import { useCart } from "../../cart/hooks/useCart";
import { placeOrder } from "../services/checkoutService";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, subtotal, delivery, total, clearCart } = useCart();
  const { data: account, loading, error, reload } = useAsyncData(getAccountOverview, []);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedShipping, setSelectedShipping] = useState("Express");
  const [selectedPayment, setSelectedPayment] = useState("backend");
  const [placing, setPlacing] = useState(false);

  const addresses = account?.addresses || [];
  const chosenAddress = useMemo(
    () => addresses.find((address) => address.id === selectedAddress) ?? addresses[0],
    [addresses, selectedAddress],
  );

  async function handlePlaceOrder() {
    if (!chosenAddress) return;

    setPlacing(true);
    await placeOrder({
      addressId: chosenAddress.id,
      deliveryFee: delivery,
      selectedShipping,
      selectedPayment,
    });
    await clearCart();
    navigate("/orders");
  }

  if (loading) {
    return <PageSection eyebrow="Checkout" title="Loading checkout" subtitle="Preparing your address and order details."><LoadingState label="Loading checkout..." /></PageSection>;
  }

  if (error) {
    return <PageSection eyebrow="Checkout" title="Checkout unavailable" subtitle="We couldn't prepare checkout."><ErrorState title="Checkout unavailable" description={error.message || "Please try again."} onRetry={reload} /></PageSection>;
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
          <div className="price-row"><h3>Delivery address</h3><button className="button ghost small" type="button">Saved in account</button></div>
          <div className="address-grid">
            {addresses.map((address) => (
              <button key={address.id} className={`address-card${(selectedAddress || chosenAddress?.id) === address.id ? " active" : ""}`} type="button" onClick={() => setSelectedAddress(address.id)}>
                <strong>{address.label}</strong>
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
          <div className="price-row"><h3>Payment method</h3><button className="button ghost small" type="button">Managed by backend</button></div>
          <div className="option-grid">
            <button className="option-card active" type="button" onClick={() => setSelectedPayment("backend")}>
              <strong>Backend payment state</strong>
              <span>Tracked through order payment status</span>
            </button>
          </div>
          <div className="security-note">Secure checkout. Payment details are protected by the backend order flow.</div>
        </section>

        <aside className="summary-box sticky-summary">
          <h3>Order summary</h3>
          <div className="list-stack compact">
            {cart.map((item) => (
              <div className="price-row" key={item.id || item.product.id}>
                <span>{item.product.name} x{item.quantity}</span>
                <strong>BDT {(item.product.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))}
          </div>
          <div className="price-row"><span>Ship to</span><strong>{chosenAddress?.label || "No address"}</strong></div>
          <div className="price-row"><span>Subtotal</span><strong>BDT {subtotal.toFixed(2)}</strong></div>
          <div className="price-row"><span>Shipping</span><strong>BDT {delivery.toFixed(2)}</strong></div>
          <div className="price-row total-row"><span>Total</span><strong>BDT {total.toFixed(2)}</strong></div>
          <button className="button primary full-width" type="button" onClick={handlePlaceOrder} disabled={!cart.length || !chosenAddress || placing}>
            {placing ? "Placing order..." : "Place order"}
          </button>
        </aside>
      </div>
    </PageSection>
  );
}

export default CheckoutPage;
