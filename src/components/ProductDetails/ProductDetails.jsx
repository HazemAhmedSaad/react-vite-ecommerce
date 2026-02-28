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
import { Pagination } from "swiper/modules";

export default function ProductDetails() {
  const { id } = useParams();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getProductDetails = () =>
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);

  const { data, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
  });

  const product = data?.data?.data;
  console.log(product);

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
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(2)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              slidesPerView={4}
              spaceBetween={10}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mt-3 py-2 "
            >
              {product?.images?.map((img, index) => (
                <SwiperSlide key={index}>
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
                {product?.subcategory?.[0].name}
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
                      <i className="fa-solid fa-star-half-stroke fa-"></i>
                    </span>
                  );
                } else {
                  return (
                    <span key={index} >
                      <i className="fa-regular fa-star fa-sm"></i>
                    </span>
                  );
                }
              })}
              <span className="rating-count">
                ({product?.ratingsAverage} from {product?.ratingsQuantity}{" "}
                reviews)
              </span>
            </div>
            <h4 className="text-success">{product?.price} EGP</h4>
            <button className="btn btn-dark w-100 mt-3">Add To Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}
