function LoadingState({ label = "Loading..." }) {
  return (
    <div className="feedback-card loading-state-card" aria-live="polite">
      <div className="loading-spinner" />
      <p>{label}</p>
    </div>
  );
}

export default LoadingState;
