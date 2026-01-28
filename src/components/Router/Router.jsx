import { createBrowserRouter,  } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "./../Home/Home";
import AuthPage from '../authentication/AuthPage';
export const router = createBrowserRouter([
  {

    path: "/",
    element: <Layout/>,

    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "authentication", element: <AuthPage /> },
      { path: "*", element: <Home /> },
    ],
  },
]);
