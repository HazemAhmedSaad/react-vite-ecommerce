import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState, useMemo, useContext } from "react";
import "./ProductDetails.css";
import ProductDetailsSkeleton from "../Skeleton/ProductDetailsSkeleton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ProductDetailsSlider from "./ProductDetailsSlider";
import OrderCountDown from "./OrderCountDown";
import ReviewsSlider from "./Review/ReviewList";
import api from "../Utils/api";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import PulseLoader from "react-spinners/PulseLoader";

export default function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const [selectedSize, setSelectedSize] = useState(null);
  const [liked, setLiked] = useState(false);
  const { addToCart } = useContext(cartContext);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const getProductDetails = () => api.get(`/products/${id}`);

  async function addProductToCart(productId) {
    try {
      toast.loading("Adding to cart...", { id: "addToCart" });

      setLoadingProduct(true);

      const res = await addToCart(productId);

      if (res.status === "success") {
        toast.success(res?.message, {
          id: "addToCart",
          style: {
            background: "#16a34a",
            color: "#fff",
          },
          icon: <i className="fa-solid fa-cart-arrow-down text-white"></i>,
        });
      } else {
        toast.error(res?.message, { id: "addToCart" });
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong", {
        id: "addToCart",
        style: {
          background: "#f87171",
          color: "#fff",
        },
        icon: <i className="fa-solid fa-triangle-exclamation text-white"></i>,
      });
    } finally {
      setLoadingProduct(false);
    }
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
    refetchOnMount: false,
    retry: 3,
    retryDelay: 1000,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const product = data?.data?.data;
  const isClothing =
    product?.category?.name === "Men's Fashion" ||
    product?.category?.name === "Women's Fashion";
  console.log(product);
  const discount = useMemo(() => {
    if (!product?.priceAfterDiscount) return 0;

    return Math.round(
      ((product.price - product.priceAfterDiscount) / product.price) * 100,
    );
  }, [product]);
  if (isError) {
    return (
      <div className="text-center py-5 min-vh-100 d-flex flex-column justify-content-center">
        <h4>Something went wrong 😢</h4>
        <p>Please try again later.</p>
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
    <div className="container py-5 mt-5 min-vh-100">
      {isLoading ? (
        <ProductDetailsSkeleton />
      ) : (
        <div className="row g-5">
          <div className="col-md-5 col-lg-4">
            <ProductDetailsSlider product={product} />
          </div>

          <div className="col-md-7 col-lg-8">
            {/* Badges */}
            <div className="badges-info my-3 d-flex gap-2">
              <span className="badge bg-success">
                {product?.category?.name}
              </span>
              <span className="badge bg-warning">
                {product?.subcategory?.[0]?.name}
              </span>
              <span className="badge bg-danger">{product?.brand?.name}</span>
            </div>
            {/* Product Title */}
            <h3 className="product-details-title">{product?.title}</h3>
            {/* Product Rating */}
            <div className="product-rating d-flex align-items-center gap-2 my-2">
              {Array.from({ length: 5 }, (_, index) => {
                const rating = product?.ratingsAverage || 0;
                if (rating >= index + 1) {
                  return (
                    <span key={index}>
                      <i className="fa-solid fa-star fa-sm"></i>
                    </span>
                  );
                } else if (rating >= index + 0.5) {
                  return (
                    <span key={index}>
                      <i className="fa-solid fa-star-half-stroke fa-sm "></i>
                    </span>
                  );
                } else {
                  return (
                    <span key={index}>
                      <i className="fa-regular fa-star fa-sm"></i>
                    </span>
                  );
                }
              })}
              <span className="rating-count">
                ({product?.ratingsAverage?.toFixed(1)} / 5 -{" "}
                {product?.ratingsQuantity} Reviews)
              </span>
            </div>
            {/* Product Price */}
            <div className="price-box">
              {product?.priceAfterDiscount ? (
                <>
                  <h4 className="new-price">
                    {product.priceAfterDiscount} EGP
                  </h4>
                  <span className="old-price text-decoration-line-through">
                    {product.price} EGP
                  </span>

                  <span className="discount-badge rounded-pill">
                    -{discount}%
                  </span>
                </>
              ) : (
                <h4 className="new-price">{product?.price} EGP</h4>
              )}
            </div>
            {/* Product Stock */}
            <div className="product-stock-sold d-flex align-items-center gap-4 my-2">
              <span
                className={`stock-status stock ${product?.quantity < 10 ? "low" : ""}`}
              >
                <i className="fa-solid fa-box-open me-1"></i>
                {product?.quantity > 0 ? (
                  <>
                    In Stock: <strong>{product.quantity}</strong>
                  </>
                ) : (
                  "Out of Stock"
                )}
              </span>

              <span className="sold">
                <i className="fa-solid fa-fire me-1"></i>
                Sold:{" "}
                <strong>
                  {product?.sold
                    ? product.sold > 10000
                      ? "10k+"
                      : product.sold.toLocaleString()
                    : 0}
                </strong>
              </span>
            </div>

            {/* Product Quantity */}
            <div className="d-flex gap-lg-5 flex-column flex-lg-row ">
              <div className="quantity-wrapper">
                <span className="qty-label">Quantity</span>

                <div className="quantity-box">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                  >
                    −
                  </button>

                  <span className="qty-number">{quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() =>
                      setQuantity((prev) => (prev < 15 ? prev + 1 : prev))
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              {isClothing ? (
                <div className="size-selector">
                  <span className="size-label">Select Size:</span>

                  <div className="size-options">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        className={`size-btn rounded-pill  ${selectedSize === size ? "active" : ""}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            {/* Add To Cart */}
            <div className="product-details d-flex align-items-center gap-3 mt-3">
              <button
                disabled={loadingProduct}
                onClick={() => addProductToCart(product?._id)}
                className="btn-product-details flex-grow-1 rounded-pill"
              >
                {loadingProduct ? (
                  <div className="">
                    <PulseLoader color="#fff" size={10} />
                  </div>
                ) : (
                  <>
                    <i className="fa-solid fa-cart-arrow-down me-2"></i>
                    Add To Cart
                  </>
                )}
              </button>

              <button
                className="wishlist-btn"
                onClick={() => setLiked((prev) => !prev)}
              >
                <i
                  className={
                    liked
                      ? "fa-solid fa-heart text-danger-icon"
                      : "fa-regular fa-heart"
                  }
                ></i>
              </button>
            </div>
            <OrderCountDown />

            {/* Product Description */}
            <div className="mt-4 ">
              <Accordion defaultExpanded className="product-description">
                <AccordionSummary
                  expandIcon={<i className="fa-solid fa-chevron-down"></i>}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span" className="fw-bold">
                    <i className="fa-solid fa-circle-info"></i> Description
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{product?.description}</Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <ReviewsSlider reviews={product?.reviews} />
        </div>
      )}
    </div>
  );
}
