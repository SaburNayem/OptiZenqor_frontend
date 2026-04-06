import PageSection from "../../../components/common/PageSection";
import { orders } from "../../../data/mockStorefront";

function OrderHistoryPage() {
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
              <strong>${order.total.toFixed(2)}</strong>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}

export default OrderHistoryPage;
