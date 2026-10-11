import Link from "next/link";
import { Scale, Search } from "lucide-react";

export function Header() {
  return (
    <header className="site-header">
      <div className="masthead wrap">
        <Link href="/" className="brand" aria-label="The Court Brief homepage">
          <Scale aria-hidden="true" size={31} />
          <span>
            The Court Brief
            <span className="brand-sub">
              SUPREME COURT OF INDIA · EXPLAINED
            </span>
          </span>
        </Link>
      </div>
      <div className="nav-line">
        <div className="wrap nav-inner">
          <nav aria-label="Main navigation">
            <Link href="/">Latest</Link>
            <Link href="/judgments">Judgments</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/about">About the publication</Link>
          </nav>
          <Link
            className="search-link"
            href="/search"
            aria-label="Search published articles"
          >
            <Search size={17} aria-hidden="true" />
            <span>Search</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Link className="footer-brand" href="/">
            The Court Brief<span className="accent">.</span>
          </Link>
          <p>
            Supreme Court developments, clearly explained.
            <br />
            An independent publication. No official affiliation.
          </p>
        </div>
        <nav aria-label="Publication information">
          {[
            ["About", "about"],
            ["Editorial Policy", "editorial-policy"],
            ["Corrections Policy", "corrections-policy"],
            ["Contact", "contact"],
            ["Privacy Policy", "privacy"],
            ["Terms", "terms"],
          ].map(([label, href]) => (
            <Link key={href} href={`/${href}`}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="wrap footer-bottom">
        Reporting for understanding. Original sources for verification.
      </div>
    </footer>
  );
}
