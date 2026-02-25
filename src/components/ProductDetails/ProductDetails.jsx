import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [zoom, setZoom] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const getProductDetails = () =>
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);

  const { data, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
  });

  const product = data?.data?.data;

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4">
          {/* Main Image */}
          <Swiper
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              setZoom(false);
            }}
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="main-image-container">
                  <img
                    src={img}
                    className={`main-image ${zoom ? "zoomed" : ""}`}
                    onClick={() => setZoom(!zoom)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails */}

          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={4}
            spaceBetween={10}
            modules={[Thumbs]}
            className="mt-3"
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  onClick={() => setActiveIndex(index)}
                  className={`w-100 border rounded thumb-img ${
                    activeIndex === index ? "active-thumb" : ""
                  }`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Info */}

        <div className="col-md-8">
          <h3>{product.title}</h3>

          <h4 className="text-success">{product.price} EGP</h4>

          <button className="btn btn-dark w-100">Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
