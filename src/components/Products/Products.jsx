import "./Products.css";
import HashLoader from "react-spinners/HashLoader";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";
import CategorySlider from "../CategorySlider/CategorySlider";
import BrandSlider from "../BrandSlider/BrandSlider";
import SidebarChickbooks from "../Sidebar/Sidebar";
import api from "../Utils/api";
import { useContext, useState } from "react";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function Products() {
  const { addToCart } = useContext(cartContext);
  const [loadingProduct, setLoadingProduct] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const subcategory = searchParams.get("subcategory");
  const priceGte = Number(searchParams.get("price[gte]") || 0);
  const priceLte = Number(searchParams.get("price[lte]") || 30000);
  const sort = searchParams.get("sort");
  const priceAfterDiscount =
    Number(searchParams.get("priceAfterDiscount[gte]")) || 0;
  const getProducts = async () => {
    const params = {
      limit: 12,
      page,
      ...(category && { category }),
      ...(brand && { brand }),
      ...(subcategory && { subcategory }),
      ...(priceGte && { "price[gte]": priceGte }),
      ...(priceLte && { "price[lte]": priceLte }),
      ...(sort && { sort }),
      ...(priceAfterDiscount > 0 && {
        "priceAfterDiscount[gte]": priceAfterDiscount,
      }),
    };
    const res = await api.get("/products", {
      params,
    });

    return res.data || { data: [], metadata: { numberOfPages: 1 } };
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "products",
      {
        page,
        category,
        brand,
        subcategory,
        priceGte,
        priceLte,
        sort,
        priceAfterDiscount,
      },
    ],
    queryFn: getProducts,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
    retryDelay: 1000,
  });

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", newPage);
      return params;
    });
  };
  async function addProductToCart(productId) {
    try {
      toast.loading("Adding to cart...", { id: "addToCart" });

      setLoadingProduct(productId);

      const res = await addToCart(productId);

      if (res.status === "success") {
        toast.success(res?.message, {
          id: "addToCart",
          style: {
            background: "#16a34a",
            color: "#fff",
          },
          icon: <i className="fa-solid fa-cart-arrow-down text-white"></i>,
        });
      } else {
        toast.error(res?.message, { id: "addToCart" });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: "addToCart" });
    } finally {
      setLoadingProduct(false);
    }
  }
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
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
  console.log(products);

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
                <ProductCard
                  key={product._id}
                  {...{ product, addProductToCart, loadingProduct }}
                />
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
