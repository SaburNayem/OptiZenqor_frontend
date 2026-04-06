import { useParams } from "react-router-dom";
import PageSection from "../../../components/common/PageSection";
import NotFoundState from "../../../components/feedback/NotFoundState";
import { getOrderById } from "../../../data/mockStorefront";

function OrderTrackingPage() {
  const { orderId } = useParams();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <PageSection eyebrow="Tracking" title="Order not found" subtitle="This tracking view is unavailable.">
        <NotFoundState title="Tracking unavailable" description="Return to your orders and choose another shipment." primaryAction={{ label: "My orders", to: "/orders" }} secondaryAction={{ label: "Support", to: "/support" }} />
      </PageSection>
    );
  }

  return (
    <PageSection eyebrow="Order Tracking" title={`${order.number} timeline`} subtitle={`Estimated delivery: ${order.estimatedDelivery}`}>
      <div className="tracking-layout">
        <section className="summary-box">
          <h3>Tracking progress</h3>
          <div className="timeline-list">
            {order.timeline.map((step, index) => (
              <div key={step} className="timeline-item">
                <span>{index + 1}</span>
                <div>
                  <strong>{step}</strong>
                  <p>Updated from your live order workflow and ready for backend integration later.</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <aside className="summary-box">
          <h3>Need help?</h3>
          <p>Support can help with delivery windows, returns, missing packages, and address changes.</p>
          <button className="button primary full-width" type="button">Chat with support</button>
        </aside>
      </div>
    </PageSection>
  );
}

export default OrderTrackingPage;
