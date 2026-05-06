import { apiRequest } from "../../../services/apiClient";
import { searchProducts } from "../../products/services/productService";

function mapCategory(category) {
  return {
    id: category.id,
    name: category.name,
    icon: category.icon || category.name.slice(0, 1).toUpperCase(),
    description: category.description || "Curated products for this OptiZenqor collection.",
    bannerTitle: category.bannerTitle || category.name,
    subcategories: category.bannerTitle ? [category.bannerTitle] : ["Featured", "Popular", "New"],
    accent: "#20b2aa",
    heroTitle: category.bannerTitle || category.name,
    heroImage:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
  };
}

export async function getCategories() {
  const categories = await apiRequest("/categories");
  return categories.map(mapCategory);
}

export async function getCategoryDetails(categoryId) {
  const categories = await getCategories();
  const category = categories.find((item) => item.id === categoryId);
  if (!category) return null;

  const [items, promotedProducts] = await Promise.all([
    searchProducts({ categoryId }),
    searchProducts({}),
  ]);

  return {
    category,
    items,
    promotedProducts: promotedProducts.filter((product) => product.categoryId !== categoryId).slice(0, 3),
  };
}
