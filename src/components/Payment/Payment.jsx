import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "./schema";
import api from "../Utils/api";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function PaymentForm() {
  const navigate = useNavigate();
  const { cartId } = useParams();
  const queryClient = useQueryClient(); // ✅ هنا الصح
  // console.log(cartId);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    //   console.log(cartId);

    if (!cartId) return;

    try {
      await api.post(`/v2/orders/${cartId}`, {
        shippingAddress: data,
      });

      toast.success("Order placed successfully ✅");

      // 🔥 امسح الكارت من الكاش
      queryClient.setQueryData(["cart"], null);
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      reset();
      navigate("/cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="payment-form container mt-5 pt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Address" {...register("details")} />
        <p className="text-red-500 text-sm">{errors.details?.message}</p>

        <input
          placeholder="Phone"
          {...register("phone")}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
        />
        <p>{errors.phone?.message}</p>

        <input placeholder="City" {...register("city")} />
        <p>{errors.city?.message}</p>

        <input placeholder="Postal Code" {...register("postalCode")} />
        <p>{errors.postalCode?.message}</p>

        <button disabled={!isValid || !isDirty || isSubmitting}>
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
