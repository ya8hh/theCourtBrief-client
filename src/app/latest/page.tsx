import { Listing, type SearchParams } from "@/components/listing";
export const dynamic = "force-dynamic";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <Listing
      searchParams={await searchParams}
      title="The latest from the Court"
      description="Recent Supreme Court judgments and orders."
      basePath="/latest"
    />
  );
}
