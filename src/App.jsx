import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  accountActions,
  cartSeed,
  categories,
  drawerItems,
  favoriteSeed,
  featuredProducts,
  getProductById,
  getProductsByCategory,
  offerTabs,
  popularProducts,
  products,
} from "./data";

const headerLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/offers", label: "Offers" },
  { to: "/favorites", label: "Favorites" },
  { to: "/cart", label: "Cart" },
  { to: "/account", label: "Account" },
];

const trustPoints = [
  "Free delivery above $50",
  "Seven-day easy returns",
  "Curated bestselling essentials",
  "Secure checkout and order tracking",
];

const editorialCards = [
  {
    title: "Workday Setup",
    body: "Desk-ready tech, accessories, and calm essentials to build a sharper routine.",
    link: "/shop?q=laptop",
  },
  {
    title: "Beauty & Wellness",
    body: "Daily self-care products selected to feel premium without losing practicality.",
    link: "/categories/beauty_personal_care",
  },
];

function App() {
  const [favorites, setFavorites] = useState(() =>
    loadStoredValue("optizenqor_favorites", favoriteSeed),
  );
  const [cart, setCart] = useState(() => loadStoredValue("optizenqor_cart", cartSeed));

  useEffect(() => {
    window.localStorage.setItem("optizenqor_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    window.localStorage.setItem("optizenqor_cart", JSON.stringify(cart));
  }, [cart]);

  function toggleFavorite(product) {
    setFavorites((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product],
    );
  }

  function addToCart(product, quantity = 1) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...current, { product, quantity }];
    });
  }

  function updateCartQuantity(productId, nextQuantity) {
    if (nextQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((current) =>
      current.map((item) =>
        item.product.id === productId ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  }

  function removeFromCart(productId) {
    setCart((current) => current.filter((item) => item.product.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <Routes>
      <Route path="/" element={<WebsiteLayout favorites={favorites} cart={cart} />}>
        <Route path="offers" element={<OffersPage addToCart={addToCart} favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="info/:slug" element={<DrawerInfoPage />} />
        <Route
          index
          element={
            <HomePage
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="shop"
          element={
            <ShopPage
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              addToCart={addToCart}
            />
          }
        />
        <Route path="categories" element={<CategoriesPage />} />
        <Route
          path="categories/:categoryId"
          element={
            <CategoryDetailsPage
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="product/:productId"
          element={
            <ProductPage
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="favorites"
          element={<FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
        <Route
          path="cart"
          element={
            <CartPage
              cart={cart}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route path="checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />
        <Route path="account" element={<AccountPage />} />
      </Route>
      <Route path="/sign-in" element={<AuthPage mode="sign-in" />} />
      <Route path="/sign-up" element={<AuthPage mode="sign-up" />} />
    </Routes>
  );
}

function WebsiteLayout({ favorites, cart }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="site-shell">
      <TopStrip />
      <SiteHeader favorites={favorites} cart={cart} onOpenDrawer={() => setDrawerOpen(true)} />
      <WebDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function TopStrip() {
  return (
    <div className="top-strip">
      <div className="container top-strip-inner">
        <span>Seasonal ecommerce storefront redesign for OptiZenqor</span>
        <span>Support: support@yourapp.com</span>
      </div>
    </div>
  );
}

function SiteHeader({ favorites, cart, onOpenDrawer }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function submitSearch(event) {
    event.preventDefault();
    navigate(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : "/shop");
  }

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-row">
          <Link className="brand-mark" to="/">
            <span className="brand-badge">SQ</span>
            <span>
              <strong>Shob Bazaar</strong>
              <small>OptiZenqor Storefront</small>
            </span>
          </Link>

          <form className="header-search" onSubmit={submitSearch}>
            <input
              type="search"
              placeholder="Search products, categories, collections"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button className="button primary" type="submit">
              Search
            </button>
          </form>

          <div className="header-actions">
            <button className="button ghost small" type="button" onClick={onOpenDrawer}>
              Menu
            </button>
            <Link className="header-stat" to="/favorites">
              Favorites
              <strong>{favorites.length}</strong>
            </Link>
            <Link className="header-stat" to="/cart">
              Cart
              <strong>{cartItemCount}</strong>
            </Link>
            <Link className="button ghost small" to="/sign-in">
              Sign In
            </Link>
          </div>
        </div>

        <nav className="header-nav">
          {headerLinks.map((item) => (
            <NavLink
              key={item.to}
              end={item.to === "/"}
              to={item.to}
              className={({ isActive }) => `header-link${isActive ? " active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

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

function ShopPage({ favorites, toggleFavorite, addToCart }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("default");
  const [minRating, setMinRating] = useState(0);
  const favoriteIds = favorites.map((item) => item.id);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const filteredProducts = useMemo(() => {
    let next = products.filter((product) =>
      `${product.name} ${product.categoryName}`.toLowerCase().includes(query.toLowerCase()),
    );

    next = next.filter((product) => product.rating >= minRating);

    switch (sort) {
      case "price_low_to_high":
        return [...next].sort((a, b) => a.price - b.price);
      case "price_high_to_low":
        return [...next].sort((a, b) => b.price - a.price);
      case "rating":
        return [...next].sort((a, b) => b.rating - a.rating);
      case "name":
        return [...next].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return next;
    }
  }, [minRating, query, sort]);

  return (
    <PageSection
      eyebrow="Shop"
      title="Search, filter, and browse the full catalog"
      subtitle="This page is laid out like a desktop product listing page instead of a mobile app tab."
    >
      <div className="shop-layout">
        <aside className="filters-panel">
          <h3>Refine</h3>
          <label className="field">
            <span>Search</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <label className="field">
            <span>Sort</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="default">Featured</option>
              <option value="price_low_to_high">Price: Low to High</option>
              <option value="price_high_to_low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name</option>
            </select>
          </label>
          <label className="field">
            <span>Minimum Rating</span>
            <select value={minRating} onChange={(event) => setMinRating(Number(event.target.value))}>
              {[0, 3, 3.5, 4, 4.5].map((value) => (
                <option key={value} value={value}>
                  {value === 0 ? "All ratings" : `${value}+ stars`}
                </option>
              ))}
            </select>
          </label>
        </aside>

        <div className="shop-results">
          <div className="results-bar">
            <strong>{filteredProducts.length} products</strong>
            <span>Clean catalogue browsing with persistent filters.</span>
          </div>
          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <div className="empty-state">No products matched your search or filter.</div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favoriteIds={favoriteIds}
                  onFavorite={() => toggleFavorite(product)}
                  onAddToCart={() => addToCart(product, 1)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function CategoriesPage() {
  return (
    <PageSection
      eyebrow="Collections"
      title="Browse the store by category"
      subtitle="Large collection tiles create a more natural website discovery flow."
    >
      <div className="category-grid">
        {categories.map((category) => (
          <Link key={category.id} className="category-tile large" to={`/categories/${category.id}`}>
            <span className="category-icon">{category.name.charAt(0)}</span>
            <strong>{category.bannerTitle}</strong>
            <small>View products</small>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}

function OffersPage({ addToCart, favorites, toggleFavorite }) {
  const [activeTab, setActiveTab] = useState(offerTabs[0]);
  const favoriteIds = favorites.map((item) => item.id);
  const offerProducts = useMemo(() => {
    const offset = offerTabs.indexOf(activeTab);
    return products.map((product, index) => ({
      ...product,
      offerLabel: offerTabs[(index + Math.max(offset, 0)) % offerTabs.length],
    }));
  }, [activeTab]);

  return (
    <PageSection
      eyebrow="Offers"
      title="Deals, tabs, and promotional collections from your original app"
      subtitle="This restores the offers section in a website-friendly form with tabs and animated cards."
    >
      <div className="offers-tabs">
        {offerTabs.map((tab) => (
          <button
            key={tab}
            className={`offer-tab${activeTab === tab ? " active" : ""}`}
            type="button"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="offer-list">
        {offerProducts.map((product) => (
          <article className="offer-card" key={`${activeTab}-${product.id}`}>
            <img src={product.imageUrl} alt={product.name} />
            <div className="offer-card-body">
              <span className="offer-badge">{product.offerLabel}</span>
              <Link className="product-title" to={`/product/${product.id}`}>
                {product.name}
              </Link>
              <p>{product.categoryName}</p>
              <div className="price-row">
                <strong>${product.price.toFixed(2)}</strong>
                <span>{product.rating}★</span>
              </div>
              <div className="card-actions">
                <button className="button ghost small" type="button" onClick={() => toggleFavorite(product)}>
                  {favoriteIds.includes(product.id) ? "Saved" : "Save"}
                </button>
                <button className="button primary small" type="button" onClick={() => addToCart(product, 1)}>
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}

function CategoryDetailsPage({ favorites, toggleFavorite, addToCart }) {
  const { categoryId } = useParams();
  const category = categories.find((item) => item.id === categoryId);
  const items = getProductsByCategory(categoryId);
  const favoriteIds = favorites.map((item) => item.id);

  return (
    <PageSection
      eyebrow="Category"
      title={category?.bannerTitle ?? "Collection"}
      subtitle="Products presented as a full collection page."
    >
      <div className="product-grid">
        {items.length === 0 ? (
          <div className="empty-state">No products found in this category yet.</div>
        ) : (
          items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              favoriteIds={favoriteIds}
              onFavorite={() => toggleFavorite(product)}
              onAddToCart={() => addToCart(product, 1)}
            />
          ))
        )}
      </div>
    </PageSection>
  );
}

function ProductPage({ favorites, toggleFavorite, addToCart }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = getProductById(productId);
  const [quantity, setQuantity] = useState(1);
  const isFavorite = product ? favorites.some((item) => item.id === product.id) : false;

  if (!product) {
    return (
      <PageSection eyebrow="Product" title="Product not found" subtitle="The selected product could not be found." />
    );
  }

  return (
    <PageSection eyebrow={product.categoryName} title={product.name} subtitle={product.description}>
      <div className="product-page-grid">
        <div className="product-gallery">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-panel">
          <div className="product-price-line">
            <strong>${product.price.toFixed(2)}</strong>
            <span>{product.rating} star rating</span>
          </div>
          <div className="product-copy-list">
            <p>Premium selection for everyday use</p>
            <p>Ships in 2-4 business days</p>
            <p>Trusted by returning customers across categories</p>
          </div>
          <div className="quantity-picker">
            <button
              className="icon-button"
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            >
              -
            </button>
            <strong>{quantity}</strong>
            <button className="icon-button" type="button" onClick={() => setQuantity((value) => value + 1)}>
              +
            </button>
          </div>
          <div className="product-actions">
            <button
              className="button primary"
              type="button"
              onClick={() => {
                addToCart(product, quantity);
                navigate("/cart");
              }}
            >
              Add To Cart
            </button>
            <button className="button ghost" type="button" onClick={() => toggleFavorite(product)}>
              {isFavorite ? "Saved to Favorites" : "Save Product"}
            </button>
          </div>
          <div className="summary-box">
            <div className="price-row">
              <span>Estimated total</span>
              <strong>${(product.price * quantity).toFixed(2)}</strong>
            </div>
            <button
              className="button ghost full-width"
              type="button"
              onClick={() => {
                addToCart(product, quantity);
                navigate("/checkout");
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function FavoritesPage({ favorites, toggleFavorite }) {
  return (
    <PageSection
      eyebrow="Saved"
      title="Favorites"
      subtitle="A cleaner saved-items list that fits desktop browsing."
    >
      <div className="list-stack">
        {favorites.length === 0 ? (
          <div className="empty-state">No saved products yet.</div>
        ) : (
          favorites.map((product) => (
            <article className="list-card" key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <div className="list-copy">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
                <p>{product.categoryName}</p>
              </div>
              <strong>${product.price.toFixed(2)}</strong>
              <button className="button ghost small" type="button" onClick={() => toggleFavorite(product)}>
                Remove
              </button>
            </article>
          ))
        )}
      </div>
    </PageSection>
  );
}

function CartPage({ cart, updateCartQuantity, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <PageSection
      eyebrow="Cart"
      title="Review your order"
      subtitle="A desktop order summary with line items and totals."
    >
      <div className="cart-layout">
        <div className="list-stack">
          {cart.length === 0 ? (
            <div className="empty-state">Your cart is empty. Add products from the shop to continue.</div>
          ) : (
            cart.map((item) => (
              <article className="list-card" key={item.product.id}>
                <img src={item.product.imageUrl} alt={item.product.name} />
                <div className="list-copy">
                  <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                  <p>{item.product.categoryName}</p>
                  <div className="inline-controls">
                    <button
                      className="icon-button"
                      type="button"
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <small>Qty: {item.quantity}</small>
                    <button
                      className="icon-button"
                      type="button"
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="button ghost small"
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
              </article>
            ))
          )}
        </div>
        <aside className="summary-box">
          <h3>Order Summary</h3>
          <div className="price-row">
            <span>Subtotal</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <div className="price-row">
            <span>Delivery</span>
            <strong>$4.99</strong>
          </div>
          <div className="price-row total-row">
            <span>Total</span>
            <strong>${(total + (cart.length ? 4.99 : 0)).toFixed(2)}</strong>
          </div>
          <Link className="button primary full-width" to="/checkout">
            Proceed To Checkout
          </Link>
        </aside>
      </div>
    </PageSection>
  );
}

function CheckoutPage({ cart, clearCart }) {
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = cart.length ? 4.99 : 0;
  const total = subtotal + delivery;

  return (
    <PageSection
      eyebrow="Checkout"
      title="Secure checkout"
      subtitle="Shipping, order recap, and payment summary in a website-style two-column layout."
    >
      {placed ? (
        <div className="success-banner">
          Order placed successfully. Your cart has been cleared and you are being sent back to the homepage.
        </div>
      ) : null}
      <div className="checkout-grid">
        <section className="summary-box">
          <h3>Shipping Address</h3>
          <p>House 12, Road 4, Mirpur 1, Dhaka</p>
          <p>Phone: +880 1700 000000</p>
          <p>Email: support@yourapp.com</p>
        </section>
        <section className="summary-box">
          <h3>Order Items</h3>
          <div className="list-stack compact">
            {cart.length === 0 ? (
              <div className="empty-state">Your cart is empty. Add items before checkout.</div>
            ) : (
              cart.map((item) => (
                <div className="price-row" key={item.product.id}>
                  <span>
                    {item.product.name} x{item.quantity}
                  </span>
                  <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))
            )}
          </div>
        </section>
        <section className="summary-box">
          <h3>Payment Summary</h3>
          <div className="price-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="price-row">
            <span>Delivery</span>
            <strong>${delivery.toFixed(2)}</strong>
          </div>
          <div className="price-row total-row">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button
            className="button primary full-width"
            type="button"
            disabled={cart.length === 0}
            onClick={() => {
              setPlaced(true);
              clearCart();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.setTimeout(() => navigate("/"), 1200);
            }}
          >
            Place Order
          </button>
        </section>
      </div>
    </PageSection>
  );
}

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

function AuthPage({ mode }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const isSignIn = mode === "sign-in";

  function submit(event) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <section className="auth-page">
      <div className="auth-layout">
        <div className="auth-promo">
          <p className="eyebrow">Website Sign In</p>
          <h1>{isSignIn ? "Welcome back to the storefront." : "Create your customer account."}</h1>
          <p>
            These auth pages now sit outside the shopping shell, which is more typical for
            ecommerce websites than an in-app onboarding flow.
          </p>
          <Link className="button ghost" to="/">
            Return to homepage
          </Link>
        </div>
        <form className="auth-panel" onSubmit={submit}>
          <h2>{isSignIn ? "Sign In" : "Sign Up"}</h2>
          {!isSignIn ? (
            <label className="field">
              <span>Full name</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </label>
          ) : null}
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
          </label>
          <button className="button primary full-width" type="submit">
            {isSignIn ? "Continue" : "Create Account"}
          </button>
          <Link className="hint-link" to={isSignIn ? "/sign-up" : "/sign-in"}>
            {isSignIn ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </Link>
        </form>
      </div>
    </section>
  );
}

function PageSection({ eyebrow, title, subtitle, children }) {
  return (
    <section className="page-section">
      <div className="container">
        <header className="section-header">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="section-subtitle">{subtitle}</p>
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, link }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <Link to={link}>View all</Link>
    </div>
  );
}

function ProductCard({ product, favoriteIds, onFavorite, onAddToCart }) {
  const isFavorite = favoriteIds.includes(product.id);

  return (
    <article className="product-card">
      <Link className="product-image" to={`/product/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
      </Link>
      <div className="product-card-body">
        <p>{product.categoryName}</p>
        <Link className="product-title" to={`/product/${product.id}`}>
          {product.name}
        </Link>
        <div className="price-row">
          <strong>${product.price.toFixed(2)}</strong>
          <span>{product.rating}★</span>
        </div>
      </div>
      <div className="card-actions">
        <button className="button ghost small" type="button" onClick={onFavorite}>
          {isFavorite ? "Saved" : "Save"}
        </button>
        <button className="button primary small" type="button" onClick={onAddToCart}>
          Add
        </button>
      </div>
    </article>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand-mark footer-brand">
            <span className="brand-badge">SQ</span>
            <span>
              <strong>Shob Bazaar</strong>
              <small>Website-style frontend for OptiZenqor</small>
            </span>
          </div>
        </div>
        <div>
          <h4>Shop</h4>
          <Link to="/shop">All Products</Link>
          <Link to="/categories">Collections</Link>
          <Link to="/favorites">Saved Items</Link>
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/account">Profile</Link>
          <Link to="/checkout">Checkout</Link>
        </div>
      </div>
    </footer>
  );
}

function WebDrawer({ open, onClose }) {
  const navigate = useNavigate();

  return (
    <div className={`drawer-overlay${open ? " open" : ""}`} onClick={onClose}>
      <aside className={`web-drawer${open ? " open" : ""}`} onClick={(event) => event.stopPropagation()}>
        <div className="drawer-top">
          <div className="brand-mark">
            <span className="brand-badge">SQ</span>
            <span>
              <strong>Shob Bazaar</strong>
              <small>Drawer restored as a web panel</small>
            </span>
          </div>
          <button className="icon-button" type="button" onClick={onClose}>
            x
          </button>
        </div>
        <div className="drawer-list">
          {drawerItems.map((item) => (
            <button
              key={item}
              className="drawer-link"
              type="button"
              onClick={() => {
                onClose();
                if (item === "Logout") {
                  navigate("/sign-in");
                  return;
                }
                navigate(`/info/${item.toLowerCase().replace(/\s+/g, "-")}`);
              }}
            >
              <span>{item}</span>
              <small>Open page</small>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

function loadStoredValue(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export default App;
