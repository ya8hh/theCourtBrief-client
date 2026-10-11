import { Listing, type SearchParams } from "@/components/listing";
export const dynamic = "force-dynamic";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return <Listing searchParams={await searchParams} />;
}
