function PageSection({ eyebrow, title, subtitle, children }) {
  return (
    <section className="page-section">
      <div className="container">
        <header className="section-header">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="section-subtitle">{subtitle}</p>
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}

export default PageSection;
