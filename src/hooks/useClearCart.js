import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "../api/cartApi";

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["clearCart"],
    mutationFn: clearCart,

    // 🔥 Optimistic Update
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData(["cart"]);

      // تفضى الكارت فورًا
      queryClient.setQueryData(["cart"], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          products: [],
          totalCartPrice: 0,
        },
      }));

      return { previousCart };
    },

    // ❌ rollback لو حصل error
    onError: (err, variables, context) => {
      queryClient.setQueryData(["cart"], context.previousCart);
    },

    // ✅ success
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data);
    },

    // 🔄 sync احتياطي
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};