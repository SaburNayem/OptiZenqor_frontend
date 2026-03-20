import {
  drawerItems,
  drawerInfoPages,
  sampleOrders,
} from "../data/mockStorefront";
import { resolveWithLatency } from "./serviceUtils";

export async function getDrawerMenuItems() {
  return resolveWithLatency(drawerItems);
}

export async function getInfoPageBySlug(slug) {
  if (slug === "order-history") {
    return resolveWithLatency({
      slug,
      title: "Order History",
      body: "Grouped order history similar to the original drawer page.",
      type: "orders",
      orders: sampleOrders,
    });
  }

  const page = drawerInfoPages.find((item) => item.slug === slug);
  return resolveWithLatency(page ?? null);
}
