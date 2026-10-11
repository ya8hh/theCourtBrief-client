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
      title="Judgments, explained"
      description="Decisions of the Supreme Court and the reasoning behind them."
      basePath="/judgments"
      documentType="Judgment"
    />
  );
}
