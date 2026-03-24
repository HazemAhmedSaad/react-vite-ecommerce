import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCartItem } from "../api/cartApi";

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateCartItem"],
    mutationFn: updateCartItem,

    onMutate: ({ productId }) => {
      // toast.loading("Updating...", { id: productId });
    },

    onSuccess: (data, { productId }) => {
      // toast.success("Updated ✅", {
      //   id: productId,
      //   style: { background: "#28a745", color: "#fff" },
      // });

      queryClient.setQueryData(["cart"], data);
    },

    onError: (err, { productId }) => {
      toast.error("Failed to update ", {
        id: productId,
        style: { background: "#dc3545", color: "#fff" },
      });
    },
  });
};
