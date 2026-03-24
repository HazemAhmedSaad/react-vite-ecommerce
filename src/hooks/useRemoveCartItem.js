import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeCartItem } from "../api/cartApi";

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["removeCartItem"],
    mutationFn: removeCartItem,

    onMutate: (productId) => {
      // toast.loading("Removing...", { id: productId });
    },

    onSuccess: (data, productId) => {
      // toast.success("Removed 🗑️", {
      //   id: productId,
      //   style: { background: "#28a745", color: "#fff" },
      // });
      queryClient.setQueryData(["cart"], data);
    },

    onError: (err, productId) => {
      toast.error("Failed to remove", {
        id: productId,
        style: { background: "#dc3545", color: "#fff" },
      });
    },
  });
};
