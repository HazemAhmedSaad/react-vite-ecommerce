import "./Products.css";
import HashLoader from "react-spinners/HashLoader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";
import CategorySlider from "../CategorySlider/CategorySlider";
import BrandSlider from "../BrandSlider/BrandSlider";
import SidebarChickbooks from "../Sidebar/Sidebar";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const subcategory = searchParams.get("subcategory");
  const priceGte = Number(searchParams.get("price[gte]") || 0);
  const priceLte = Number(searchParams.get("price[lte]") || 30000);
  const sort = searchParams.get("sort");

  const getProducts = async () => {
    const res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products",
      {
        params: {
          limit: 12,
          page,
          ...(category && { category }),
          ...(brand && { brand }),
          ...(subcategory && { subcategory }),
          ...(priceGte && { "price[gte]": priceGte }),
          ...(priceLte && { "price[lte]": priceLte }),
          ...(sort && { sort }),
        },
      },
    );

    return res.data || { data: [], metadata: { numberOfPages: 1 } };
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "products",
      page,
      category,
      brand,
      subcategory,
      priceGte,
      priceLte,
      sort,
    ],
    queryFn: getProducts,
    keepPreviousData: true,
  });

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", newPage);
      return params;
    });
  };

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
          Error fetching data. Refresh the page.
        </p>
        <button
          className="btn btn-warning"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  const products = data?.data || [];
  const totalPages = data?.metadata?.numberOfPages || 1;

  return (
    <div className="products-wrapper container">
      <SidebarChickbooks />

      <div className="products-content">
        <div className="main-content container">
          <CategorySlider />
          <BrandSlider />
          <div className="row row-cols-auto gap-4 justify-content-around product-group">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="d-flex justify-content-center align-items-center w-100 my-5">
                <h4>No Products Found</h4>
              </div>
            )}
          </div>
        </div>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
