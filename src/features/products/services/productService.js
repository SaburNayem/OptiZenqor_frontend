import {
  categories,
  featuredProducts,
  offerTabs,
  popularProducts,
  products,
} from "../../../data/mockStorefront";
import { resolveWithLatency } from "../../../services/serviceUtils";

export async function getHomePageCollections() {
  return resolveWithLatency({
    categories,
    featuredProducts,
    popularProducts,
    offerTabs,
  });
}

export async function searchProducts({ query = "", sort = "default", minRating = 0 } = {}) {
  let next = products.filter((product) =>
    `${product.name} ${product.categoryName}`.toLowerCase().includes(query.toLowerCase()),
  );

  next = next.filter((product) => product.rating >= minRating);

  switch (sort) {
    case "price_low_to_high":
      next = [...next].sort((a, b) => a.price - b.price);
      break;
    case "price_high_to_low":
      next = [...next].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      next = [...next].sort((a, b) => b.rating - a.rating);
      break;
    case "name":
      next = [...next].sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  return resolveWithLatency(next);
}

export async function getProductById(productId) {
  return resolveWithLatency(products.find((product) => product.id === productId) ?? null);
}

export async function getOfferProducts(activeTab) {
  const offset = offerTabs.indexOf(activeTab);
  return resolveWithLatency(
    products.map((product, index) => ({
      ...product,
      offerLabel: offerTabs[(index + Math.max(offset, 0)) % offerTabs.length],
    })),
  );
}
