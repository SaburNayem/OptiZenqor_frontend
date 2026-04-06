import { Link } from "react-router-dom";
import { primaryHeaderLinks, utilityHeaderLinks } from "../../constants/navigation";

const drawerLinks = [...primaryHeaderLinks, ...utilityHeaderLinks];

function WebDrawer({ open, onClose }) {
  return (
    <div className={`drawer-overlay${open ? " open" : ""}`} onClick={onClose}>
      <aside className={`web-drawer${open ? " open" : ""}`} onClick={(event) => event.stopPropagation()}>
        <div className="drawer-top">
          <div className="brand-mark">
            <span className="brand-badge">OZ</span>
            <span>
              <strong>Optizenqor Store</strong>
              <small>Mobile storefront menu</small>
            </span>
          </div>
          <button className="icon-button" type="button" onClick={onClose}>
            x
          </button>
        </div>
        <div className="drawer-list">
          {drawerLinks.map((item) => (
            <Link key={item.to} className="drawer-link" to={item.to} onClick={onClose}>
              <span>{item.label}</span>
              <small>Open page</small>
            </Link>
          ))}
          <Link className="drawer-link" to="/orders" onClick={onClose}>
            <span>My Orders</span>
            <small>Track and manage purchases</small>
          </Link>
          <Link className="drawer-link" to="/settings" onClick={onClose}>
            <span>Settings</span>
            <small>Notifications, privacy, and preferences</small>
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default WebDrawer;
