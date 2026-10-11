import { ArticleView } from "@/components/article-view";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getArticles, siteUrl } from "@/lib/cms";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return { title: "Article not found", robots: { index: false } };
  return {
    title: a.seoTitle || a.headline,
    description: a.seoDescription || a.summary,
    alternates: { canonical: siteUrl(`/judgments/${a.slug}`) },
    openGraph: {
      type: "article",
      title: a.headline,
      description: a.summary,
      url: siteUrl(`/judgments/${a.slug}`),
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt,
      authors: [a.author],
    },
    twitter: { card: "summary", title: a.headline, description: a.summary },
  };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) notFound();
  const related = await getArticles({ category: a.category, pageSize: 4 })
    .then((r) =>
      r.data.filter((x) => x.documentId !== a.documentId).slice(0, 3),
    )
    .catch(() => []);
  return <ArticleView a={a} related={related} />;
}
