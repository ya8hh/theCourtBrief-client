export const dynamic = "force-dynamic";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  try {
    const upstream = await fetch(
      `${process.env.CMS_URL || "http://127.0.0.1:1337"}/api/public/articles/${encodeURIComponent(slug)}/pdf`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
        redirect: "manual",
      },
    );
    if ([301, 302, 307, 308].includes(upstream.status)) {
      const location = upstream.headers.get("location");
      if (location && new URL(location).protocol === "https:")
        return Response.redirect(location, 302);
      return new Response("PDF unavailable", { status: 502 });
    }
    if (upstream.status === 404)
      return new Response("Original PDF unavailable", { status: 404 });
    if (!upstream.ok)
      return new Response("Source service unavailable", { status: 503 });
    return new Response(upstream.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="judgment.pdf"',
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Source service unavailable", { status: 503 });
  }
}
