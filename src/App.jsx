import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/Router/Router";
import { AuthProvider } from "./context/AuthenticationToken";
import { ThemeProvider } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartContextProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
function App() {
  const queryClient = new QueryClient();
  return (
    <div>
      <CartContextProvider>
        <AuthProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <Toaster
                position="top-left"
                reverseOrder={false}
                containerStyle={{
                  top: 70,
                  left: 20,
                }}
              />
              <RouterProvider router={router} />
            </QueryClientProvider>
          </ThemeProvider>
        </AuthProvider>
      </CartContextProvider>
    </div>
  );
}

export default App;
