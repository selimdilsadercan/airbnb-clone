import db from "@/lib/db";

export interface IListingsParams {
  profileId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { profileId, roomCount, guestCount, bathroomCount, locationValue, startDate, endDate, category } = params;

    //create query
    let query: any = {};
    if (profileId) query.profileId = profileId;
    if (category) query.category = category;
    if (roomCount) query.roomCount = { gte: +roomCount };
    if (guestCount) query.guestCount = { gte: +guestCount };
    if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };
    if (locationValue) query.locationValue = locationValue;
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              { endDate: { gte: startDate }, startDate: { lte: startDate } },
              { startDate: { lte: endDate }, endDate: { gte: endDate } }
            ]
          }
        }
      };
    }

    const listings = await db.listing.findMany({
      where: query,
      orderBy: { createdAt: "desc" }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
