import { useState } from "react";
import { useParams } from "react-router-dom";
import PageSection from "../../../components/common/PageSection";
import ProductCard from "../../../components/common/ProductCard";
import LoadingState from "../../../components/feedback/LoadingState";
import NotFoundState from "../../../components/feedback/NotFoundState";
import useAsyncData from "../../../hooks/useAsyncData";
import { getCategoryDetails } from "../services/categoryService";

function CategoryDetailsPage() {
  const { categoryId } = useParams();
  const [activeSubcategory, setActiveSubcategory] = useState("All");
  const { data, loading } = useAsyncData(() => getCategoryDetails(categoryId), [categoryId]);

  if (loading) return <LoadingState label="Loading collection..." />;
  if (!data) {
    return (
      <PageSection eyebrow="Category" title="Category not found" subtitle="This collection does not exist in the current storefront.">
        <NotFoundState title="Category not found" description="Try another collection or return to the full category directory." primaryAction={{ label: "Open categories", to: "/categories" }} secondaryAction={{ label: "Browse shop", to: "/shop" }} />
      </PageSection>
    );
  }

  const { category, items, promotedProducts } = data;

  return (
    <PageSection eyebrow="Category" title={category.heroTitle} subtitle={category.description}>
      <div className="category-hero">
        <img src={category.heroImage} alt={category.name} />
        <div className="category-hero-copy">
          <span className="badge">{category.name}</span>
          <h2>{category.description}</h2>
          <div className="chip-row">
            <button className={`chip${activeSubcategory === "All" ? " active" : ""}`} type="button" onClick={() => setActiveSubcategory("All")}>All</button>
            {category.subcategories.map((subCategory) => (
              <button key={subCategory} className={`chip${activeSubcategory === subCategory ? " active" : ""}`} type="button" onClick={() => setActiveSubcategory(subCategory)}>
                {subCategory}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="category-layout">
        <aside className="summary-box">
          <h3>Category filters</h3>
          <div className="list-stack compact">
            <div className="list-card compact-row"><span>Best rated</span></div>
            <div className="list-card compact-row"><span>In stock only</span></div>
            <div className="list-card compact-row"><span>Fast shipping</span></div>
            <div className="list-card compact-row"><span>Newest products</span></div>
          </div>
        </aside>
        <div className="product-grid">
          {items.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>

      <div className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Promoted</p>
            <h2>Cross-category picks worth surfacing here</h2>
          </div>
        </div>
        <div className="product-grid">
          {promotedProducts.map((product) => <ProductCard key={product.id} product={product} compact />)}
        </div>
      </div>
    </PageSection>
  );
}

export default CategoryDetailsPage;
