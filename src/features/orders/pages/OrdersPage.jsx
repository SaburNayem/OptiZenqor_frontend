import { Link } from "react-router-dom";
import PageSection from "../../../components/common/PageSection";
import LoadingState from "../../../components/feedback/LoadingState";
import ErrorState from "../../../components/feedback/ErrorState";
import EmptyState from "../../../components/feedback/EmptyState";
import { orderStatuses } from "../../../constants/navigation";
import useAsyncData from "../../../hooks/useAsyncData";
import { getMyOrders } from "../services/orderService";

function OrdersPage() {
  const { data, loading, error, reload } = useAsyncData(getMyOrders, []);

  if (loading) {
    return <PageSection eyebrow="My Orders" title="Loading your orders" subtitle="Preparing your live order list."><LoadingState label="Loading orders..." /></PageSection>;
  }

  if (error) {
    return <PageSection eyebrow="My Orders" title="Orders unavailable" subtitle="We couldn't load your current orders."><ErrorState title="Orders unavailable" description={error.message || "Please try again."} onRetry={reload} /></PageSection>;
  }

  const orders = data || [];

  return (
    <PageSection eyebrow="My Orders" title="Order tracking and action-ready order cards" subtitle="Designed for clear statuses, fast reorder, and low-friction support follow-up.">
      <div className="offers-tabs">
        {orderStatuses.map((status) => <button key={status} className="offer-tab" type="button">{status}</button>)}
      </div>
      <div className="orders-grid">
        {orders.length === 0 ? (
          <EmptyState title="No orders yet" description="Complete checkout from your cart to start your order history." action={{ label: "Browse products", to: "/shop" }} />
        ) : (
          orders.map((order) => (
            <article className="order-card" key={order.id}>
              <img src={order.items[0]?.product.imageUrl} alt={order.items[0]?.product.name || order.number} />
              <div>
                <div className="price-row">
                  <strong>{order.number}</strong>
                  <span className="badge badge-stock in-stock">{order.status}</span>
                </div>
                <p>{order.placedAt}</p>
                <p>{order.items.length} items · Total BDT {order.total.toFixed(2)}</p>
                <div className="inline-controls">
                  <Link className="button primary small" to={`/orders/${order.id}`}>Order details</Link>
                  <Link className="button ghost small" to={`/orders/${order.id}/tracking`}>Track</Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </PageSection>
  );
}

export default OrdersPage;
