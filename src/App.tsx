import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginContextProvider } from "./pages/auth/components/login/services/loginContext";
import Category from "./pages/home/components/category/list/container";
import Product from "./pages/home/components/products/container";
import Cart from "./pages/cart/container";
import StoreProvider from "./store/StoreProvider";
import CategorySecond from "./pages/home/components/category_child/list/container";

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
        path: "category_child",
        element: <CategorySecond />,
      },
      {
        path: "product",
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
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
  );
};

export default App;
