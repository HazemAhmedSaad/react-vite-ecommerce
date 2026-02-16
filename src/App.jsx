import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/Router/Router";
import { AuthProvider } from "./context/AuthenticationToken";
import { ThemeProvider } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();
  return (
    
    <div>
      <AuthProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
