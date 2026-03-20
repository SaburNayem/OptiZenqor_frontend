import { categories, products } from "../../../data/mockStorefront";
import { resolveWithLatency } from "../../../services/serviceUtils";

export async function getCategories() {
  return resolveWithLatency(categories);
}

export async function getCategoryDetails(categoryId) {
  const category = categories.find((item) => item.id === categoryId) ?? null;

  if (!category) {
    return resolveWithLatency(null);
  }

  return resolveWithLatency({
    category,
    items: products.filter((product) => product.categoryId === categoryId),
  });
}
