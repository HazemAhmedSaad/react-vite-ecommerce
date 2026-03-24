import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/cartApi";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,

    staleTime: 1000 * 60, // الكارت fresh لمدة دقيقة
    gcTime: 1000 * 60 * 10, // يفضل في الكاش 10 دقايق

    refetchOnWindowFocus: false,
    refetchOnReconnect: true,

    // 🔥 يمنع flicker مع optimistic updates
    placeholderData: (prev) => prev,
  });
};
