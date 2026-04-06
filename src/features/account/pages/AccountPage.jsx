import { Link } from "react-router-dom";
import PageSection from "../../../components/common/PageSection";
import LoadingState from "../../../components/feedback/LoadingState";
import useAsyncData from "../../../hooks/useAsyncData";
import { getAccountOverview } from "../../../services/accountService";

function AccountPage() {
  const { data, loading } = useAsyncData(getAccountOverview, []);

  if (loading || !data) {
    return (
      <PageSection eyebrow="Account" title="Loading account overview" subtitle="Preparing profile, addresses, orders, and settings preview.">
        <LoadingState label="Loading your account..." />
      </PageSection>
    );
  }

  return (
    <PageSection eyebrow="Account" title="A complete customer account hub" subtitle="Profile, saved details, quick actions, and support shortcuts in one premium dashboard.">
      <section className="account-hero">
        <div className="account-hero-main">
          <img src={data.profile.avatarUrl} alt={data.profile.name} />
          <div>
            <h2>{data.profile.name}</h2>
            <p>{data.profile.email}</p>
            <div className="chip-row">
              <span className="chip active">{data.profile.loyaltyTier}</span>
              <span className="chip">Member since {data.profile.memberSince}</span>
            </div>
          </div>
        </div>
        <Link className="button primary" to="/settings">Manage settings</Link>
      </section>

      <div className="account-grid">
        {data.actions.map((action) => (
          <article key={action.title} className="account-card">
            <h3>{action.title}</h3>
            <p>{action.subtitle}</p>
            <span>Ready for backend integration</span>
          </article>
        ))}
      </div>

      <div className="account-detail-grid">
        <section className="summary-box">
          <div className="price-row"><h3>Saved addresses</h3><button className="button ghost small" type="button">Edit</button></div>
          <div className="address-grid compact-grid">
            {data.addresses.map((address) => (
              <article key={address.id} className="address-card">
                <strong>{address.label}</strong>
                <span>{address.line1}</span>
                <span>{address.city}, {address.country}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="summary-box">
          <h3>Payment methods</h3>
          <div className="list-stack compact">
            {data.paymentMethods.map((method) => (
              <div key={method.id} className="price-row">
                <span>{method.label}</span>
                <strong>{method.expires}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="summary-box">
          <h3>Order shortcuts</h3>
          <div className="option-grid">
            <Link className="option-card active" to="/orders"><strong>My orders</strong><span>Track live purchases</span></Link>
            <Link className="option-card" to="/orders/history"><strong>Order history</strong><span>See completed orders</span></Link>
            <Link className="option-card" to="/support"><strong>Support</strong><span>Open chat and tickets</span></Link>
          </div>
        </section>

        <section className="summary-box">
          <h3>Latest notifications</h3>
          <div className="list-stack compact">
            {data.notifications.map((item) => (
              <div key={item.id} className="list-card compact-row">
                <span>{item.title}</span>
                <small>{item.time}</small>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageSection>
  );
}

export default AccountPage;
