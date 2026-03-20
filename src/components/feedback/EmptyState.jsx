import { Link } from "react-router-dom";

function EmptyState({ title, description, action }) {
  return (
    <div className="feedback-card empty-state-card">
      <div className="feedback-copy">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {action ? (
        <Link className="button primary" to={action.to}>
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}

export default EmptyState;
