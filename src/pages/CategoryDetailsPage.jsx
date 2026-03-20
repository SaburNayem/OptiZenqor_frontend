import { useParams } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import PageSection from "../components/common/PageSection";
import { categories, getProductsByCategory } from "../data";

function CategoryDetailsPage({ favorites, toggleFavorite, addToCart }) {
  const { categoryId } = useParams();
  const category = categories.find((item) => item.id === categoryId);
  const items = getProductsByCategory(categoryId);
  const favoriteIds = favorites.map((item) => item.id);

  return (
    <PageSection
      eyebrow="Category"
      title={category?.bannerTitle ?? "Collection"}
      subtitle="Products presented as a full collection page."
    >
      <div className="product-grid">
        {items.length === 0 ? (
          <div className="empty-state">No products found in this category yet.</div>
        ) : (
          items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              favoriteIds={favoriteIds}
              onFavorite={() => toggleFavorite(product)}
              onAddToCart={() => addToCart(product, 1)}
            />
          ))
        )}
      </div>
    </PageSection>
  );
}

export default CategoryDetailsPage;
