import { Link } from "react-router-dom";
import { editorialCards, sourcingActions, trustPoints } from "../../../constants/navigation";
import EmptyState from "../../../components/feedback/EmptyState";
import ErrorState from "../../../components/feedback/ErrorState";
import LoadingState from "../../../components/feedback/LoadingState";
import ProductCard from "../../../components/common/ProductCard";
import SectionHeading from "../../../components/common/SectionHeading";
import { useFavorites } from "../../favorites/hooks/useFavorites";
import useAsyncData from "../../../hooks/useAsyncData";
import { getHomePageCollections } from "../services/productService";
import { products } from "../../../data/mockStorefront";

function HomePage() {
  const { favorites } = useFavorites();
  const buyAgainProducts = favorites.length ? favorites : products.slice(0, 4);
  const { data, loading, error, reload } = useAsyncData(getHomePageCollections, []);

  if (loading) {
    return <LoadingState label="Loading storefront highlights..." />;
  }

  if (error) {
    return (
      <section className="page-section">
        <div className="container">
          <ErrorState
            title="Could not load the homepage"
            description="The storefront sections could not be prepared right now."
            onRetry={reload}
          />
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="page-section">
        <div className="container">
          <EmptyState
            title="Nothing to show yet"
            description="Homepage content is currently unavailable."
            action={{ label: "Browse shop", to: "/shop" }}
          />
        </div>
      </section>
    );
  }

  const { categories, featuredProducts, offerTabs, popularProducts } = data;

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Inspired by modern ecommerce storefronts</p>
            <h1>Build your everyday shopping routine in one calm, polished store.</h1>
            <p className="hero-text">
              The layout is now website-first instead of app-like: broad navigation,
              merchandised homepage sections, category discovery, editorial promos, and a
              desktop shopping flow.
            </p>
            <div className="hero-cta">
              <Link className="button primary" to="/shop">
                Shop New Arrivals
              </Link>
              <Link className="button ghost" to="/categories">
                Browse Categories
              </Link>
            </div>
            <div className="trust-row">
              {trustPoints.map((point) => (
                <span key={point}>{point}</span>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <article className="hero-feature-card">
              <img src={featuredProducts[0].imageUrl} alt={featuredProducts[0].name} />
              <div>
                <p className="eyebrow">Featured Drop</p>
                <h2>{featuredProducts[0].name}</h2>
                <p>Lightweight essentials, selected for work, study, and everyday comfort.</p>
                <Link to={`/product/${featuredProducts[0].id}`}>Shop this feature</Link>
              </div>
            </article>
            <div className="hero-mini-grid">
              {featuredProducts.slice(1, 3).map((product) => (
                <Link key={product.id} className="mini-product-card" to={`/product/${product.id}`}>
                  <img src={product.imageUrl} alt={product.name} />
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.categoryName}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container sourcing-grid">
          <article className="sourcing-panel">
            <p className="eyebrow">Search-First Discovery</p>
            <h2>Browse fast by category, trend, or deal.</h2>
            <p>
              This section borrows from large marketplace behavior: dense category access,
              trust shortcuts, and a strong “start with search” flow.
            </p>
            <div className="sourcing-categories">
              {categories.slice(0, 8).map((category) => (
                <Link key={category.id} className="sourcing-link" to={`/categories/${category.id}`}>
                  {category.name}
                </Link>
              ))}
            </div>
          </article>
          <div className="sourcing-actions">
            {sourcingActions.map((item) => (
              <Link key={item.title} className="sourcing-card" to={item.link}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container promo-ribbon">
          {offerTabs.slice(0, 4).map((tab) => (
            <Link key={tab} className="promo-chip" to="/offers">
              {tab}
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <SectionHeading
            eyebrow="Shop By Category"
            title="A homepage category grid like a real store website"
            link="/categories"
          />
          <div className="category-grid">
            {categories.map((category) => (
              <Link key={category.id} className="category-tile" to={`/categories/${category.id}`}>
                <span className="category-icon">{category.name.charAt(0)}</span>
                <strong>{category.name}</strong>
                <small>Explore collection</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block alt">
        <div className="container">
          <SectionHeading eyebrow="Featured Collection" title="Best picks this week" link="/shop" />
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <SectionHeading eyebrow="Buy Again" title="Return to products customers revisit often" link="/favorites" />
          <div className="scroll-row">
            {buyAgainProducts.map((product) => (
              <div className="scroll-card" key={`buy-again-${product.id}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container editorial-grid">
          {editorialCards.map((card) => (
            <article key={card.title} className="editorial-card">
              <p className="eyebrow">Curated Edit</p>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <Link to={card.link}>Explore edit</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <SectionHeading eyebrow="Popular Products" title="Most-loved picks across the store" link="/favorites" />
          <div className="product-grid">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
