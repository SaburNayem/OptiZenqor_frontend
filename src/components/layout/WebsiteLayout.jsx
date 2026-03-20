import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import SiteHeader from "./SiteHeader";
import TopStrip from "./TopStrip";
import WebDrawer from "./WebDrawer";

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

export default WebsiteLayout;
