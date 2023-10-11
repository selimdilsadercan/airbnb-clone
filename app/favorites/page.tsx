import ClientOnly from "@/components/client-only";
import EmptyState from "@/components/empty-state";
import FavoritesClient from "./favorites-client";
import getFavoriteListings from "@/helpers/get-favorite-listings";
import { currentProfile } from "@/lib/current-profile";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const profile = await currentProfile();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings." />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} profile={profile} />
    </ClientOnly>
  );
};

export default ListingPage;
