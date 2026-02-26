import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import "./CategorySlider.css";
import CategorySkeleton from "../Skeleton/CategorySkeleton";
import { useState, useEffect } from "react";

// It's better to keep the fetcher outside the component to avoid re-creation

function CategorySlider() {
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
  const getAllCategories = async () => {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories",
    );
    return data.data; // Flattening here makes the JSX cleaner
  };

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    refetchOnMount: false,
  });
  const slidesToShow = useSlidesToShow();

  const settings = {
    dots: false,

    infinite: true,

    slidesToShow: slidesToShow,

    slidesToScroll: 1,

    autoplay: true,

    speed: 4000,

    autoplaySpeed: 0,

    cssEase: "linear",

    arrows: false,
  };

  if (isLoading) return <CategorySkeleton />;
  if (isError)
    return <h3 className="text-danger">Error loading categories...</h3>;

  // Safeguard: Only render the slider if we have items
  if (!categories || categories.length === 0) return null;

  return (
    <div className="slider-container my-4">
      <h4 className="mb-3">Shop by Category</h4>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="px-2">
            <div className="category-item text-center">
              <div className="img-wrapper mb-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-100 category-img"
                  loading="lazy" // Performance boost
                />
              </div>
              <h6 className="category-title text-main">{category.name}</h6>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategorySlider;
