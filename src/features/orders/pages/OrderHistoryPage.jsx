import PageSection from "../../../components/common/PageSection";
import LoadingState from "../../../components/feedback/LoadingState";
import ErrorState from "../../../components/feedback/ErrorState";
import useAsyncData from "../../../hooks/useAsyncData";
import { getMyOrders } from "../services/orderService";

function OrderHistoryPage() {
  const { data, loading, error, reload } = useAsyncData(getMyOrders, []);

  if (loading) {
    return <PageSection eyebrow="Order History" title="Loading order history" subtitle="Preparing your completed purchases."><LoadingState label="Loading order history..." /></PageSection>;
  }

  if (error) {
    return <PageSection eyebrow="Order History" title="Order history unavailable" subtitle="We couldn't load your history."><ErrorState title="Order history unavailable" description={error.message || "Please try again."} onRetry={reload} /></PageSection>;
  }

  const orders = data || [];

  return (
    <PageSection eyebrow="Order History" title="Past purchases with invoice-friendly summaries" subtitle="Responsive order history cards replace dense tables on smaller screens.">
      <div className="list-stack">
        {orders.map((order) => (
          <article key={order.id} className="summary-box">
            <div className="price-row">
              <strong>{order.number}</strong>
              <span>{order.status}</span>
            </div>
            <div className="price-row">
              <span>Placed</span>
              <strong>{order.placedAt}</strong>
            </div>
            <div className="price-row">
              <span>Total</span>
              <strong>BDT {order.total.toFixed(2)}</strong>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}

export default OrderHistoryPage;
