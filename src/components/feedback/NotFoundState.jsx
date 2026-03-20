import { Link } from "react-router-dom";

function NotFoundState({ title, description, primaryAction, secondaryAction }) {
  return (
    <div className="feedback-card not-found-state-card">
      <div className="feedback-copy">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="feedback-actions">
        {primaryAction ? (
          <Link className="button primary" to={primaryAction.to}>
            {primaryAction.label}
          </Link>
        ) : null}
        {secondaryAction ? (
          <Link className="button ghost" to={secondaryAction.to}>
            {secondaryAction.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default NotFoundState;
