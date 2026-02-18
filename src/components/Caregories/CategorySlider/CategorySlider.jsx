import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import "./CategorySlider.css";
import CategorySkeleton from "../CategorySkeleton/CategorySkeleton";

// It's better to keep the fetcher outside the component to avoid re-creation
const getAllCategories = async () => {
  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/categories",
  );
  return data.data; // Flattening here makes the JSX cleaner
};

function CategorySlider() {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    refetchOnMount: false,
  });

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 992, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
    ],
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
