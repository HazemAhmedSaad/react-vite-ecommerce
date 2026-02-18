import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import "./BrandSlider.css";
import CategorySkeleton from "../../Caregories/CategorySkeleton/CategorySkeleton";
function BrandSlider() {
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
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    draggable: true,
    rtl: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 992, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
    ],
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
