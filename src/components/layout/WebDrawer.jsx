import { useNavigate } from "react-router-dom";
import { drawerItems } from "../../data";

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

export default WebDrawer;
