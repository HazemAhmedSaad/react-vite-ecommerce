import { useState } from "react";
import "./Products.css";
import HashLoader from "react-spinners/HashLoader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategorySlider from "../CategorySlider/CategorySlider";
import BrandSlider from "../Brands/BrandSlider/BrandSlider";
import { Link } from "react-router-dom";
export default function Products() {
  const [open, setOpen] = useState(false);
  const getAllProducts = () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/products");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
    refetchOnMount: false,
  });

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
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
        <p className="text-center mb-3">
          Error fetching data. Please refresh the page to try again.
        </p>
        <button
          className="btn btn-warning"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="products-wrapper">
      <div className="products-content">
        {/* Sidebar */}
        <aside className={`sidebar ${open ? "open" : ""} `}>
          {open && (
            <div className="sidebar-inner ">
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
        </aside>

        {/* Main Content */}
        <div className="main-content container flex-grow-1">
          <CategorySlider />
          <BrandSlider />
          <div>
            {!open && (
              <span variant="" onClick={handleToggle} className="toggle-btn ">
                <i className="fa-solid fa-angles-right"></i>
              </span>
            )}
            <div className="row row-cols-auto gap-4 justify-content-around product-group">
              {data?.data.data?.map((product) => (
                <div className="product-card col" key={product._id}>
                  <Link to={`/product/${product._id}`} key={product._id}>
                    <div className="product-image-wrapper position-relative">
                      <img src={product.imageCover} alt={product.title} />
                      <div className="img-overlay">
                        <span className="overlay-text">View</span>
                      </div>
                    </div>
                  </Link>

                  <div className="product-info d-flex justify-content-between align-items-center">
                    <Link to={`/product/${product._id}`} key={product._id}>
                      <h6 className="product-title">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h6>
                    </Link>
                    <div className="text-warning small">
                      <i className="fa-solid fa-star"></i>{" "}
                      {product.ratingsAverage}
                    </div>
                  </div>

                  <p className="product-category small mb-1">
                    {product.category?.name}
                  </p>

                  <div className="product-content d-flex justify-content-between">
                    <button className="">Add To Cart</button>

                    <p className="product-price">{product.price} EGP</p>
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
