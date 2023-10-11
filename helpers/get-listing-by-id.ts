import db from "@/lib/db";

export default async function getListingById({ listingId }: { listingId: string }) {
  try {
    //get listing
    const listing = await db.listing.findUnique({
      where: { id: listingId },
      include: { profile: true }
    });
    if (!listing) return null;

    //return safelisting with profile
    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      profile: {
        ...listing.profile,
        createdAt: listing.profile.createdAt.toString(),
        updatedAt: listing.profile.updatedAt.toString(),
        email: listing.profile.email?.toString() || null
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
