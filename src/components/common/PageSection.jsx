function PageSection({ eyebrow, title, subtitle, aside, children }) {
  return (
    <section className="page-section">
      <div className="container">
        <header className="section-header">
          <div>
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h1>{title}</h1>
            {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
          </div>
          {aside ? <div className="section-aside">{aside}</div> : null}
        </header>
        {children}
      </div>
    </section>
  );
}

export default PageSection;
