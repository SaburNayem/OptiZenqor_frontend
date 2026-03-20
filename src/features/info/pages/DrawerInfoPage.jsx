import { Link, useParams } from "react-router-dom";
import ErrorState from "../../../components/feedback/ErrorState";
import LoadingState from "../../../components/feedback/LoadingState";
import NotFoundState from "../../../components/feedback/NotFoundState";
import PageSection from "../../../components/common/PageSection";
import useAsyncData from "../../../hooks/useAsyncData";
import { getInfoPageBySlug } from "../../../services/infoService";

function DrawerInfoPage() {
  const { slug } = useParams();
  const { data, loading, error, reload } = useAsyncData(() => getInfoPageBySlug(slug), [slug]);

  if (loading) {
    return <LoadingState label="Loading info page..." />;
  }

  if (error) {
    return (
      <PageSection eyebrow="Drawer Section" title="Info unavailable" subtitle="This drawer page could not be loaded.">
        <ErrorState
          title="Drawer page failed to load"
          description="Please try the drawer page again."
          onRetry={reload}
        />
      </PageSection>
    );
  }

  if (!data) {
    return (
      <PageSection eyebrow="Drawer Section" title="Page not found" subtitle="The requested drawer destination does not exist.">
        <NotFoundState
          title="Invalid drawer link"
          description="That drawer destination is not part of the current storefront setup."
          primaryAction={{ label: "Open account", to: "/account" }}
          secondaryAction={{ label: "Back to home", to: "/" }}
        />
      </PageSection>
    );
  }

  if (data.type === "orders") {
    return (
      <PageSection eyebrow="Drawer Section" title={data.title} subtitle={data.body}>
        <div className="orders-grid">
          {data.orders.map((order) => (
            <Link className="order-card" key={order.id} to={`/product/${order.product.id}`}>
              <img src={order.product.imageUrl} alt={order.product.name} />
              <div>
                <h3>{order.product.name}</h3>
                <p>{order.id}</p>
                <p>{order.date}</p>
                <div className="price-row">
                  <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
                  <strong>{order.amount}</strong>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection eyebrow="Drawer Section" title={data.title} subtitle={data.body}>
      <div className="info-panel-grid">
        <div className="summary-box">
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </div>
        <div className="summary-box">
          <h3>Quick Actions</h3>
          <Link className="button primary full-width" to="/shop">
            Continue Shopping
          </Link>
          <Link className="button ghost full-width" to="/account">
            Open Account
          </Link>
        </div>
      </div>
    </PageSection>
  );
}

export default DrawerInfoPage;
