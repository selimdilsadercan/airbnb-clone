"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import useCountries from "@/hooks/use-countries";
import { SafeListing, SafeReservation } from "@/types";
import HeartButton from "../heart-button";
import Button from "../ui/button";

interface Props {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  profile?: any;
}

function ListingCard({ data, reservation, onAction, disabled, actionLabel, actionId = "", profile }: Props) {
  //hooks
  const router = useRouter();
  const { getByValue } = useCountries();

  //get location
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div onClick={() => router.push(`/listings/${data.id}`)} className="col-span-1 cursor-pointer group">
      <div className="flex flex-col w-full gap-2">
        <div className="relative w-full overflow-hidden aspect-square rounded-xl">
          <Image fill className="object-cover w-full h-full transition group-hover:scale-110" src={data.imageSrc} alt="Listing" />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} profile={profile} />
          </div>
        </div>
        <div className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">{reservationDate || data.category}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />}
      </div>
    </div>
  );
}

export default ListingCard;
