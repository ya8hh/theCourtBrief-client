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
      title="Explore the record"
      description="Search published reporting, case details and statutory references."
      basePath="/search"
    />
  );
}
