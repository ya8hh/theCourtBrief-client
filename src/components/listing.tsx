import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, AlertCircle } from "lucide-react";
import { categories, type ArticleList } from "@court/shared-types";
import { getArticles } from "@/lib/cms";
import { ArticleCard } from "./article-card";
export type SearchParams = Record<string, string | string[] | undefined>;
export async function Listing({
  searchParams,
  title = "The latest from the Court",
  description = "Judgments, orders and the legal questions that matter.",
  documentType,
  basePath = "/",
}: {
  searchParams: SearchParams;
  title?: string;
  description?: string;
  documentType?: string;
  basePath?: string;
}) {
  const raw =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const page = Number.isSafeInteger(raw) && raw > 0 && raw <= 10000 ? raw : 1;
  const category =
    typeof searchParams.category === "string" &&
    categories.includes(searchParams.category as (typeof categories)[number])
      ? searchParams.category
      : undefined;
  const q =
    typeof searchParams.q === "string"
      ? searchParams.q.slice(0, 200)
      : undefined;
  const extra: Record<string, string> = {};
  for (const key of [
    "publishedFrom",
    "publishedTo",
    "judgmentFrom",
    "judgmentTo",
    "judge",
    "topic",
  ])
    if (typeof searchParams[key] === "string")
      extra[key] = String(searchParams[key]).slice(0, 200);
  if (!documentType && typeof searchParams.documentType === "string")
    documentType = searchParams.documentType;
  let result: ArticleList;
  try {
    result = await getArticles({ page, category, documentType, q, ...extra });
  } catch {
    return (
      <section className="wrap section">
        <h1>{title}</h1>
        <div className="empty" role="status">
          <AlertCircle size={28} />
          <h2>The news desk is temporarily unavailable</h2>
          <p>
            We couldn’t reach the publication service. Please try again shortly.
          </p>
          <Link className="button" href={basePath}>
            Try again <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    );
  }
  const {
    data,
    meta: { pagination },
  } = result;
  const href = (targetPage: number, targetCategory = category) => {
    const params = new URLSearchParams();
    if (targetPage > 1) params.set("page", String(targetPage));
    if (targetCategory) params.set("category", targetCategory);
    if (q) params.set("q", q);
    for (const [key, value] of Object.entries(extra))
      if (value) params.set(key, value);
    if (basePath === "/search" && documentType)
      params.set("documentType", documentType);
    return `${basePath}${params.size ? "?" + params : ""}`;
  };
  const featured =
    basePath === "/" && page === 1 && !category && !q ? data[0] : null;
  return (
    <div className="wrap section">
      <div className="section-heading">
        <div>
          <p className="kicker">THE PUBLIC RECORD</p>
          <h1>{title}</h1>
          <p className="section-intro">{description}</p>
        </div>
        <span className="edition-label">
          INDEPENDENT PERSPECTIVE
          <br />
          OFFICIAL SOURCES
        </span>
      </div>
      {basePath === "/search" && (
        <form className="search-form" action="/search">
          <label htmlFor="q">
            Search headlines, case details and legal references
          </label>
          <div>
            <input
              id="q"
              name="q"
              type="search"
              defaultValue={q}
              maxLength={200}
              placeholder="A case, a judge, a legal question…"
            />
            <button className="button" type="submit">
              Search <ArrowRight size={16} />
            </button>
          </div>
          <details>
            <summary>Filter published coverage</summary>
            <div className="editor-fields">
              {[
                ["publishedFrom", "Published from"],
                ["publishedTo", "Published until"],
                ["judgmentFrom", "Decision from"],
                ["judgmentTo", "Decision until"],
                ["judge", "Judge (exact name)"],
                ["topic", "Legal topic (exact name)"],
              ].map(([key, label]) => (
                <label key={key}>
                  {label}
                  <input
                    name={key}
                    type={
                      key.includes("From") || key.includes("To")
                        ? "date"
                        : "text"
                    }
                    defaultValue={extra[key] || ""}
                  />
                </label>
              ))}
              <label>
                Document type
                <select name="documentType" defaultValue={documentType || ""}>
                  <option value="">All document types</option>
                  {[
                    "Judgment",
                    "Daily Order",
                    "Interim Order",
                    "Notice",
                    "Other",
                  ].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
            </div>
          </details>
        </form>
      )}
      <nav className="filters" aria-label="Article categories">
        <Link href={href(1, "")} aria-current={!category ? "page" : undefined}>
          All coverage
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={href(1, c)}
            aria-current={category === c ? "page" : undefined}
          >
            {c}
          </Link>
        ))}
      </nav>
      {featured && (
        <div className="lead-grid">
          <ArticleCard article={featured} featured />
          <aside className="source-note">
            <BookOpen size={28} strokeWidth={1.2} />
            <p className="kicker">BEYOND THE HEADLINE</p>
            <h2>
              Read the ruling.
              <br />
              Understand the impact.
            </h2>
            <p>
              Every article links to its official source. Find case details, key
              findings and the original judgment alongside our reporting.
            </p>
            <Link href="/editorial-policy">
              Our editorial approach <ArrowUpRightIcon />
            </Link>
          </aside>
        </div>
      )}
      <div className="list-heading">
        <h2>
          {q
            ? `Results for “${q}”`
            : featured
              ? "More from the Court"
              : "Latest coverage"}
        </h2>
        <span>
          {pagination.total} {pagination.total === 1 ? "article" : "articles"}
        </span>
      </div>
      {data.length === 0 ? (
        <div className="empty">
          <BookOpen size={32} strokeWidth={1.25} />
          <h2>
            {q || category || page > 1
              ? "No articles match this view"
              : "The next development starts here"}
          </h2>
          <p>
            {q || category || page > 1
              ? "Try another category, search term or page."
              : "Our first reports will appear here after editorial review. Every published article will be linked to its official source."}
          </p>
          {(q || category || page > 1) && (
            <Link className="text-link" href={basePath}>
              View all coverage <ArrowRight size={16} />
            </Link>
          )}
        </div>
      ) : (
        <div className="article-grid">
          {(featured ? data.slice(1) : data).map((article) => (
            <ArticleCard key={article.documentId} article={article} />
          ))}
        </div>
      )}
      {pagination.pageCount > 1 && (
        <nav className="pagination" aria-label="Pagination">
          {page > 1 ? (
            <Link href={href(page - 1)}>
              <ArrowLeft size={16} /> Previous
            </Link>
          ) : (
            <span />
          )}
          <span>
            Page {page} of {pagination.pageCount}
          </span>
          {page < pagination.pageCount ? (
            <Link href={href(page + 1)}>
              Next <ArrowRight size={16} />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}
function ArrowUpRightIcon() {
  return <ArrowRight size={15} aria-hidden="true" />;
}
