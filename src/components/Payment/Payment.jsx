import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "./schema";
import api from "../Utils/api";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import "./Payment.css";
import { useCart } from "../../hooks/useGetCart";
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

function PaymentForm() {
  const navigate = useNavigate();
  const { cartId } = useParams();
  const queryClient = useQueryClient();
  const { data: cartData, isLoading, isError } = useCart();
  const totalPrice = cartData?.data?.totalCartPrice || 0;
  const numOfCartItems = cartData?.numOfCartItems || 0;
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
  });

  const onlinePaymentMutation = useMutation({
    mutationFn: async (shippingAddress) => {
      const response = await api.post(
        `/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
        {
          shippingAddress,
        },
      );

      return response.data;
    },

    onSuccess: (data) => {
      window.location.href = data.session.url;
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to create payment session",
      );
    },
  });
  const handleOnlinePayment = (formData) => {
    onlinePaymentMutation.mutate(formData);
  };
  const onSubmit = useCallback(
    async (data) => {
      if (!cartId) return;
      if (!cartData?.data?.products?.length) {
        toast.error("Your cart is empty");
        return;
      }
      try {
        await api.post(`/v2/orders/${cartId}`, { shippingAddress: data });
        toast.success("Order placed successfully");
        queryClient.setQueryData(["cart"], null);
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        reset();
        navigate("/allorders");
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
    [cartId, navigate, queryClient],
  );

  if (isLoading) {
    return (
      <div className="payment-loading">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading checkout...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="payment-error">
        <i className="fa-solid fa-triangle-exclamation"></i>
        <p>Failed to load cart data.</p>

        <button onClick={() => navigate("/cart")} className="back-to-cart-btn">
          Back to Cart
        </button>
      </div>
    );
  }
  return (
    <div className="payment-form-container">
      <div className="checkout-card">
        {/* أيقونة السلة العلوية */}
        <div className="cart-icon-container">
          <i className="fa-solid fa-bag-shopping cart-icon"></i>
        </div>

        <div className="checkout-header">
          <h2>Checkout</h2>
          <p className="subtitle">
            Complete your order by filling in the details below
          </p>
        </div>
        <fieldset disabled={isSubmitting}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* العنوان */}
            <div className="form-field">
              <label>Delivery Address</label>
              <div
                className={`input-group ${errors.address ? "error-field" : ""}`}
              >
                <i className="fa-solid fa-location-dot field-icon"></i>
                <input
                  type="text"
                  disabled={isSubmitting}
                  placeholder="Enter your full address"
                  {...register("address")}
                />
              </div>
              {errors.address && (
                <p className="error-message">
                  <i className="fa-solid fa-circle-exclamation"></i>{" "}
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* الهاتف */}
            <div className="form-field">
              <label>Phone Number</label>
              <div
                className={`input-group ${errors.phone ? "error-field" : ""}`}
              >
                <i className="fa-solid fa-phone field-icon"></i>
                <input
                  type="tel"
                  disabled={isSubmitting}
                  placeholder="01 XXX XXX XXX"
                  {...register("phone")}
                  maxLength={11}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
              </div>
              {errors.phone && (
                <p className="error-message">
                  <i className="fa-solid fa-circle-exclamation"></i>{" "}
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* المدينة والرمز البريدي */}
            <div className="row-fields">
              <div className="form-field">
                <label>City</label>
                <div
                  className={`input-group  ${errors.city ? "error-field" : ""}`}
                >
                  <i className="fa-solid fa-city field-icon"></i>
                  <input
                    type="text"
                    disabled={isSubmitting}
                    placeholder="e.g. Cairo"
                    {...register("city")}
                  />
                </div>
                {errors.city && (
                  <p className="error-message">
                    <i className="fa-solid fa-circle-exclamation"></i>{" "}
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className="form-field">
                <label>Postal Code</label>
                <div
                  className={`input-group  ${errors.postalCode ? "error-field" : ""}`}
                >
                  <i className="fa-solid fa-hashtag field-icon"></i>
                  <input
                    type="text"
                    placeholder="12345"
                    disabled={isSubmitting}
                    {...register("postalCode")}
                    maxLength={5}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                  />
                </div>
                {errors.postalCode && (
                  <p className="error-message">
                    <i className="fa-solid fa-circle-exclamation"></i>{" "}
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>

            {/* ملخص السعر */}
            <div className="price-summary">
              <div className="summary-row">
                <span>Items in Cart</span>
                <span>{numOfCartItems} Items</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total-row">
                <span className="total-price">Total Price</span>
                <span className="total-price">
                  {Number(totalPrice).toLocaleString()} EGP
                </span>
              </div>
            </div>
            <div className="payment-actions">
              {/* الزر */}
              <button
                type="submit"
                className="place-order-btn"
                disabled={!isValid || !isDirty || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>{" "}
                    Processing...
                  </>
                ) : (
                  <>
                    {" "}
                    <i className="fa-solid fa-lock"></i> Cash On Delivery{" "}
                  </>
                )}
              </button>
              <button
                type="button"
                className="online-payment-btn"
                disabled={
                  !isValid ||
                  !isDirty ||
                  isSubmitting ||
                  onlinePaymentMutation.isPending
                }
                onClick={handleSubmit(handleOnlinePayment)}
              >
                {onlinePaymentMutation.isPending ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    Redirecting...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-credit-card"></i>
                    Pay Online
                  </>
                )}
              </button>
            </div>
          </form>
        </fieldset>

        <div className="security-footer">
          <i className="fa-solid fa-shield-halved security-icon"></i>
          <span>Secured with 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
