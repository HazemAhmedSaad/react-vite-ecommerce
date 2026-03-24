import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
import { removeCartItem } from "../api/cartApi";

export const useRemoveCartItem = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["removeCartItem"],
    mutationFn: removeCartItem,

    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(["cart"], data);

      // يشغل اللي جاي من بره
      options.onSuccess?.(data, variables, context);
    },

    onMutate: (variables) => {
      return options.onMutate?.(variables);
    },

    onError: (error, variables, context) => {
      options.onError?.(error, variables, context);
    },
  });
};
