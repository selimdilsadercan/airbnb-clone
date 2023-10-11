"use client";

import useCountries from "@/hooks/use-countries";
import Image from "next/image";
import Heading from "../heading";
import HeartButton from "../heart-button";

interface Props {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  profile?: any;
}

function ListingHead({ title, locationValue, imageSrc, id, profile }: Props) {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />

      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image src={imageSrc} fill className="object-cover w-full" alt="Image" />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} profile={profile} />
        </div>
      </div>
    </>
  );
}

export default ListingHead;
