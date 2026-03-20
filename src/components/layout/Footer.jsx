import { Link } from "react-router-dom";

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

export default Footer;
