import { useParams } from "react-router-dom";
import PageSection from "../../../components/common/PageSection";
import LoadingState from "../../../components/feedback/LoadingState";
import NotFoundState from "../../../components/feedback/NotFoundState";
import ErrorState from "../../../components/feedback/ErrorState";
import useAsyncData from "../../../hooks/useAsyncData";
import { getOrderById } from "../services/orderService";

function OrderTrackingPage() {
  const { orderId } = useParams();
  const { data: order, loading, error, reload } = useAsyncData(() => getOrderById(orderId), [orderId]);

  if (loading) {
    return <PageSection eyebrow="Tracking" title="Loading tracking" subtitle="Preparing your live order timeline."><LoadingState label="Loading tracking..." /></PageSection>;
  }

  if (error) {
    return <PageSection eyebrow="Tracking" title="Tracking unavailable" subtitle="This tracking view is unavailable."><ErrorState title="Tracking unavailable" description={error.message || "Please try again."} onRetry={reload} /></PageSection>;
  }

  if (!order) {
    return (
      <PageSection eyebrow="Tracking" title="Order not found" subtitle="This tracking view is unavailable.">
        <NotFoundState title="Tracking unavailable" description="Return to your orders and choose another shipment." primaryAction={{ label: "My orders", to: "/orders" }} secondaryAction={{ label: "Support", to: "/support" }} />
      </PageSection>
    );
  }

  return (
    <PageSection eyebrow="Order Tracking" title={`${order.number} timeline`} subtitle={`Current status: ${order.status}`}>
      <div className="tracking-layout">
        <section className="summary-box">
          <h3>Tracking progress</h3>
          <div className="timeline-list">
            {order.timeline.map((step, index) => (
              <div key={step} className="timeline-item">
                <span>{index + 1}</span>
                <div>
                  <strong>{step}</strong>
                  <p>Updated from your live backend order workflow.</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <aside className="summary-box">
          <h3>Need help?</h3>
          <p>Support can help with delivery windows, returns, missing packages, and address changes.</p>
          <a className="button primary full-width" href="/support">Chat with support</a>
        </aside>
      </div>
    </PageSection>
  );
}

export default OrderTrackingPage;
