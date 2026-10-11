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
      title="Orders & directions"
      description="Procedural developments and interim directions from the Court."
      basePath="/orders"
      documentType="Order"
    />
  );
}
