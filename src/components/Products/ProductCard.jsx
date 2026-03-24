import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
function ProductCard({ product, handleAddToCart, isLoadingProduct, isInCart }) {
  const getDiscount = (price, priceAfterDiscount) => {
    return Math.round(((price - priceAfterDiscount) / price) * 100);
  };
  const shortTitle = (title) => {
    return title
      .split(/[\s-]+/)
      .slice(0, 2)
      .join(" ");
  };
  return (
    <div className="product-card col-6 col-md-4 col-lg-3">
      <Link to={`/product/${product._id}`}>
        <div className="product-image-wrapper position-relative">
          <img src={product.imageCover} alt={product.title} />

          <div className="img-overlay">
            <span className="overlay-text">View</span>
          </div>
        </div>
      </Link>

      <div className="product-info my-1 d-flex justify-content-between align-items-center">
        <Link to={`/product/${product._id}`}>
          <h6 className="product-title">{shortTitle(product.title)}</h6>
        </Link>
        <div className="text-warning ">
          <i className="fa-solid fa-star"></i>
          {product.ratingsAverage}
        </div>
      </div>
      <div className="product-info d-flex justify-content-between align-items-center">
        <Link to={`/products?category=${product.category._id}`}>
          <p className="product-category mb-1">{product.category?.name}</p>
        </Link>
        {product.priceAfterDiscount > 0 && (
          <span className="discount-badge rounded-pill m-0 discount-badge-card ">
            -{getDiscount(product.price, product.priceAfterDiscount)}%
          </span>
        )}
      </div>

      <div className="product-content d-flex justify-content-between">
        <button
          className={`cart-btn ${isInCart ? "added" : ""}`}
          onClick={() =>
            isInCart
              ? handleRemoveFromCart(product._id)
              : handleAddToCart(product._id)
          }
          disabled={isLoadingProduct}
        >
          {isLoadingProduct ? (
            <PulseLoader color="#fff" size={8} />
          ) : isInCart ? (
            <>
             
              <span>Added</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-cart-arrow-down"></i>
              <span>Add</span>
            </>
          )}
        </button>

        <div className="d-flex align-items-center gap-1 product-price-info">
          {product.priceAfterDiscount ? (
            <>
              <p className="product-price">{product.priceAfterDiscount} EGP</p>
              <p className="old-price-text old-price">{product.price} EGP</p>
            </>
          ) : (
            <p className="product-price">{product.price} EGP</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
