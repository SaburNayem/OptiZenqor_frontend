import {
  categories,
  getProductById as getProductByIdFromStore,
  getProductReviews,
  homeCollections,
  products,
  recentSearches,
  testimonials,
  trendingSearches,
} from "../../../data/mockStorefront";
import { resolveWithLatency } from "../../../services/serviceUtils";

export async function getHomePageCollections() {
  return resolveWithLatency({
    categories,
    testimonials,
    ...homeCollections,
  });
}

export async function searchProducts({
  query = "",
  sort = "featured",
  minRating = 0,
  categoryId = "all",
  maxPrice = 2000,
  tab = "all",
} = {}) {
  let next = products.filter((product) =>
    `${product.name} ${product.categoryName} ${product.tags.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  next = next.filter((product) => product.rating >= minRating && product.price <= maxPrice);

  if (categoryId !== "all") {
    next = next.filter((product) => product.categoryId === categoryId);
  }

  if (tab === "featured") next = next.filter((product) => product.featured);
  if (tab === "trending") next = next.filter((product) => product.trending);
  if (tab === "new") next = next.filter((product) => product.isNew);

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
    case "newest":
      next = [...next].sort((a, b) => Number(b.isNew) - Number(a.isNew));
      break;
    default:
      next = [...next].sort((a, b) => Number(b.featured) - Number(a.featured));
      break;
  }

  return resolveWithLatency(next);
}

export async function getProductById(productId) {
  const product = getProductByIdFromStore(productId);
  if (!product) return resolveWithLatency(null);

  const relatedProducts = products
    .filter((item) => item.categoryId === product.categoryId && item.id !== product.id)
    .slice(0, 4);
  const recentlyViewed = products.filter((item) => item.id !== product.id).slice(0, 4);

  return resolveWithLatency({
    product,
    reviews: getProductReviews(productId),
    relatedProducts,
    recentlyViewed,
  });
}

export async function getOfferProducts() {
  return resolveWithLatency(
    [...products]
      .sort((a, b) => (b.compareAtPrice - b.price) - (a.compareAtPrice - a.price))
      .slice(0, 8),
  );
}

export async function getSearchExperience(query = "") {
  const result = await searchProducts({ query });
  return resolveWithLatency({
    query,
    results: result,
    recentSearches,
    trendingSearches,
  });
}
