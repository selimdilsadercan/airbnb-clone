"use client";

import useCountries from "@/hooks/use-countries";
import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import Avatar from "../avatar";
import ListingCategory from "./listing-category";

const Map = dynamic(() => import("../map"), {
  ssr: false
});

interface Props {
  profile: any;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: { icon: IconType; label: string; description: string } | undefined;
  locationValue: string;
}

function ListingInfo({ profile, description, guestCount, roomCount, bathroomCount, category, locationValue }: Props) {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="flex flex-col col-span-4 gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold ">
          <div>Hosted by {profile?.name}</div>
          <Avatar src={profile?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && <ListingCategory icon={category.icon} label={category?.label} description={category?.description} />}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
}

export default ListingInfo;
