import { createContext, useState } from "react";
import api from "../components/Utils/api";

export const cartContext = createContext();

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [count, setCount] = useState(0);

  const addToCart = async (productId) => {
    try {
      const { data } = await api.post("/cart", { productId });

      // تحديث ال state
      setCart(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      setCount(data.numOfCartItems);

      return data;
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message,
      );
      throw error;
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
