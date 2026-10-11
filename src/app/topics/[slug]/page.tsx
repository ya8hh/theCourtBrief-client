import { Listing, type SearchParams } from "@/components/listing";
export const dynamic = "force-dynamic";
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { slug } = await params;
  const topic = decodeURIComponent(slug).replace(/-/g, " ");
  return (
    <Listing
      searchParams={{ ...(await searchParams), topic }}
      basePath={"/topics/" + encodeURIComponent(slug)}
      title={topic}
      description="Published Supreme Court reporting on this legal topic."
    />
  );
}
