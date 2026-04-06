import PageSection from "../../../components/common/PageSection";
import ProductCard from "../../../components/common/ProductCard";
import LoadingState from "../../../components/feedback/LoadingState";
import useAsyncData from "../../../hooks/useAsyncData";
import { getOfferProducts } from "../services/productService";

function OffersPage() {
  const { data, loading } = useAsyncData(getOfferProducts, []);

  return (
    <PageSection
      eyebrow="Offers"
      title="Conversion-focused promotions and deal discovery"
      subtitle="Discount-led merchandising with clean badges, urgency cues, and premium spacing."
    >
      <div className="promo-banner-grid">
        <article className="offer-hero-card">
          <span className="badge badge-accent">Today only</span>
          <h2>Save more on premium essentials.</h2>
          <p>Curated offers across tech, wellness, home, and gifting.</p>
        </article>
        <article className="offer-hero-card muted">
          <span className="badge">Members</span>
          <h2>Extra perks for returning customers.</h2>
          <p>Priority chat support, better delivery windows, and exclusive drops.</p>
        </article>
      </div>
      {loading || !data ? <LoadingState label="Loading live offers..." /> : null}
      {data ? <div className="product-grid">{data.map((product) => <ProductCard key={product.id} product={product} />)}</div> : null}
    </PageSection>
  );
}

export default OffersPage;
