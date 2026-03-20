import { useState } from "react";
import PageSection from "../components/common/PageSection";
import { accountActions } from "../data";

function AccountPage() {
  const [activeAction, setActiveAction] = useState(accountActions[0]?.title ?? "");

  return (
    <PageSection
      eyebrow="Account"
      title="Profile and customer services"
      subtitle="A broader account overview suited to a web storefront."
    >
      <section className="account-hero">
        <img src="https://i.pravatar.cc/160?img=12" alt="Profile" />
        <div>
          <h2>Shob Bazaar</h2>
          <p>support@yourapp.com</p>
        </div>
      </section>
      <div className="account-grid">
        {accountActions.map((action) => (
          <button
            key={action.title}
            className={`account-card account-button${activeAction === action.title ? " active" : ""}`}
            type="button"
            onClick={() => setActiveAction(action.title)}
          >
            <h3>{action.title}</h3>
            <p>{action.subtitle}</p>
            <span>{activeAction === action.title ? "Opened below" : "Open section"}</span>
          </button>
        ))}
      </div>
      <div className="summary-box account-detail-box">
        <h3>{activeAction}</h3>
        <p>
          This section is now interactive. You can switch between account panels and see the
          selected section details here instead of tapping static cards.
        </p>
      </div>
    </PageSection>
  );
}

export default AccountPage;
