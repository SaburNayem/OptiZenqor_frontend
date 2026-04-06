import { Link, useParams } from "react-router-dom";
import PageSection from "../../../components/common/PageSection";
import NotFoundState from "../../../components/feedback/NotFoundState";
import { getOrderById } from "../../../data/mockStorefront";

function OrderDetailsPage() {
  const { orderId } = useParams();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <PageSection eyebrow="Order details" title="Order not found" subtitle="This order ID does not match any current mock order.">
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
              <div key={item.product.id} className="list-card">
                <img src={item.product.imageUrl} alt={item.product.name} />
                <div className="list-copy">
                  <strong>{item.product.name}</strong>
                  <p>{item.product.shortDescription}</p>
                </div>
                <div className="list-actions">
                  <strong>x{item.quantity}</strong>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="summary-box">
          <h3>Invoice summary</h3>
          <div className="price-row"><span>Subtotal</span><strong>${order.subtotal.toFixed(2)}</strong></div>
          <div className="price-row"><span>Shipping</span><strong>${order.shippingFee.toFixed(2)}</strong></div>
          <div className="price-row total-row"><span>Total</span><strong>${order.total.toFixed(2)}</strong></div>
          <div className="security-note">Paid via {order.paymentMethod}</div>
          <div className="inline-controls">
            <button className="button primary small" type="button">Reorder</button>
            <button className="button ghost small" type="button">Return / cancel</button>
            <Link className="button ghost small" to={`/orders/${order.id}/tracking`}>Track order</Link>
          </div>
        </aside>
      </div>
    </PageSection>
  );
}

export default OrderDetailsPage;
