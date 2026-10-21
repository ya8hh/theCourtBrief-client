import { getArticles, siteUrl } from "@/lib/cms";
export const dynamic = "force-dynamic";
const xml = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
export async function GET() {
  const { data } = await getArticles({ pageSize: 30 });
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>CourtroomDigest</title><link>${xml(siteUrl())}</link><description>Supreme Court reporting from official sources.</description>${data.map((a) => `<item><title>${xml(a.headline)}</title><link>${xml(siteUrl("/judgments/" + a.slug))}</link><guid>${xml(siteUrl("/judgments/" + a.slug))}</guid><pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate><description>${xml(a.summary)}</description></item>`).join("")}</channel></rss>`,
    {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
}
