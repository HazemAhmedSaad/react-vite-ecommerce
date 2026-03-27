import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addToCart } from "../api/cartApi";
export const useAddToCart = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addToCart"],
    mutationFn: addToCart,

    onMutate: async (variables) => {
      toast.loading("Adding...", { id: variables });

      // لو فيه custom logic
      const context = await options.onMutate?.(variables);

      return context;
    },

    onSuccess: (data, variables, context) => {
      toast.success("Added to cart 🛒", {
        id: variables,
        style: { background: "#28a745", color: "#fff" },
      });

      queryClient.setQueryData(["cart"], data);

      options.onSuccess?.(data, variables, context);
    },

    onError: (err, variables, context) => {
      toast.error("Something went wrong", {
        id: variables,
        style: { background: "#dc3545", color: "#fff" },
      });

      options.onError?.(err, variables, context);
    },
    
  });
};
