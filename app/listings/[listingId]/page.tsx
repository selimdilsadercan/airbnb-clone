import ClientOnly from "@/components/client-only";
import ListingClient from "./listing-client";
import EmptyState from "@/components/empty-state";
import getReservations from "@/helpers/get-reservations";
import getListingById from "@/helpers/get-listing-by-id";
import { currentProfile } from "@/lib/current-profile";

const ListingPage = async ({ params }: { params: { listingId: string } }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const profile = await currentProfile();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} reservations={reservations} profile={profile} />
    </ClientOnly>
  );
};

export default ListingPage;
