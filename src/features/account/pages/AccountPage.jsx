import { useState } from "react";
import ErrorState from "../../../components/feedback/ErrorState";
import LoadingState from "../../../components/feedback/LoadingState";
import PageSection from "../../../components/common/PageSection";
import useAsyncData from "../../../hooks/useAsyncData";
import { getAccountOverview } from "../../../services/accountService";

function AccountPage() {
  const { data, loading, error, reload } = useAsyncData(getAccountOverview, []);
  const [activeAction, setActiveAction] = useState("");

  if (loading) {
    return <LoadingState label="Loading account overview..." />;
  }

  if (error || !data) {
    return (
      <PageSection eyebrow="Account" title="Profile unavailable" subtitle="The account overview could not be prepared.">
        <ErrorState
          title="Account details unavailable"
          description="Try loading the account dashboard again."
          onRetry={reload}
        />
      </PageSection>
    );
  }

  const currentAction = activeAction || data.actions[0]?.title || "";
  const selectedAction = data.actions.find((action) => action.title === currentAction);

  return (
    <PageSection
      eyebrow="Account"
      title="Profile and customer services"
      subtitle="A broader account overview suited to a web storefront."
    >
      <section className="account-hero">
        <img src={data.profile.avatarUrl} alt="Profile" />
        <div>
          <h2>{data.profile.name}</h2>
          <p>{data.profile.email}</p>
        </div>
      </section>
      <div className="account-grid">
        {data.actions.map((action) => (
          <button
            key={action.title}
            className={`account-card account-button${currentAction === action.title ? " active" : ""}`}
            type="button"
            onClick={() => setActiveAction(action.title)}
          >
            <h3>{action.title}</h3>
            <p>{action.subtitle}</p>
            <span>{currentAction === action.title ? "Opened below" : "Open section"}</span>
          </button>
        ))}
      </div>
      <div className="summary-box account-detail-box">
        <h3>{selectedAction?.title}</h3>
        <p>
          {selectedAction?.subtitle}. This panel remains mock-driven for now, but the view model is
          now coming from a service layer so it can be replaced with API data later.
        </p>
      </div>
    </PageSection>
  );
}

export default AccountPage;
