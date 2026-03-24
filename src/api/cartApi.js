import api from "../components/Utils/api";

// 🟢 Get Cart
export const getCart = async () => {
  const { data } = await api.get("/v2/cart");
  return data;
};

// 🟢 Add
export const addToCart = async (productId) => {
  const { data } = await api.post("/v2/cart", { productId });
  return data;
};

// 🟢 Update Count
export const updateCartItem = async ({ productId, count }) => {
  const { data } = await api.put(`/v2/cart/${productId}`, {
    count: Number(count),
  });
  return data;
};
// 🟢 Remove
export const removeCartItem = async (productId) => {
  const { data } = await api.delete(`/v2/cart/${productId}`);
  return data;
};

// 🟢 Clear
export const clearCart = async () => {
  const { data } = await api.delete("/v2/cart");
  return data;
};
