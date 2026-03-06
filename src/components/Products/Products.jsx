import "./Products.css";
import HashLoader from "react-spinners/HashLoader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategorySlider from "../CategorySlider/CategorySlider";
import BrandSlider from "../BrandSlider/BrandSlider";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const getAllProducts = (page) =>
    axios.get("https://ecommerce.routemisr.com/api/v1/products", {
      params: {
        limit: 12,
        page,
      },
    });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allProducts", page],
    queryFn: () => getAllProducts(page),
    refetchOnMount: false,
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });
  console.log(data);

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
        <div className="main-content container ">
          <CategorySlider />
          <BrandSlider />
          <div>
            <div className="row row-cols-auto gap-4 justify-content-around product-group">
              {data?.data.data?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
          {data?.data?.data?.length == 0 && (
            <div className="d-flex justify-content-center align-items-center ">
              <h4 className="text-center my-5">No Products Found</h4>
            </div>
          )}
        </div>
      </div>

      <Pagination
        page={page}
        totalPages={data?.data?.metadata?.numberOfPages}
        setSearchParams={setSearchParams}
      />
    </div>
  );
}
