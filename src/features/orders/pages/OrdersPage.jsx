import { Link } from "react-router-dom";
import PageSection from "../../../components/common/PageSection";
import { orderStatuses } from "../../../constants/navigation";
import { orders } from "../../../data/mockStorefront";

function OrdersPage() {
  return (
    <PageSection eyebrow="My Orders" title="Order tracking and action-ready order cards" subtitle="Designed for clear statuses, fast reorder, and low-friction support follow-up.">
      <div className="offers-tabs">
        {orderStatuses.map((status) => <button key={status} className="offer-tab" type="button">{status}</button>)}
      </div>
      <div className="orders-grid">
        {orders.map((order) => (
          <article className="order-card" key={order.id}>
            <img src={order.items[0].product.imageUrl} alt={order.items[0].product.name} />
            <div>
              <div className="price-row">
                <strong>{order.number}</strong>
                <span className="badge badge-stock in-stock">{order.status}</span>
              </div>
              <p>{order.placedAt}</p>
              <p>{order.items.length} items · Total ${order.total.toFixed(2)}</p>
              <div className="inline-controls">
                <Link className="button primary small" to={`/orders/${order.id}`}>Order details</Link>
                <Link className="button ghost small" to={`/orders/${order.id}/tracking`}>Track</Link>
                <button className="button ghost small" type="button">Reorder</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}

export default OrdersPage;
