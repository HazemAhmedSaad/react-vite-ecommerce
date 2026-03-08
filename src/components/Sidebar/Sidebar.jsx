import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Sidebar.css";
import PriceFilter from "./PriceSlider";

export default function SidebarChickbooks() {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const brand = searchParams.get("brand");
  const priceGte = Number(searchParams.get("price[gte]")) || 0;
  const priceLte = Number(searchParams.get("price[lte]")) || 30000;

  function updateSearchParams(newParams) {
    const params = new URLSearchParams(searchParams);

    for (const key in newParams) {
      const value = newParams[key];

      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    params.set("page", 1);

    setSearchParams(params);
  }
  //   useEffect(()=>{
  //   if(open){
  //     document.body.style.overflow="hidden"
  //   }else{
  //     document.body.style.overflow="auto"
  //   }
  // },[open])
  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  const clearFilters = () => {
    setSearchParams({});
    setOpen(false);
  };
  const categories = useMemo(
    () => [
      {
        _id: "6439d58a0049ad0b52b9003f",
        name: "Women's Fashion",
        subcategories: [
          {
            _id: "6407f243b575d3b90bf957ac",
            name: "Women's Clothing",
          },
        ],
        brands: [
          {
            _id: "64089bbe24b25627a253158b",
            name: "DeFacto",
          },
        ],
      },
      {
        _id: "6439d5b90049ad0b52b90048",
        name: "Men's Fashion",
        subcategories: [
          {
            _id: "6407f243b575d3b90bf957ac",
            name: "Men's Clothing",
          },
        ],
        brands: [
          { _id: "64089dc924b25627a25315a8", name: "Jack & Jones" },
          { _id: "64089d5c24b25627a253159f", name: "Puma" },
          { _id: "64089c3924b25627a2531593", name: "Adidas" },
          { _id: "64089d9e24b25627a25315a5", name: "LC Waikiki" },
        ],
      },
      {
        _id: "6439d2d167d9aa4ca970649f",
        name: "Electronics",
        subcategories: [
          { _id: "6407f3e3b575d3b90bf957f1", name: "Networking Products" },
          { _id: "6407f3d8b575d3b90bf957ee", name: "Printers & Accessories" },
          { _id: "6407f3ccb575d3b90bf957eb", name: "Cameras & Accessories" },
          { _id: "6407f3c0b575d3b90bf957e8", name: "Video Games" },
          { _id: "6407f3a8b575d3b90bf957e2", name: "Laptops & Accessories" },
        ],
        brands: [
          { _id: "64089fe824b25627a25315d1", name: "Canon" },
          { _id: "64089df124b25627a25315ab", name: "Samsung" },
          { _id: "64089f5824b25627a25315c7", name: "Sony" },
          { _id: "64089faf24b25627a25315cd", name: "Dell" },
          { _id: "64089f8b24b25627a25315ca", name: "Lenovo" },
          { _id: "64089aa924b25627a2531576", name: "Toshiba" },
        ],
      },
    ],
    [],
  );
  const selectedCategory = useMemo(() => {
    return categories.find((cat) => cat._id === category);
  }, [category, categories]);
  const subcategories = selectedCategory?.subcategories || [];
  const brands = category
    ? selectedCategory?.brands || []
    : [
        ...new Map(
          categories.flatMap((c) => c.brands).map((b) => [b._id, b]),
        ).values(),
      ];
  return (
    <>
      <button onClick={toggleSidebar} className=" mt-5 toggle-btn">
        <i className="fa-solid fa-filter"></i>
      </button>
      {open && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      <div className="sider-bg">
        <aside className={`sidebar mt-5 ${open ? "open" : "closed"}`}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <button className=" clear-btn m-0" onClick={clearFilters}>
              Reset
            </button>

            <button className="btn btn-danger p-2" onClick={toggleSidebar}>
              {" "}
              <i className="fa-solid fa-xmark"></i>{" "}
            </button>
          </div>

          {/* PRICE */}
          <PriceFilter
            priceGte={priceGte}
            priceLte={priceLte}
            updateSearchParams={updateSearchParams}
          />
          <div className="filter-box">
            <div className="filter-box-sort">
              <h4>SORT BY</h4>
              <select
                value={searchParams.get("sort") || ""}
                onChange={(e) =>
                  updateSearchParams({
                    sort: e.target.value || null,
                  })
                }
              >
                {[
                  { value: "", label: "Default" },
                  { value: "price", label: "Low to High" },
                  { value: "-price", label: "High to Low" },
                ].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* CATEGORIES */}
          <div className="filter-box">
            <h4>CATEGORIES</h4>

            {categories.map((cat) => (
              <div key={cat._id}>
                <div
                  className={`category-row ${category === cat._id ? "active" : ""}`}
                  onClick={() =>
                    updateSearchParams({
                      category: category === cat._id ? null : cat._id,
                      subcategory: null,
                      brand: null,
                    })
                  }
                >
                  <span>{cat.name}</span>

                  <span
                    className={`arrow ${category === cat._id ? "rotate" : ""}`}
                  >
                    <i
                      className={`fa-solid fa-chevron-right arrow ${category === cat._id ? "rotate" : ""}`}
                    ></i>
                  </span>
                </div>

                {category === cat._id && (
                  <div className="subcategories">
                    {subcategories.map((sub) => (
                      <div
                        key={sub._id}
                        className={`subcategory ${subcategory === sub._id ? "active" : ""}`}
                        onClick={() =>
                          updateSearchParams({
                            subcategory:
                              subcategory === sub._id ? null : sub._id,
                          })
                        }
                      >
                        {sub.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* BRANDS */}
          <div className="filter-box">
            <h4>BRAND</h4>

            <div className="brand-scroll">
              {brands.map((b) => (
                <label key={b._id} className="brand-row">
                  <input
                    type="checkbox"
                    checked={brand === b._id}
                    onChange={() =>
                      updateSearchParams({
                        brand: brand === b._id ? null : b._id,
                      })
                    }
                  />

                  <span>{b.name}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
