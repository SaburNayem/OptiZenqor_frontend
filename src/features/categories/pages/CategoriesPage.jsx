import { Link } from "react-router-dom";
import PageSection from "../../../components/common/PageSection";
import LoadingState from "../../../components/feedback/LoadingState";
import useAsyncData from "../../../hooks/useAsyncData";
import { getCategories } from "../services/categoryService";

function CategoriesPage() {
  const { data, loading } = useAsyncData(getCategories, []);

  return (
    <PageSection
      eyebrow="Categories"
      title="Browse every major shopping module from a single clean hub"
      subtitle="Built as a scalable category landing page with visual hierarchy and quick access."
    >
      {loading || !data ? <LoadingState label="Loading categories..." /> : null}
      {data ? (
        <div className="category-grid">
          {data.map((category) => (
            <Link key={category.id} className="category-tile large" to={`/categories/${category.id}`}>
              <span className="category-icon" style={{ background: category.accent }}>{category.name.slice(0, 1)}</span>
              <strong>{category.name}</strong>
              <p>{category.description}</p>
              <small>{category.subcategories.join(" · ")}</small>
            </Link>
          ))}
        </div>
      ) : null}
    </PageSection>
  );
}

export default CategoriesPage;
