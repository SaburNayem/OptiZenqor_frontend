function ErrorState({ title, description, onRetry }) {
  return (
    <div className="feedback-card error-state-card">
      <div className="feedback-copy">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {onRetry ? (
        <button className="button ghost" type="button" onClick={onRetry}>
          Try Again
        </button>
      ) : null}
    </div>
  );
}

export default ErrorState;
