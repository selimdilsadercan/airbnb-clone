"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";

import { SafeListing, SafeProfile, SafeReservation } from "@/types";

import { categories } from "@/components/nav/categories";
import Container from "@/components/container";
import ListingHead from "@/components/listings/listing-head";
import ListingInfo from "@/components/listings/listing-info";
import ListingReservation from "@/components/listings/listing-reservation";
import { useMutation } from "@tanstack/react-query";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection"
};

interface Props {
  reservations?: SafeReservation[];
  listing: SafeListing & { profile: SafeProfile };
  profile?: any;
}

function ListingClient({ listing, reservations = [], profile }: Props) {
  //hooks
  const router = useRouter();

  //disabled dates
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({ start: new Date(reservation.startDate), end: new Date(reservation.endDate) });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  //category
  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  //states
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  //mutation
  const { mutate: createReservation, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      await axios.post("/api/reservations", values);
    },
    onSuccess: () => {
      toast.success("Listing reserved!");
      setDateRange(initialDateRange);
      router.push("/trips");
    },
    onError: (err) => {
      console.log("[reservation]", err);
    }
  });

  //create reservation
  const onCreateReservation = useCallback(() => {
    if (!profile) return router.push("/sign-in");
    createReservation({ totalPrice, startDate: dateRange.startDate, endDate: dateRange.endDate, listingId: listing?.id });
  }, [totalPrice, dateRange, listing?.id, router]);

  //updaate date
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) setTotalPrice(dayCount * listing.price);
      else setTotalPrice(listing.price);
    }
  }, [dateRange, listing.price]);

  ////

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto ">
        <div className="flex flex-col gap-6">
          <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} id={listing.id} profile={profile} />
          <div className="grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10">
            <ListingInfo profile={profile} category={category} description={listing.description} roomCount={listing.roomCount} guestCount={listing.guestCount} bathroomCount={listing.bathroomCount} locationValue={listing.locationValue} />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation price={listing.price} totalPrice={totalPrice} onChangeDate={(value) => setDateRange(value)} dateRange={dateRange} onSubmit={onCreateReservation} disabled={isLoading} disabledDates={disabledDates} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingClient;
