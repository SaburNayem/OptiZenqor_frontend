import { Link } from "react-router-dom";
import { editorialCards, trustPoints } from "../constants/navigation";
import { categories, featuredProducts, offerTabs, popularProducts } from "../data";
import ProductCard from "../components/common/ProductCard";
import SectionHeading from "../components/common/SectionHeading";

function HomePage({ favorites, toggleFavorite, addToCart }) {
  const favoriteIds = favorites.map((item) => item.id);

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
              <ProductCard
                key={product.id}
                product={product}
                favoriteIds={favoriteIds}
                onFavorite={() => toggleFavorite(product)}
                onAddToCart={() => addToCart(product, 1)}
              />
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
              <ProductCard
                key={product.id}
                product={product}
                favoriteIds={favoriteIds}
                onFavorite={() => toggleFavorite(product)}
                onAddToCart={() => addToCart(product, 1)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
