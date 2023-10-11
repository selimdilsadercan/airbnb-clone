"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeProfile } from "@/types";
import Heading from "@/components/heading";
import ListingCard from "@/components/listings/listing-card";
import Container from "@/components/container";

interface Props {
  reservations: SafeReservation[];
  profile?: SafeProfile | null;
}

function ReservationsClient({ reservations, profile }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation: any) => (
          <ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} actionId={reservation.id} onAction={onCancel} disabled={deletingId === reservation.id} actionLabel="Cancel guest reservation" profile={profile} />
        ))}
      </div>
    </Container>
  );
}

export default ReservationsClient;
