import { Link } from "react-router-dom";

function SectionHeading({ eyebrow, title, subtitle, link, linkLabel = "View all" }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
      </div>
      {link ? (
        <Link className="section-link" to={link}>
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}

export default SectionHeading;
