import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/cartApi";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};
