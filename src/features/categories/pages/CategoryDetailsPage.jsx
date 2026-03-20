import { useParams } from "react-router-dom";
import ErrorState from "../../../components/feedback/ErrorState";
import LoadingState from "../../../components/feedback/LoadingState";
import NotFoundState from "../../../components/feedback/NotFoundState";
import ProductCard from "../../../components/common/ProductCard";
import PageSection from "../../../components/common/PageSection";
import useAsyncData from "../../../hooks/useAsyncData";
import { getCategoryDetails } from "../services/categoryService";

function CategoryDetailsPage() {
  const { categoryId } = useParams();
  const { data, loading, error, reload } = useAsyncData(
    () => getCategoryDetails(categoryId),
    [categoryId],
  );

  if (loading) {
    return <LoadingState label="Loading collection..." />;
  }

  if (error) {
    return (
      <PageSection eyebrow="Category" title="Collection unavailable" subtitle="Please try reloading this category.">
        <ErrorState
          title="This category could not be loaded"
          description="The collection request failed before products were returned."
          onRetry={reload}
        />
      </PageSection>
    );
  }

  if (!data) {
    return (
      <PageSection eyebrow="Category" title="Collection not found" subtitle="The requested category does not exist.">
        <NotFoundState
          title="Category not found"
          description="That collection link does not match any category in the storefront."
          primaryAction={{ label: "Browse categories", to: "/categories" }}
          secondaryAction={{ label: "Go to shop", to: "/shop" }}
        />
      </PageSection>
    );
  }

  const { category, items } = data;

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
          items.map((product) => <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </PageSection>
  );
}

export default CategoryDetailsPage;
