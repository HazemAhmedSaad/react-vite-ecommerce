import { createContext, useState } from "react";
import api from "../components/Utils/api";
import { toast } from "react-hot-toast";

export const cartContext = createContext();

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [count, setCount] = useState(0);

  const addToCart = async (productId) => {
    try {
      const { data } = await api.post("/v2/cart", { productId });
      setCart(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      setCount(data.numOfCartItems);
      return data;
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data.message || error.message,
      );
      throw error?.response?.data;
    }
  };

  return (
    <cartContext.Provider
      value={{
        addToCart,
        cart,
        setCart,
        count,
        setCount,
        totalPrice,
        setTotalPrice,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
