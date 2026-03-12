import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/Router/Router";
import { AuthProvider } from "./context/AuthenticationToken";
import { ThemeProvider } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartContextProvider } from "./context/CartContext";
function App() {
  const queryClient = new QueryClient();
  return (
    <div>
      <CartContextProvider>
        <AuthProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </ThemeProvider>
        </AuthProvider>
      </CartContextProvider>
    </div>
  );
}

export default App;
