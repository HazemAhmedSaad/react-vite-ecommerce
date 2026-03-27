import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
import { removeCartItem } from "../api/cartApi";

export const useRemoveCartItem = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["removeCartItem"],
    mutationFn: removeCartItem,

    onMutate: async (variables) => {
      return await options.onMutate?.(variables);
    },

    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(["cart"], data);

      options.onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      toast.error("Failed to remove item", {
        id: variables,
        style: { background: "#dc3545", color: "#fff" },
      });

      options.onError?.(error, variables, context);
    },
  });
};
