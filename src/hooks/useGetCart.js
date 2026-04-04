import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/cartApi";
import { useContext } from "react";
import { autContext } from "../context/AuthenticationToken";

export const useCart = () => {
    const { token } = useContext(autContext);
  
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    enabled: !!token,
  });
};
