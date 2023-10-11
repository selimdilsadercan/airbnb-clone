import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

interface IUseFavorite {
  listingId: string;
  profile?: any;
}

const useFavorite = ({ listingId, profile }: IUseFavorite) => {
  const router = useRouter();

  const hasFavorited = useMemo(() => {
    const list = profile?.favoriteIds || [];

    return list.includes(listingId);
  }, [profile, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!profile) return router.push("/sign-in");

      try {
        let request;

        if (hasFavorited) request = () => axios.delete(`/api/favorites/${listingId}`);
        else request = () => axios.post(`/api/favorites/${listingId}`);

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [profile, hasFavorited, listingId, router]
  );

  return {
    hasFavorited,
    toggleFavorite
  };
};

export default useFavorite;
