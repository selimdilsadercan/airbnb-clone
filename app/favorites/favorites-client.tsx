import Container from "@/components/container";
import Heading from "@/components/heading";
import ListingCard from "@/components/listings/listing-card";
import { SafeListing, SafeProfile } from "@/types";

interface FavoritesClientProps {
  listings: SafeListing[];
  profile?: SafeProfile | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({ listings, profile }) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing: any) => (
          <ListingCard profile={profile} key={listing.id} data={listing} />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
