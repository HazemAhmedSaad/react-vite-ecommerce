import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addToCart } from "../api/cartApi";
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addToCart"],
    mutationFn: addToCart,
    onMutate: (productId) => {
      toast.loading("Adding...", { id: productId });
    },
    onSuccess: (data, productId) => {
      toast.success("Added to cart 🛒", {
        id: productId,
        style: { background: "#28a745", color: "#fff" },
      });
      queryClient.setQueryData(["cart"], data);
    },
    onError: (err, productId) => {
      console.log(err);
      toast.error("Something went wrong", {
        id: productId,
        style: { background: "#dc3545", color: "#fff" },
      });
    },
  });
};
