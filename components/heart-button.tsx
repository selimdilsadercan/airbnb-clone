"use client";

import useFavorite from "@/hooks/use-favorite";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  listingId: string;
  profile?: any;
}

function HeartButton({ listingId, profile }: Props) {
  const { hasFavorited, toggleFavorite } = useFavorite({ listingId, profile });

  return (
    <div onClick={toggleFavorite} className="relative transition cursor-pointer hover:opacity-80">
      <AiOutlineHeart size={28} className=" fill-white absolute -top-[2px] -right-[2px]" />
      <AiFillHeart size={24} className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"} />
    </div>
  );
}

export default HeartButton;
