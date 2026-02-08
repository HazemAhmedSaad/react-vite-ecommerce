import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/Router/Router";
import { AuthProvider } from './context/AuthenticationToken';
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <ThemeProvider>
        <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
