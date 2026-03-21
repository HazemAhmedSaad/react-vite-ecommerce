import React from "react";
import "./Cart.css"
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
  ];

  return (
    <div className="container my-5">

      <h2 className="text-center mb-5">Shopping Cart</h2>

      <div className="row">

        {/* LEFT */}
        <div className="col-lg-8">

          {/* TABLE (Desktop فقط) */}
          <div className="d-none d-md-block">
            <table className="table cart-table align-middle">
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
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img src={item.image} width="60" />
                        <div>
                          <h6 className="mb-0">{item.name}</h6>
                          <small>{item.weight}</small>
                        </div>
                      </div>
                    </td>

                    <td className="text-center">${item.price}</td>

                    <td className="text-center">
                      <div className="qty-box">
                        <button>-</button>
                        <span>{item.quantity}</span>
                        <button>+</button>
                      </div>
                    </td>

                    <td className="text-end">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="d-block d-md-none">

            {cartItems.map((item) => (
              <div key={item.id} className="mobile-cart-item mb-3">

                <div className="d-flex gap-3">
                  <img src={item.image} width="70" />

                  <div className="flex-grow-1">
                    <h6>{item.name}</h6>
                    <small>{item.weight}</small>

                    <div className="mt-2">
                      <strong>${item.price}</strong>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">

                  <div className="qty-box">
                    <button>-</button>
                    <span>{item.quantity}</span>
                    <button>+</button>
                  </div>

                  <div className="fw-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* RIGHT */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="summary-box p-4">
            <h5>Order Summary</h5>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Total</span>
              <span>$74.40</span>
            </div>
            <button className="btn btn-success w-100 mt-3">
              Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}