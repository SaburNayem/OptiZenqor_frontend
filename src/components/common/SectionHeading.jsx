import { Link } from "react-router-dom";

function SectionHeading({ eyebrow, title, link }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <Link to={link}>View all</Link>
    </div>
  );
}

export default SectionHeading;
