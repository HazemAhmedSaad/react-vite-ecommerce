import "./Products.css";
import HashLoader from "react-spinners/HashLoader";
import {
  keepPreviousData,
  useMutationState,
  useQuery,
} from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";
import CategorySlider from "../CategorySlider/CategorySlider";
import BrandSlider from "../BrandSlider/BrandSlider";
import SidebarChickbooks from "../Sidebar/Sidebar";
import api from "../Utils/api";
import { useCallback, useEffect } from "react";
import { useAddToCart } from "../../hooks/useAddToCart";
import { useCart } from "./../../hooks/useGetCart";
import { useRemoveCartItem } from "./../../hooks/useRemoveCartItem";
import toast from "react-hot-toast";

export default function Products() {
  const loadingProducts = useMutationState({
    filters: { mutationKey: ["addToCart"], status: "pending" },
    select: (mutation) => mutation.state.variables,
  });
  const removingProducts = useMutationState({
    filters: { mutationKey: ["removeCartItem"], status: "pending" },
    select: (mutation) => mutation.state.variables,
  });
  const { mutate: removeFromCart } = useRemoveCartItem({
    onMutate: (productId) => {
      const toastId = `remove-${productId}-${Date.now()}`;
      toast.loading("Removing...", { id: toastId });
      return { toastId };
    },

    onSuccess: (data, productId, context) => {
      toast.success("Removed from cart 🗑️", {
        id: context.toastId,
        style: { background: "#28a745", color: "#fff" },
      });
    },

    onError: (err, productId, context) => {
      toast.error("Failed to remove", {
        id: context.toastId,
        style: { background: "#dc3545", color: "#fff" },
      });
    },
  });
  const { data: cartData } = useCart();
  const removingSet = new Set(
    removingProducts.map((p) => (typeof p === "string" ? p : p?.productId)),
  );
  const cartItems = cartData?.data?.products || [];
  const cartSet = new Set(cartItems.map((item) => item.product._id));
  const addingSet = new Set(
    loadingProducts.map((p) => (typeof p === "string" ? p : p?.productId)),
  );

  const { mutate: addToCart } = useAddToCart();
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
  const getProducts = useCallback(async () => {
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

    const res = await api.get("/v1/products", { params });

    return res.data || { data: [], metadata: { numberOfPages: 1 } };
  }, [
    page,
    category,
    brand,
    subcategory,
    priceGte,
    priceLte,
    sort,
    priceAfterDiscount,
  ]);
  const {
    data,
    isLoading,
    isError,
    isFetching: isFetchingProducts,
  } = useQuery({
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
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (page > 1) window.scrollTo({ top: 500, behavior: "smooth" });
    }, 50);
    return () => clearTimeout(timeout);
  }, [page]);
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", newPage);
      return params;
    });
  };
  const handleAddToCart = useCallback(
    (productId) => {
      addToCart(productId);
    },
    [addToCart],
  );
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
  // console.log(products);

  return (
    <div className="products-wrapper container">
      {isFetchingProducts && !isLoading && (
        <div className="loading-overlay-custom">
          <HashLoader color="#f3a909" size={75} />
        </div>
      )}
      <SidebarChickbooks />
      <div className="products-content">
        <div className="main-content container">
          <CategorySlider />
          <BrandSlider />
          <div className="row  g-4 justify-content-around product-group">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={removeFromCart}
                  isAdding={addingSet.has(product._id)}
                  isRemoving={removingSet.has(product._id)}
                  isInCart={cartSet.has(product._id)}
                />
              ))
            ) : (
              <div className="d-flex justify-content-center align-items-center w-100 my-5">
                <div className="text-center my-5">
                  <i className="fa-solid fa-box-open text-main-filter display-4  mb-3"></i>
                  <h5>No Products Found</h5>
                  <p className="text-muted-filter">Try changing filters</p>
                </div>
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
