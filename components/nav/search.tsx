"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { differenceInDays } from "date-fns";
import useCountries from "@/hooks/use-countries";
import useSearchModal from "@/hooks/use-search-modal";

////

function Search() {
  //hooks
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  //params
  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  //get location
  const locationLabel = useMemo(() => {
    if (locationValue) return getByValue(locationValue as string)?.label;
    return "Anywhere";
  }, [locationValue, getByValue]);

  //get duration
  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);
      if (diff === 0) diff = 1;
      return `${diff} Days`;
    }
    return "Any Week";
  }, [startDate, endDate]);

  //get guest
  const guestLabel = useMemo(() => {
    if (guestCount) return `${guestCount} Guests`;
    return "Add Guests";
  }, [guestCount]);

  ////

  return (
    <div onClick={() => searchModal.onOpen()} className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="px-6 text-sm font-semibold">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">{durationLabel}</div>
        <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 text-white rounded-full bg-rose-500">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
