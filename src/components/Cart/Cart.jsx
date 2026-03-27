import "./Cart.css";
import HashLoader from "react-spinners/HashLoader";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Link } from "react-router-dom";
import { useRemoveCartItem } from "./../../hooks/useRemoveCartItem";
import { useUpdateCartItem } from "../../hooks/useUpdateCartItem";
import { useCart } from "../../hooks/useGetCart";
import { useClearCart } from "./../../hooks/useClearCart";
import Swal from "sweetalert2";
import { useMutationState } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";


export default function Cart() {
  const [inputValues, setInputValues] = useState({});
  const { data: cartData, isLoading, isError } = useCart();
  const commitChange = (id, originalCount) => {
    let value = Number(inputValues[id]);

    if (!value || value < 1) value = 1;
    if (value > 10) value = 10;

    // ✅ رجّع القيمة المصححة للـ input
    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    // ✅ لو نفس القيمة → متعملش request
    if (value === originalCount) return;

    handleUpdateCount(id, value);
  };
  // ✅ Remove
  const { mutate: removeItem } = useRemoveCartItem();
  const removingItems = useMutationState({
    filters: { mutationKey: ["removeCartItem"], status: "pending" },
    select: (mutation) => mutation.state.variables,
  });
  // ✅ Update
  const { mutate: updateItem } = useUpdateCartItem();
  const updatingItems = useMutationState({
    filters: { mutationKey: ["updateCartItem"], status: "pending" },
    select: (mutation) => mutation.state.variables,
  });
  // ✅ Clear
  const { mutate: clearAll, isPending: isClearing } = useClearCart();
  const items = cartData?.data?.products || [];
  const totalPrice = cartData?.data?.totalCartPrice || 0;
  const cartId = cartData?.data?._id || "";
  const numOfCartItems = cartData?.numOfCartItems || 0;
  useEffect(() => {
    const initialValues = {};
    items.forEach((item) => {
      initialValues[item.product._id] = item.count;
    });
    setInputValues(initialValues);
  }, [items]);
  const handleUpdateCount = (productId, count) => {
    if (count < 1) return;
    updateItem({ productId, count });
  };
  const handleRemoveItem = (productId) => {
    removeItem(productId);
  };

  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove all items from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        clearAll();

        Swal.fire({
          title: "Cleared!",
          text: "Your cart has been emptied.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };
  const updatingSet = new Set(updatingItems.map((i) => i?.productId));
  const removingSet = new Set(removingItems);
  if (isLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <HashLoader color="#f3a909" size={80} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <h3>Oops! Something went wrong.</h3>
        <button
          className="btn btn-warning mt-3"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5 pt-5 min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-main-custom">Shopping Cart</h2>

        {numOfCartItems > 0 && (
          <button
            className=" btn-danger-custom  rounded-pill px-3"
            onClick={handleClearCart}
            disabled={isClearing}
          >
            {isClearing ? (
              "Clearing..."
            ) : (
              <>
                <i className="fa-solid fa-trash-can me-2"></i>
                Clear Cart
              </>
            )}
          </button>
        )}
      </div>

      {numOfCartItems === 0 ? (
        <div className="empty-cart text-center py-5 shadow-sm rounded bg-box border-custom">
          <i className="fa-solid fa-cart-plus display-1 text-muted-custom mb-4"></i>
          <h3 className="fw-bold">Your cart is empty!</h3>
          <p className="text-muted-custom">
            Browse our products and discover great deals.
          </p>
          <Link
            title="Go to products"
            to="/products"
            className="btn btn-main rounded-pill px-4 py-2 mt-3"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {/* LEFT */}
          <div className="col-lg-8">
            <div className="shadow-sm rounded overflow-hidden border-custom">
              {/* Desktop */}
              <div className="table-responsive d-none d-md-block">
                <table className="table align-middle m-0">
                  <thead className="bg-box">
                    <tr>
                      <th className="ps-4">Product</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center pe-4">Subtotal</th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((item) => {
                      const isUpdatingThis = updatingSet.has(item.product._id);
                      const isRemovingThis = removingSet.has(item.product._id);

                      return (
                        <tr
                          key={item._id}
                          className={`cart-item ${isRemovingThis ? "removing" : ""}`}
                        >
                          <td className="ps-4 py-3">
                            <div className="d-flex img-cart-item align-items-center gap-3">
                              <img
                                src={item.product.imageCover}
                                alt={item.product.title}
                                className="rounded border-custom"
                              />

                              <div>
                                <h6
                                  className="mb-1 text-truncate fw-bold"
                                  style={{ maxWidth: "180px" }}
                                >
                                  {item.product.title
                                    .split(/[\s-]+/)
                                    .slice(0, 2)
                                    .join(" ")}
                                </h6>

                                <p className="text-muted-custom small mb-1">
                                  {item.product.category.name}
                                </p>
                                <button
                                  className="remove-btn"
                                  onClick={() =>
                                    handleRemoveItem(item.product._id)
                                  }
                                  disabled={isRemovingThis}
                                >
                                  {isRemovingThis ? (
                                    <span className="d-flex align-items-center gap-2">
                                      Removing...
                                    </span>
                                  ) : (
                                    <>
                                      <i className="fa-solid fa-trash-can"></i>
                                      <span className="ms-1">Remove</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </td>

                          <td className="text-center">{item.price} EGP</td>

                          <td className="text-center">
                            <div className="qty-box mx-auto d-flex align-items-center justify-content-center gap-2">
                              <button
                                onClick={() =>
                                  handleUpdateCount(
                                    item.product._id,
                                    item.count - 1,
                                  )
                                }
                                disabled={item.count <= 1 || isUpdatingThis}
                              >
                                -
                              </button>

                              {isUpdatingThis ? (
                                <div
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Grid
                                    visible={true}
                                    height="25"
                                    width="25"
                                    color="#418aff"
                                    ariaLabel="grid-loading"
                                    radius="12.5"
                                    wrapperStyle={{
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                    wrapperClass="grid-wrapper"
                                  />
                                </div>
                              ) : (
                                <input
                                  type="number"
                                  className="text-center"
                                  value={
                                    inputValues[item.product._id] ?? item.count
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value.replace(
                                      /\D/g,
                                      "",
                                    );

                                    setInputValues((prev) => ({
                                      ...prev,
                                      [item.product._id]: value,
                                    }));
                                  }}
                                  onBlur={() =>
                                    commitChange(item.product._id, item.count)
                                  }
                                  onKeyDown={(e) => {
                                    if (["e", "E", "+", "-"].includes(e.key)) {
                                      e.preventDefault();
                                    }

                                    if (e.key === "Enter") {
                                      commitChange(
                                        item.product._id,
                                        item.count,
                                      );
                                      e.target.blur();
                                    }
                                  }}
                                />
                              )}

                              <button
                                onClick={() =>
                                  handleUpdateCount(
                                    item.product._id,
                                    item.count + 1,
                                  )
                                }
                                disabled={item.count >= 10 || isUpdatingThis}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="text-center">
                            {(item.price * item.count).toLocaleString()} EGP
                            {isRemovingThis && (
                              <div className="item-overlay">
                                <PropagateLoader
                                  style={{ transform: "translateY(-10px)" }}
                                  color="#ff4d4f"
                                  size={20}
                                />
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="d-block d-md-none p-3">
                {items.map((item) => {
                  const isUpdatingThis = updatingSet.has(item.product._id);
                  const isRemovingThis = removingSet.has(item.product._id);
                  return (
                    <div
                      key={item._id}
                      className={`mobile-cart-item img-cart-item p-3 border-custom rounded mb-3 bg-box ${
                        isRemovingThis ? "removing" : ""
                      }`}
                    >
                      <div className="d-flex gap-3">
                        <img
                          src={item.product.imageCover}
                          className="rounded border-custom"
                        />

                        <div className="flex-grow-1">
                          <h6 className="fw-bold mb-1">
                            {item.product.title
                              .split(/[\s-]+/)
                              .slice(0, 2)
                              .join(" ")}
                          </h6>
                          <p className="text-muted-custom small mb-1">
                            {item.product.category.name}
                          </p>
                          <p className="text-muted-custom small mb-2">
                            {item.price} EGP
                          </p>

                          <div className="d-flex justify-content-between align-items-center">
                            <div className="qty-box d-flex align-items-center gap-2">
                              <button
                                onClick={() =>
                                  handleUpdateCount(
                                    item.product._id,
                                    item.count - 1,
                                  )
                                }
                                disabled={item.count <= 1 || isUpdatingThis}
                              >
                                -
                              </button>

                              {isUpdatingThis ? (
                                <div
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Grid
                                    visible={true}
                                    height="20"
                                    width="20"
                                    color="#418aff"
                                    ariaLabel="grid-loading"
                                    radius="12.5"
                                    wrapperStyle={{
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                    wrapperClass="grid-wrapper"
                                  />
                                </div>
                              ) : (
                                <input
                                  type="number"
                                  className="text-center"
                                  value={
                                    inputValues[item.product._id] ?? item.count
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value.replace(
                                      /\D/g,
                                      "",
                                    );

                                    setInputValues((prev) => ({
                                      ...prev,
                                      [item.product._id]: value,
                                    }));
                                  }}
                                  onBlur={() =>
                                    commitChange(item.product._id, item.count)
                                  }
                                  onKeyDown={(e) => {
                                    if (["e", "E", "+", "-"].includes(e.key)) {
                                      e.preventDefault();
                                    }

                                    if (e.key === "Enter") {
                                      commitChange(
                                        item.product._id,
                                        item.count,
                                      );
                                      e.target.blur();
                                    }
                                  }}
                                />
                              )}

                              <button
                                onClick={() =>
                                  handleUpdateCount(
                                    item.product._id,
                                    item.count + 1,
                                  )
                                }
                                disabled={item.count >= 10 || isUpdatingThis}
                              >
                                +
                              </button>
                            </div>

                            <button
                              className="btn btn-link text-danger-custom p-0 small text-decoration-none"
                              onClick={() => handleRemoveItem(item.product._id)}
                              disabled={isRemovingThis}
                            >
                              {isRemovingThis ? (
                                <span>Removing...</span>
                              ) : (
                                <i className="fa-solid fa-trash-can"></i>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      {isRemovingThis && (
                        <div className="item-overlay">
                          <PropagateLoader color="#ff4d4f" size={15} />{" "}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-lg-4">
            <div className="summary-box p-4 shadow-sm bg-box rounded border-custom ">
              <h5 className="fw-bold mb-4 border-custom-bottom pb-2">
                Order Summary
              </h5>

              <div className="d-flex justify-content-between mb-3">
                <span>Items in Cart</span>
                <span>{numOfCartItems}</span>
              </div>

              <div className="d-flex justify-content-between mb-3 ">
                <span>Shipping</span>
                <span className=" fw-bold">Free</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
                <span>Total Amount</span>
                <span className="text-second">
                  {totalPrice.toLocaleString()} EGP
                </span>
              </div>

              <Link
                to={`/checkout/${cartId}`}
                className="btn  btn-main w-100 py-3 fw-bold rounded-pill shadow-sm"
              >
                Proceed to Checkout
                <i className="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
