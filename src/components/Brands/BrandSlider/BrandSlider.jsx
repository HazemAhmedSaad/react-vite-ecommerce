import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import "./BrandSlider.css";
import { useState, useEffect } from "react";
import CategorySkeleton from "../../Caregories/CategorySkeleton/CategorySkeleton";
function BrandSlider() {
  function useSlidesToShow() {
    const getSlides = () => {
      const width = window.innerWidth;

      if (width < 768) return 2;
      if (width < 992) return 3;
      if (width < 1200) return 4;
      if (width < 1400) return 5;

      return 6;
    };

    const [slidesToShow, setSlidesToShow] = useState(getSlides());

    useEffect(() => {
      const handleResize = () => {
        setSlidesToShow(getSlides());
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return slidesToShow;
  }
  const getAllBrands = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
    refetchOnMount: false,
  });

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: useSlidesToShow(),
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    draggable: true,
    rtl: true,
  };

  if (isLoading) return <CategorySkeleton />;
  if (isError) return <h3>Error...</h3>;

  return (
    <div className="slider-container my-4">
      <Slider {...settings}>
        {data?.data.data.map((brand) => (
          <div key={brand._id} className="text-center px-2">
            <div className="brand-item">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-100 brand-img "
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BrandSlider;
