import React from "react";

export default function Cart() {

  const cartItems = [
    {
      id: 1,
      name: "Fresh Oranges",
      weight: "500 g",
      price: 11.75,
      quantity: 4,
      image: "https://i.imgur.com/UPrs1EW.png",
    },
    {
      id: 2,
      name: "Red Onion",
      weight: "500 g",
      price: 8,
      quantity: 2,
      image: "https://i.imgur.com/UPrs1EW.png",
    },
    {
      id: 3,
      name: "Fresh Yellow Lemon",
      weight: "1 Kg",
      price: 8,
      quantity: 1,
      image: "https://i.imgur.com/UPrs1EW.png",
    },
  ];

  return (
    <div className="container my-5">

      <h2 className="text-center mb-5">Shopping Cart</h2>

      <div className="row">

        {/* Cart Table */}
        <div className="col-lg-8">

          <table className="table align-middle cart-table">

            <thead>
              <tr>
                <th>Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>

            <tbody>

              {cartItems.map((item) => (

                <tr key={item.id}>

                  {/* Product */}
                  <td>
                    <div className="d-flex align-items-center gap-3">

                      <button className="btn-close"></button>

                      <img
                        src={item.image}
                        width="60"
                        className="rounded"
                      />

                      <div>
                        <h6 className="mb-0">{item.name}</h6>
                        <small>{item.weight}</small>
                      </div>

                    </div>
                  </td>

                  {/* Price */}
                  <td className="text-center">
                    ${item.price}
                  </td>

                  {/* Quantity */}
                  <td className="text-center">

                    <div className="qty-box">

                      <button>-</button>
                      <span>{item.quantity}</span>
                      <button>+</button>

                    </div>

                  </td>

                  {/* Subtotal */}
                  <td className="text-end">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {/* Coupon */}
          <div className="d-flex gap-3 mt-4">

            <input
              className="form-control"
              placeholder="Coupon Code"
            />

            <button className="btn btn-success">
              Apply Coupon
            </button>

            <button className="btn btn-link text-success">
              Clear Shopping Cart
            </button>

          </div>

        </div>


        {/* Order Summary */}
        <div className="col-lg-4">

          <div className="summary-box p-4">

            <h5 className="mb-4">Order Summary</h5>

            <div className="d-flex justify-content-between mb-2">
              <span>Items</span>
              <span>9</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Sub Total</span>
              <span>$85.40</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Taxes</span>
              <span>$0.00</span>
            </div>

            <div className="d-flex justify-content-between text-danger mb-3">
              <span>Coupon Discount</span>
              <span>-$10.00</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold mb-4">
              <span>Total</span>
              <span>$74.40</span>
            </div>

            <button className="btn btn-success w-100">
              Proceed to Checkout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}