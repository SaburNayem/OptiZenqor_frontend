import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="footer-brand-panel">
          <div className="brand-mark footer-brand">
            <span className="brand-badge">OZ</span>
            <span>
              <strong>Optizenqor Store</strong>
              <small>Premium commerce for modern routines</small>
            </span>
          </div>
          <p>
            Designed as a polished global storefront with responsive browsing, trusted checkout,
            and customer-first support.
          </p>
          <div className="footer-app-cta">
            <span className="badge badge-dark">App download coming soon</span>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <h4>Shop</h4>
            <Link to="/shop">All products</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/offers">Offers</Link>
            <Link to="/favorites">Wishlist</Link>
          </div>
          <div>
            <h4>Account</h4>
            <Link to="/account">Account overview</Link>
            <Link to="/orders">My orders</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/sign-in">Sign in</Link>
          </div>
          <div>
            <h4>Support</h4>
            <Link to="/support">Help center</Link>
            <Link to="/checkout">Checkout</Link>
            <Link to="/orders/history">Order history</Link>
            <Link to="/support">Returns policy</Link>
          </div>
          <div>
            <h4>Trust</h4>
            <span>Secure payment processing</span>
            <span>Verified reviews and support</span>
            <span>Multi-region shipping</span>
            <span>Easy order tracking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
