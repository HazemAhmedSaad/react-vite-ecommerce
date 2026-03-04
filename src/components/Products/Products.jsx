import { useState } from "react";
import "./Products.css";
import HashLoader from "react-spinners/HashLoader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategorySlider from "../CategorySlider/CategorySlider";
import BrandSlider from "../BrandSlider/BrandSlider";
import { Link } from "react-router-dom";
export default function Products() {
  const getAllProducts = () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/products");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
    refetchOnMount: false,
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });

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
        <div>
          <button
            className="btn btn-warning w-auto"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-wrapper">
      <div className="products-content">
        <div className="main-content container flex-grow-1">
          <CategorySlider />
          <BrandSlider />
          <div>
            <div className="row row-cols-auto gap-4 justify-content-around product-group">
              {data?.data.data?.map((product) => (
                <div className="product-card col" key={product._id}>
                  <Link to={`/product/${product._id}`}>
                    <div className="product-image-wrapper position-relative">
                      <img src={product.imageCover} alt={product.title} />

                      <div className="img-overlay">
                        <span className="overlay-text">View</span>
                      </div>
                    </div>
                  </Link>

                  <div className="product-info mb-1 d-flex justify-content-between align-items-center">
                    <Link to={`/product/${product._id}`}>
                      <h6 className="product-title">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h6>
                    </Link>
                    <div className="text-warning ">
                      <i className="fa-solid fa-star"></i>
                      {product.ratingsAverage}
                    </div>
                  </div>
                  <div className="product-info d-flex justify-content-between align-items-center">
                    <p className="product-category mb-1">
                      {product.category?.name}
                    </p>
                    {product.priceAfterDiscount && (
                      <span className="discount-badge rounded-pill m-0 discount-badge-card ">
                        -
                        {Math.round(
                          ((product.price - product.priceAfterDiscount) /
                            product.price) *
                            100,
                        )}
                        %
                      </span>
                    )}
                  </div>

                  <div className="product-content d-flex justify-content-between">
                    <button>
                      <i className="fa-solid fa-cart-arrow-down"></i> Add
                    </button>
                    <div className="d-flex align-items-center gap-1 product-price-info">
                      <p className="product-price">{product.price} EGP</p>
                      {product.priceAfterDiscount && (
                        <p className="old-price-text old-price">
                          {" "}
                          {product.priceAfterDiscount}
                        </p>
                      )}
                    </div>
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
