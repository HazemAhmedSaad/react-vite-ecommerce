import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "./../Home/Home";
import AuthPage from "../authentication/AuthPage";
import Profile from "../Profile/Profile";
import Products from "../Products/Products";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AuthRoute from "../ProtectedRoute/AuthRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Navigate to="/" replace /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "products", element: <Products /> },
        ],
      },
      {
        path: "authentication",
        element: (
          <AuthRoute>
            <AuthPage />
          </AuthRoute>
        ),
      },
      { path: "*", element: <Home /> },
    ],
  },
]);
