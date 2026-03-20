import { Link, useParams } from "react-router-dom";
import PageSection from "../components/common/PageSection";
import { featuredProducts, popularProducts } from "../data";

function DrawerInfoPage() {
  const { slug } = useParams();
  const page = slug ?? "";
  const decoded = page
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  const sampleOrders = [
    { id: "#123456", date: "March 8, 2025", status: "Delivered", amount: "$20.00", product: featuredProducts[0] },
    { id: "#123457", date: "March 5, 2025", status: "Cancelled", amount: "$20.00", product: featuredProducts[1] },
    { id: "#123458", date: "March 1, 2025", status: "Processing", amount: "$35.00", product: popularProducts[2] },
  ];

  if (decoded === "Order History") {
    return (
      <PageSection eyebrow="Drawer Section" title="Order History" subtitle="Grouped order history similar to the original drawer page.">
        <div className="orders-grid">
          {sampleOrders.map((order) => (
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

  const infoContent = {
    Support: {
      title: "Support",
      body: "Talk to our support team about orders, payment, delivery, or product issues. This restores the support destination from your drawer flow.",
    },
    Review: {
      title: "Review",
      body: "Share your experience with recent products and help improve the storefront. This page stands in for the review section from the app.",
    },
    Help: {
      title: "Help",
      body: "Browse quick answers about ordering, returns, payments, delivery windows, and account usage.",
    },
    "About Us": {
      title: "About Us",
      body: "Shob Bazaar is presented here as a polished ecommerce storefront that keeps the same app content while shifting it into a more modern web experience.",
    },
    Logout: {
      title: "Logout",
      body: "Use the sign in page to re-enter the storefront after leaving your account session.",
    },
  };

  const data = infoContent[decoded] ?? {
    title: decoded || "Info",
    body: "This page restores one of the original drawer destinations.",
  };

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
