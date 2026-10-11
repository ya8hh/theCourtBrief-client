"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="wrap empty">
      <h1>We couldn’t load this page</h1>
      <p>The publication service may be temporarily unavailable.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
