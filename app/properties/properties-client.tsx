"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeListing, SafeProfile } from "@/types";
import Container from "@/components/container";
import Heading from "@/components/heading";
import ListingCard from "@/components/listings/listing-card";

interface Props {
  listings: SafeListing[];
  profile?: SafeProfile | null;
}

function PropertiesClient({ listings, profile }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing: any) => (
          <ListingCard key={listing.id} data={listing} actionId={listing.id} onAction={onDelete} disabled={deletingId === listing.id} actionLabel="Delete property" profile={profile} />
        ))}
      </div>
    </Container>
  );
}

export default PropertiesClient;
