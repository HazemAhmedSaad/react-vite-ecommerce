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
    if (!cartId) return;
    try {
      await api.post(`/v2/orders/${cartId}`, { shippingAddress: data });
      toast.success("Order placed successfully ✅");
      queryClient.setQueryData({ queryKey: ["cart"] }, null);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      reset();
      navigate("/cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

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
            <div className={`input-group ${errors.phone ? "error-field" : ""}`}>
              <i className="fa-solid fa-phone field-icon"></i>
              <input
                type="tel"
                placeholder="01 XXX XXX XXX"
                {...register("phone")}
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
                className={`input-group ${errors.city ? "error-field" : ""}`}
              >
                <i className="fa-solid fa-city field-icon"></i>
                <input
                  type="text"
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
                  {...register("postalCode")}
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
              <span>Subtotal</span>
              <span>EGP 1,250.00</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>EGP 50.00</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span className="total-price">EGP 1,300.00</span>
            </div>
          </div>

          {/* الزر */}
          <button
            type="submit"
            className="place-order-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Processing..."
            ) : (
              <>
                <i className="fa-solid fa-lock"></i> Place Order
              </>
            )}
          </button>
        </form>

        <div className="security-footer">
          <i className="fa-solid fa-shield-halved security-icon"></i>
          <span>Secured with 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
