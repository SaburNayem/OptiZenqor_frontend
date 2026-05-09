import { recentSearches, testimonials, trendingSearches } from "../../../data/mockStorefront";
import { apiRequest } from "../../../services/apiClient";

function mapCategory(category) {
  return {
    id: category.id,
    name: category.name,
    description: category.description || "Curated category for the OptiZenqor storefront.",
    accent: "#20b2aa",
  };
}

export function mapProduct(product) {
  const categoryName = product.primaryCategory?.name || "General";
  const categoryId = product.primaryCategoryId || product.primaryCategory?.id || "general";
  const gallery = [product.imageUrl, ...(product.galleryImages || [])].filter(Boolean);
  const offerTags = (product.offers || []).map((item) => item.offer?.label).filter(Boolean);

  return {
    id: product.id,
    sku: product.sku,
    slug: product.slug,
    name: product.name,
    badge: product.isFeatured ? "Featured" : product.isPopular ? "Popular" : "Launch",
    categoryId,
    categoryName,
    categoryIds: [categoryId, ...((product.categories || []).map((item) => item.categoryId).filter(Boolean))],
    price: Number(product.price || 0),
    compareAtPrice: Number(product.compareAtPrice || product.price || 0),
    shortDescription: product.shortDescription || product.description || "OptiZenqor catalog item.",
    description: product.description || product.shortDescription || "OptiZenqor catalog item.",
    imageUrl:
      product.imageUrl ||
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    gallery:
      gallery.length > 0
        ? gallery
        : ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"],
    rating: Number(product.ratingAverage || 4.7),
    reviewCount: Number(product.reviewCount || 18),
    tags: [categoryName, product.sku, ...offerTags].filter(Boolean),
    featured: Boolean(product.isFeatured),
    trending: Boolean(product.isPopular),
    isNew: true,
    stockState:
      Number(product.stockQuantity || 0) > 10
        ? "in-stock"
        : Number(product.stockQuantity || 0) > 0
          ? "low-stock"
          : "out-of-stock",
    inventory: Number(product.stockQuantity || 0),
    shipping: "Dhaka delivery in 2 to 3 business days.",
    returns: "Easy return and support coverage through OptiZenqor care.",
    seller: "OptiZenqor Official",
    variants: ["Standard", "Premium", "Bundle"],
    highlights: [
      product.shortDescription || "Designed for the OptiZenqor ecosystem.",
      `Category: ${categoryName}`,
      `SKU: ${product.sku}`,
    ],
    specifications: {
      SKU: product.sku,
      Category: categoryName,
      Visibility: product.isVisible ? "Visible" : "Hidden",
      Status: product.status,
    },
    offerTags,
  };
}

export async function getHomePageCollections() {
  const [products, categories] = await Promise.all([
    apiRequest("/products"),
    apiRequest("/categories"),
  ]);

  const mappedProducts = products.map(mapProduct);
  const mappedCategories = categories.map(mapCategory);
  const featuredProducts = mappedProducts.filter((item) => item.featured).slice(0, 4);
  const popularProducts = mappedProducts.filter((item) => item.trending).slice(0, 4);
  const deals = mappedProducts
    .filter((item) => item.compareAtPrice > item.price || item.offerTags.length)
    .slice(0, 8);

  return {
    categories: mappedCategories.slice(0, 6),
    testimonials,
    featuredProducts: featuredProducts.length ? featuredProducts : mappedProducts.slice(0, 4),
    popularProducts: popularProducts.length ? popularProducts : mappedProducts.slice(0, 4),
    newArrivals: mappedProducts.slice(0, 4),
    recommendedProducts: mappedProducts.slice(-4),
    deals: deals.length ? deals : mappedProducts.slice(0, 8),
  };
}

export async function searchProducts({
  query = "",
  sort = "featured",
  minRating = 0,
  categoryId = "all",
  maxPrice = 500000,
  tab = "all",
} = {}) {
  const products = (await apiRequest("/products")).map(mapProduct);

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

  return next;
}

export async function getProductById(productId) {
  try {
    const product = mapProduct(await apiRequest(`/products/${productId}`));
    const products = (await apiRequest("/products")).map(mapProduct);
    const relatedProducts = products
      .filter((item) => item.categoryId === product.categoryId && item.id !== product.id)
      .slice(0, 4);
    const recentlyViewed = products.filter((item) => item.id !== product.id).slice(0, 4);

    return {
      product,
      reviews: [
        {
          id: `${productId}-review-1`,
          title: "Great fit for the OptiZenqor ecosystem",
          rating: 5,
          author: "Demo Customer",
          verified: true,
          date: "Recently",
          body: "Presentation, delivery updates, and product quality all felt polished.",
          reply: "Thanks for shopping with OptiZenqor.",
        },
      ],
      relatedProducts,
      recentlyViewed,
    };
  } catch {
    return null;
  }
}

export async function getOfferProducts() {
  const products = (await apiRequest("/products")).map(mapProduct);
  return [...products]
    .sort((a, b) => (b.compareAtPrice - b.price) - (a.compareAtPrice - a.price))
    .slice(0, 8);
}

export async function getSearchExperience(query = "") {
  const result = await searchProducts({ query });
  return {
    query,
    results: result,
    recentSearches,
    trendingSearches,
  };
}
