import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../../components/common/ProductCard";
import SectionHeading from "../../../components/common/SectionHeading";
import LoadingState from "../../../components/feedback/LoadingState";
import ErrorState from "../../../components/feedback/ErrorState";
import { trustPoints } from "../../../constants/navigation";
import { promotionalBanners } from "../../../data/mockStorefront";
import useAsyncData from "../../../hooks/useAsyncData";
import { getHomePageCollections } from "../services/productService";

function HomePage() {
  const { data, loading, error, reload } = useAsyncData(getHomePageCollections, []);
  const [activeSlide, setActiveSlide] = useState(0);
  const {
    categories,
    featuredProducts,
    popularProducts,
    newArrivals,
    recommendedProducts,
    deals,
    testimonials,
  } = data ?? {
    categories: [],
    featuredProducts: [],
    popularProducts: [],
    newArrivals: [],
    recommendedProducts: [],
    deals: [],
    testimonials: [],
  };

  const heroSlides = useMemo(
    () =>
      featuredProducts.slice(0, 3).map((product, index) => ({
        id: product.id,
        eyebrow: ["Exclusive Collection", "New Arrival", "Trending Deal"][index] ?? "Featured Drop",
        title: product.name,
        description: product.shortDescription,
        imageUrl: product.imageUrl,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        link: `/product/${product.id}`,
        accent: ["#fff3d2", "#e8fbf9", "#fff0e7"][index] ?? "#eefaf8",
      })),
    [featuredProducts],
  );

  useEffect(() => {
    if (!heroSlides.length) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, [heroSlides]);

  const currentSlide = heroSlides[activeSlide] ?? heroSlides[0];

  if (loading) return <section className="page-section"><div className="container"><LoadingState label="Preparing the storefront..." /></div></section>;
  if (error || !data || !currentSlide) {
    return (
      <section className="page-section">
        <div className="container">
          <ErrorState title="Homepage unavailable" description="The storefront could not be prepared right now." onRetry={reload} />
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <article className="hero-carousel" style={{ background: currentSlide.accent }}>
            <div className="hero-carousel-copy">
              <p className="eyebrow">{currentSlide.eyebrow}</p>
              <h1>{currentSlide.title}</h1>
              <p className="hero-text">{currentSlide.description}</p>
              <div className="price-stack large">
                <strong>${currentSlide.price.toFixed(2)}</strong>
                <span>${currentSlide.compareAtPrice.toFixed(2)}</span>
              </div>
              <div className="hero-cta">
                <Link className="button primary" to={currentSlide.link}>Shop now</Link>
                <Link className="button ghost" to="/shop">All products</Link>
              </div>
              <div className="hero-carousel-dots" aria-label="Hero slides">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    className={`hero-dot${index === activeSlide ? " active" : ""}`}
                    type="button"
                    aria-label={`Open slide ${index + 1}`}
                    onClick={() => setActiveSlide(index)}
                  />
                ))}
              </div>
            </div>
            <div className="hero-carousel-visual">
              <img src={currentSlide.imageUrl} alt={currentSlide.title} />
            </div>
          </article>
        </div>
      </section>

      <section className="section-block">
        <div className="container promo-ribbon">
          {promotionalBanners.map((banner) => (
            <Link key={banner.id} className="promo-chip" to={banner.link}>
              <strong>{banner.title}</strong>
              <span>{banner.body}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <SectionHeading eyebrow="Categories" title="Quick access to your main shopping missions" link="/categories" />
          <div className="category-grid">
            {categories.map((category) => (
              <Link key={category.id} className="category-tile" to={`/categories/${category.id}`}>
                <span className="category-icon" style={{ background: category.accent }}>{category.name.slice(0, 1)}</span>
                <strong>{category.name}</strong>
                <p>{category.description}</p>
                <small>Explore collection</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block alt">
        <div className="container">
          <SectionHeading eyebrow="Featured products" title="Built to convert with premium product presentation" link="/shop" />
          <div className="product-grid">
            {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <SectionHeading eyebrow="Popular right now" title="High-intent picks customers keep revisiting" link="/favorites" />
          <div className="product-grid">
            {popularProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container home-split-grid">
          <div>
            <SectionHeading eyebrow="New arrivals" title="Fresh drops across tech, beauty, and living" />
            <div className="product-grid compact-grid">
              {newArrivals.map((product) => <ProductCard key={product.id} product={product} compact />)}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Best for you" title="Recommendations shaped like a smart storefront" />
            <div className="product-grid compact-grid">
              {recommendedProducts.map((product) => <ProductCard key={product.id} product={product} compact />)}
            </div>
          </div>
        </div>
      </section>

      <section className="section-block alt">
        <div className="container">
          <SectionHeading eyebrow="Offers" title="Discounted products with clean urgency and value cues" link="/offers" />
          <div className="product-grid">
            {deals.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container trust-grid">
          {trustPoints.map((item) => (
            <article key={item} className="trust-card">
              <strong>{item}</strong>
              <p>Clear delivery, support, and payment signals reduce friction throughout the flow.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <SectionHeading eyebrow="Customer reviews" title="Trust-building social proof with editorial polish" />
          <div className="editorial-grid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.id} className="review-card">
                <div className="rating-row"><span>â˜…â˜…â˜…â˜…â˜…</span><small>{testimonial.role}</small></div>
                <p>{testimonial.quote}</p>
                <strong>{testimonial.name}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block alt">
        <div className="container newsletter-shell">
          <div>
            <p className="eyebrow">Newsletter</p>
            <h2>Get launch-ready offers, curated drops, and restock alerts.</h2>
            <p className="section-subtitle">A premium signup surface with clear value and no clutter.</p>
          </div>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button className="button primary" type="button">Join now</button>
          </form>
        </div>
      </section>

      <section className="section-block">
        <div className="container support-preview">
          <div>
            <p className="eyebrow">Support</p>
            <h2>Order help, live chat, and account guidance are always close.</h2>
          </div>
          <Link className="button ghost" to="/support">Open support center</Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
