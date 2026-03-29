import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCartItem } from "../api/cartApi";

export const useUpdateCartItem = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateCartItem"],
    mutationFn: updateCartItem,

    onMutate: async (variables) => {
      return await options.onMutate?.(variables);
    },

    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(["cart"], data);
      options.onSuccess?.(data, variables, context);
    },

    onError: (err, variables, context) => {
      toast.error("Failed to update", {
        id: variables?.productId || "update-cart",
        style: { background: "#dc3545", color: "#fff" },
      });

      options.onError?.(err, variables, context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
