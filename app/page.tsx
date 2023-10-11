import Container from "@/components/container";
import EmptyState from "@/components/empty-state";
import ListingCard from "@/components/listings/listing-card";
import getListings, { IListingsParams } from "@/helpers/get-listings";
import initialProfile from "@/lib/initial-profile";

interface Props {
  searchParams: IListingsParams;
}

async function Page({ searchParams }: Props) {
  const profile = await initialProfile();

  const listings = await getListings(searchParams);

  if (listings.length === 0) return <EmptyState showReset />;

  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing: any) => (
          <ListingCard key={listing.id} data={listing} profile={profile} />
        ))}
      </div>
    </Container>
  );
}

export default Page;
