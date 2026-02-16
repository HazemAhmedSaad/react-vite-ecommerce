import { useState } from "react";
import { ListGroup, Container } from "react-bootstrap";
import "./Products.css";
import product from "../../assets/images/product.jpg";
import HashLoader from "./../../../node_modules/react-spinners/esm/HashLoader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function Products() {
  const [open, setOpen] = useState(false);
  const getAllProducts = () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/products");

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  console.log(data?.data.data);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <HashLoader color="#f3a909" size={75} />
      </div>
    );
  }

  if (isError) {
    return <p>Error loading products</p>;
  }

  return (
    <div className="products-wrapper">
      <div className="products-content">
        {/* Sidebar */}
        <div className={`  sidebar ${open ? "open" : ""}`}>
          <div className="">
            {open && (
              <div className="sidebar-inner">
                <span
                  variant="light"
                  onClick={handleToggle}
                  className="mb-3 tog-close-btn "
                >
                  <i className="fa-solid fa-angles-left"></i>
                </span>
                <h2>heloooooo</h2>
                <hr />
                <ul>
                  <li>fffffffffffffff</li>
                  <li>fffffffffffffff</li>
                  <li>fffffffffffffff</li>
                  <li>fffffffffffffffffffffffffffffffffffffff</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content container">
          <div>
            {!open && (
              <span variant="" onClick={handleToggle} className="toggle-btn ">
                <i className="fa-solid fa-angles-right"></i>
              </span>
            )}
            <div className="row row-cols-auto gap-4 justify-content-around">
              {data?.data.data?.map((product) => (
                <div className="product-card col" key={product._id}>
                  <div>
                    <img src={product.imageCover} alt={product.title} />
                  </div>

                  <div className="product-info d-flex justify-content-between align-items-center">
                    <p className="product-title">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </p>
                    <div className="d-flex align-items-center gap-1">
                      <i className="fa-solid fa-star "></i>{" "}
                      <div className="product-rating">
                        {product.ratingsAverage}
                      </div>
                    </div>
                  </div>

                  <div className="product-category">
                    <p>{product.category?.name}</p>
                  </div>

                  <div className="brand">
                    <p>{product.brand?.name}</p>
                  </div>

                  <div className="product-content d-flex justify-content-between align-items-center">
                    <button className="btn btn-primary">Add To Cart</button>

                    <p className="product-price">{product.price}$</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
