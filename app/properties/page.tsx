import ClientOnly from "@/components/client-only";
import EmptyState from "@/components/empty-state";
import getListings from "@/helpers/get-listings";
import { currentProfile } from "@/lib/current-profile";
import PropertiesClient from "./properties-client";

const PropertiesPage = async () => {
  const profile = await currentProfile();

  if (!profile) return <EmptyState title="Unauthorized" subtitle="Please login" />;

  const listings = await getListings({ profileId: profile.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No properties found" subtitle="Looks like you have no properties." />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} profile={profile} />
    </ClientOnly>
  );
};

export default PropertiesPage;
