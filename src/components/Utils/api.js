import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api",
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config.url.includes("/auth/signin");

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("token");
      window.location.href = "/authentication";
    }

    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);
export default api;
