import { currentProfile } from "@/lib/current-profile";
import ClientOnly from "@/components/client-only";
import EmptyState from "@/components/empty-state";
import getReservations from "@/helpers/get-reservations";
import TripsClient from "./trips-client";

const TripsPage = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ profileId: profile.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No trips found" subtitle="Looks like you havent reserved any trips." />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} profile={profile} />
    </ClientOnly>
  );
};

export default TripsPage;
