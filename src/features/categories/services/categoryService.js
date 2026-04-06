import { categories, homeCollections, products } from "../../../data/mockStorefront";
import { resolveWithLatency } from "../../../services/serviceUtils";

export async function getCategories() {
  return resolveWithLatency(categories);
}

export async function getCategoryDetails(categoryId) {
  const category = categories.find((item) => item.id === categoryId);
  if (!category) return resolveWithLatency(null);

  return resolveWithLatency({
    category,
    items: products.filter((product) => product.categoryId === categoryId),
    promotedProducts: homeCollections.deals.filter((product) => product.categoryId !== categoryId).slice(0, 3),
  });
}
