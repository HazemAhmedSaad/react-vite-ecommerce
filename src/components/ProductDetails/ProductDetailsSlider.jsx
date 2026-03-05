import { useEffect, useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function ProductDetailsSlider( { product } ) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
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
                className={`main-image ${isZoomed ? "zoomed" : ""}`}
                onMouseMove={(e) => {
                  if (!isMobile) {
                    const { left, top, width, height } =
                      e.currentTarget.getBoundingClientRect();

                    const x = ((e.clientX - left) / width) * 100;
                    const y = ((e.clientY - top) / height) * 100;

                    e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
                  }
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) e.currentTarget.classList.add("zoomed");
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) e.currentTarget.classList.remove("zoomed");
                }}
                onClick={(e) => {
                  if (!isMobile) return;

                  const { left, top, width, height } =
                    e.currentTarget.getBoundingClientRect();

                  const x = ((e.clientX - left) / width) * 100;
                  const y = ((e.clientY - top) / height) * 100;

                  e.currentTarget.style.transformOrigin = `${x}% ${y}%`;

                  setIsZoomed((prev) => !prev);
                }}
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
  );
}

export default ProductDetailsSlider;
