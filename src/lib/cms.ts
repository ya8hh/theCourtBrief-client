import "server-only";
import {
  articleSchema,
  listSchema,
  type ArticleList,
} from "@court/shared-types";
const cmsUrl = process.env.CMS_URL || "http://127.0.0.1:1337";
export class CmsUnavailableError extends Error {
  constructor() {
    super("The publication service is temporarily unavailable.");
  }
}
async function request(path: string) {
  let response: Response;
  try {
    response = await fetch(`${cmsUrl}${path}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    throw new CmsUnavailableError();
  }
  if (response.status === 404) return null;
  if (!response.ok) throw new CmsUnavailableError();
  return response.json();
}
export async function getArticles(
  params: {
    page?: number;
    category?: string;
    documentType?: string;
    q?: string;
    pageSize?: number;
    publishedFrom?: string;
    publishedTo?: string;
    judgmentFrom?: string;
    judgmentTo?: string;
    judge?: string;
    topic?: string;
  } = {},
): Promise<ArticleList> {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params))
    if (value) query.set(key, String(value));
  return listSchema.parse(await request(`/api/public/articles?${query}`));
}
export async function getArticle(slug: string) {
  const result = await request(
    `/api/public/articles/${encodeURIComponent(slug)}`,
  );
  return result ? articleSchema.parse(result.data) : null;
}
export function publicPdfUrl(slug: string) {
  return `/judgments/${encodeURIComponent(slug)}/pdf`;
}
export function siteUrl(path = "") {
  return `${(process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "")}${path}`;
}
