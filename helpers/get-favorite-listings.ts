import { currentProfile } from "@/lib/current-profile";
import { Listing } from "@prisma/client";
import db from "@/lib/db";

export default async function getFavoriteListings() {
  try {
    //auth control
    const profile = await currentProfile();
    if (!profile) return [];

    //get favorite listings
    const favorites = await db.listing.findMany({
      where: { id: { in: [...(profile.favoriteIds || [])] } }
    });

    //turn to safe
    const safeFavorites = favorites.map((favorite: Listing) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString()
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
