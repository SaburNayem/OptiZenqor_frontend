import { Link, useParams } from "react-router-dom";
import PageSection from "../../../components/common/PageSection";
import LoadingState from "../../../components/feedback/LoadingState";
import NotFoundState from "../../../components/feedback/NotFoundState";
import ErrorState from "../../../components/feedback/ErrorState";
import useAsyncData from "../../../hooks/useAsyncData";
import { getOrderById } from "../services/orderService";

function OrderDetailsPage() {
  const { orderId } = useParams();
  const { data: order, loading, error, reload } = useAsyncData(() => getOrderById(orderId), [orderId]);

  if (loading) {
    return <PageSection eyebrow="Order details" title="Loading order details" subtitle="Preparing your live order data."><LoadingState label="Loading order details..." /></PageSection>;
  }

  if (error) {
    return <PageSection eyebrow="Order details" title="Order unavailable" subtitle="We couldn't load this order."><ErrorState title="Order unavailable" description={error.message || "Please try again."} onRetry={reload} /></PageSection>;
  }

  if (!order) {
    return (
      <PageSection eyebrow="Order details" title="Order not found" subtitle="This order ID does not match any current order.">
        <NotFoundState title="Order not found" description="Return to your order list and choose another order." primaryAction={{ label: "My orders", to: "/orders" }} secondaryAction={{ label: "Account", to: "/account" }} />
      </PageSection>
    );
  }

  return (
    <PageSection eyebrow="Order details" title={order.number} subtitle={`Status: ${order.status}`}>
      <div className="info-panel-grid">
        <section className="summary-box">
          <h3>Items</h3>
          <div className="list-stack">
            {order.items.map((item) => (
              <div key={item.id} className="list-card">
                <img src={item.product.imageUrl} alt={item.product.name} />
                <div className="list-copy">
                  <strong>{item.product.name}</strong>
                  <p>{item.product.shortDescription}</p>
                </div>
                <div className="list-actions">
                  <strong>x{item.quantity}</strong>
                  <span>BDT {(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="summary-box">
          <h3>Invoice summary</h3>
          <div className="price-row"><span>Subtotal</span><strong>BDT {order.subtotal.toFixed(2)}</strong></div>
          <div className="price-row"><span>Shipping</span><strong>BDT {order.shippingFee.toFixed(2)}</strong></div>
          <div className="price-row total-row"><span>Total</span><strong>BDT {order.total.toFixed(2)}</strong></div>
          <div className="security-note">Payment state: {order.paymentMethod}</div>
          <div className="inline-controls">
            <Link className="button ghost small" to={`/orders/${order.id}/tracking`}>Track order</Link>
            <Link className="button ghost small" to="/support">Support</Link>
          </div>
        </aside>
      </div>
    </PageSection>
  );
}

export default OrderDetailsPage;
