import { Link } from "react-router-dom";
import ErrorState from "../../../components/feedback/ErrorState";
import LoadingState from "../../../components/feedback/LoadingState";
import PageSection from "../../../components/common/PageSection";
import useAsyncData from "../../../hooks/useAsyncData";
import { getCategories } from "../services/categoryService";

function CategoriesPage() {
  const { data: categories, loading, error, reload } = useAsyncData(getCategories, []);

  return (
    <PageSection
      eyebrow="Collections"
      title="Browse the store by category"
      subtitle="Large collection tiles create a more natural website discovery flow."
    >
      {loading ? <LoadingState label="Loading categories..." /> : null}
      {error ? (
        <ErrorState
          title="Categories are unavailable"
          description="The collection list could not be loaded."
          onRetry={reload}
        />
      ) : null}
      {categories ? (
        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category.id} className="category-tile large" to={`/categories/${category.id}`}>
              <span className="category-icon">{category.name.charAt(0)}</span>
              <strong>{category.bannerTitle}</strong>
              <small>View products</small>
            </Link>
          ))}
        </div>
      ) : null}
    </PageSection>
  );
}

export default CategoriesPage;
