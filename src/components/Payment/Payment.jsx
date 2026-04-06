import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "./schema";
import api from "../Utils/api";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import "./Payment.css";
function PaymentForm() {
  const navigate = useNavigate();
  const { cartId } = useParams();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
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
      queryClient.removeQueries({ queryKey: ["cart"] });
      // queryClient.invalidateQueries({ queryKey: ["cart"] });
      reset();
      navigate("/cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Checkout</h2>
        <input
          className={errors.details ? "error-input input" : "input"}
          disabled={isSubmitting}
          placeholder="Address"
          {...register("details")}
        />

        {errors.details && <p className="error">{errors.details.message}</p>}
        <input
          className={errors.phone ? "error-input input" : "input"}
          disabled={isSubmitting}
          placeholder="Phone"
          {...register("phone")}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
        />
        {errors.phone && <p className="error">{errors.phone.message}</p>}
        <input
          className={errors.city ? "error-input input" : "input"}
          disabled={isSubmitting}
          placeholder="City"
          {...register("city")}
        />
        {errors.city && <p className="error">{errors.city.message}</p>}

        <input
          className={errors.postalCode ? "error-input input" : "input"}
          disabled={isSubmitting}
          placeholder="Postal Code"
          {...register("postalCode")}
        />
        {errors.postalCode && (
          <p className="error">{errors.postalCode.message}</p>
        )}
        <button
          className={isSubmitting ? "loading" : ""}
          disabled={!isValid || !isDirty || isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
