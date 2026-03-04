import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { useState, useEffect } from "react";
import "./ProductDetails.css";
import ProductDetailsSkeleton from "../Skeleton/ProductDetailsSkeleton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

export default function ProductDetails() {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = useState(null);
  const [timeLeft, setTimeLeft] = useState(() => 2 * 60 * 60);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${hours}h ${minutes}m ${seconds}s`;
  const getProductDetails = () =>
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);

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
  console.log(product);
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
            <Swiper
              navigation
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
              onSwiper={setMainSwiper}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
              className="rounded"
            >
              {product?.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="main-image-container">
                    <img
                      src={img}
                      className="main-image"
                      onMouseMove={(e) => {
                        const { left, top, width, height } =
                          e.target.getBoundingClientRect();
                        const x = ((e.clientX - left) / width) * 100;
                        const y = ((e.clientY - top) / height) * 100;
                        e.target.style.transformOrigin = `${x}% ${y}%`;
                      }}
                      onMouseEnter={(e) =>
                        e.currentTarget.classList.add("zoomed")
                      }
                      onMouseLeave={(e) =>
                        e.currentTarget.classList.remove("zoomed")
                      }
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              slidesPerView={"auto"}
              spaceBetween={10}
              centeredSlides={true}
              watchSlidesProgress={true}
              className="mt-3 py-2 "
            >
              {product?.images?.map((img, index) => (
                <SwiperSlide key={index} style={{ width: "80px" }}>
                  <img
                    src={img}
                    onClick={() => {
                      setActiveIndex(index);
                      mainSwiper?.slideTo(index);
                    }}
                    className={`w-100 rounded thumb-img ${
                      activeIndex === index ? "active-thumb" : ""
                    }`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="col-md-7 col-lg-8">
            <div className="badges-info my-3 d-flex gap-2">
              <span className="badge bg-success">
                {product?.category?.name}
              </span>
              <span className="badge bg-warning">
                {product?.subcategory?.[0]?.name}
              </span>
              <span className="badge bg-danger">{product?.brand?.name}</span>
            </div>
            <h3 className="product-details-title">{product?.title}</h3>
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
                    -
                    {Math.round(
                      ((product.price - product.priceAfterDiscount) /
                        product.price) *
                        100,
                    )}
                    %
                  </span>
                </>
              ) : (
                <h4 className="new-price">{product?.price} EGP</h4>
              )}
            </div>
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
            </div>

            <div className="order-time my-3">
              <i className="fa-solid fa-truck-fast me-1"></i>
              <span>Order within </span>
              <span className="fw-bold highlight-time">{formattedTime}</span>
              <span> to get </span>
              <span className="fw-bold highlight-delivery">Tomorrow</span>
            </div>
            <div className="product-details d-flex align-items-center gap-3 mt-3">
              <button className="btn-product-details flex-grow-1 rounded-pill">
                <i className="fa-solid fa-cart-arrow-down me-2"></i>
                Add To Cart
              </button>

              <button className="wishlist-btn" onClick={() => setLiked(!liked)}>
                <i
                  className={
                    liked
                      ? "fa-solid fa-heart text-danger-icon"
                      : "fa-regular fa-heart"
                  }
                ></i>
              </button>
            </div>
            <div className="mt-4 ">
              <Accordion defaultExpanded className="product-description">
                <AccordionSummary
                  expandIcon={<i class="fa-solid fa-chevron-up"></i>}
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
        </div>
      )}
    </div>
  );
}
