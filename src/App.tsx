import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginContextProvider } from "./pages/auth/components/login/services/loginContext";
import Category from "./pages/home/components/category/list/container";
import Product from "./pages/home/components/products/container";
import Cart from "./pages/cart/container";
import StoreProvider from "./store/StoreProvider";

const Layout = React.lazy(() => import("./layout/Layout"));
const Home = React.lazy(() => import("./pages/home/container"));
const Auth = React.lazy(() => import("./pages/auth/container"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "category",
            element: <Category />,
          },
        ],
      },
      {
        path: "/login",
        element: <Auth />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

const App = () => {
  return (
    <LoginContextProvider>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </LoginContextProvider>
  );
};

export default App;
