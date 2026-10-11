import type { MetadataRoute } from "next";
import { getArticles, siteUrl } from "@/lib/cms";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result: MetadataRoute.Sitemap = [
    "",
    "/latest",
    "/judgments",
    "/orders",
    "/about",
    "/editorial-policy",
    "/corrections-policy",
    "/contact",
    "/privacy",
    "/terms",
  ].map((p) => ({ url: siteUrl(p) }));
  // Bounded page-by-page CMS pagination; no draft query or browser-side content filtering.
  for (let page = 1; page <= 1666; page++) {
    const data = await getArticles({ page, pageSize: 30 });
    for (const a of data.data)
      result.push({
        url: siteUrl("/judgments/" + a.slug),
        lastModified: a.updatedAt,
      });
    if (page >= data.meta.pagination.pageCount) break;
  }
  return result;
}
