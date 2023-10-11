import ClientOnly from "@/components/client-only";
import EmptyState from "@/components/empty-state";
import getReservations from "@/helpers/get-reservations";
import { currentProfile } from "@/lib/current-profile";
import ReservationsClient from "./reservations-client";

const ReservationsPage = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ authorId: profile.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No reservations found" subtitle="Looks like you have no reservations on your properties." />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient reservations={reservations} profile={profile} />
    </ClientOnly>
  );
};

export default ReservationsPage;
