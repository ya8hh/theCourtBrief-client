import Link from "next/link";
export default function NotFound() {
  return (
    <div className="wrap empty">
      <p className="kicker">404 · NOT IN THE PUBLIC RECORD</p>
      <h1>Article not found</h1>
      <p>This page is unavailable or has not been published.</p>
      <Link className="button" href="/">
        Return to latest coverage
      </Link>
    </div>
  );
}
