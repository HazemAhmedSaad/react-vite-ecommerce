import { useState, useEffect } from "react";
import "./PriceSlider.css";

export default function PriceFilter({
  priceGte = 0,
  priceLte = 30000,
  updateSearchParams,
}) {
  const MIN = 0;
  const MAX = 30000;

  const [minVal, setMinVal] = useState(Number(priceGte));
  const [maxVal, setMaxVal] = useState(Number(priceLte));

  useEffect(() => {
    setMinVal(Number(priceGte));
    setMaxVal(Number(priceLte));
  }, [priceGte, priceLte]);

  const percent1 = ((minVal - MIN) / (MAX - MIN)) * 100;
  const percent2 = ((maxVal - MIN) / (MAX - MIN)) * 100;

  const apply = () => {
    updateSearchParams({
      "price[gte]": minVal,
      "price[lte]": maxVal,
    });
  };

  return (
    <div className="filter-box">
      <div className="price-header">
        <h4>PRICE (EGP)</h4>
        <span className="apply-btn" onClick={apply}>
          Apply
        </span>
      </div>

      <div className="price-container">
        <div
          className="slider-track-active"
          style={{
            left: `${percent1}%`,
            width: `${percent2 - percent1}%`,
          }}
        />

        <input
          type="range"
          min={MIN}
          max={MAX}
          value={minVal}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), maxVal - 1);
            setMinVal(value);
          }}
        />

        <input
          type="range"
          min={MIN}
          max={MAX}
          value={maxVal}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), minVal + 1);
            setMaxVal(value);
          }}
        />
      </div>

      <div className="price-inputs">
        <input
          type="number"
          value={minVal}
          onKeyDown={(e) => e.key === "Enter" && apply()}
          onChange={(e) => {
            const value = Math.max(
              MIN,
              Math.min(Number(e.target.value), maxVal - 1),
            );
            setMinVal(value);
          }}
        />

        <span>-</span>

        <input
          type="number"
          value={maxVal}
          onKeyDown={(e) => e.key === "Enter" && apply()}
          onChange={(e) => {
            const value = Math.min(
              MAX,
              Math.max(Number(e.target.value), minVal + 1),
            );
            setMaxVal(value);
          }}
        />
      </div>
    </div>
  );
}
