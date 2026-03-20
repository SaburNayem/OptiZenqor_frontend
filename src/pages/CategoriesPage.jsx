import { Link } from "react-router-dom";
import PageSection from "../components/common/PageSection";
import { categories } from "../data";

function CategoriesPage() {
  return (
    <PageSection
      eyebrow="Collections"
      title="Browse the store by category"
      subtitle="Large collection tiles create a more natural website discovery flow."
    >
      <div className="category-grid">
        {categories.map((category) => (
          <Link key={category.id} className="category-tile large" to={`/categories/${category.id}`}>
            <span className="category-icon">{category.name.charAt(0)}</span>
            <strong>{category.bannerTitle}</strong>
            <small>View products</small>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}

export default CategoriesPage;
