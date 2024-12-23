import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/elements/navbar/";
import { Badge } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CartItem } from "../common/types/cart";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../components/loading/Loading";



const Layout = () => {
  const location = useLocation();
  const cartitems = useSelector((state: RootState) => state.cart) as CartItem[];
  const showButton =
    location.pathname === "/" ||
    location.pathname.startsWith("/product") ||
    location.pathname.startsWith("/product/") ||
    location.pathname.startsWith("/category_child");

  const showNavbar =
    location.pathname === "/" ||
    location.pathname.startsWith("/product") ||
    location.pathname.startsWith("/product/") ||
    location.pathname.startsWith("/cart") ||
    location.pathname.startsWith("/category_child");;

  const totalQuantity = cartitems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <>
      {showNavbar && <Navbar />}
      <div className="md:max-w-[500px] container overflow-scroll h-[91.5vh] mx-auto relative bg-white scrollbar-hidden">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
        {showButton && (
          <div className="absolute bottom-28 right-20">
            <Link to="/cart">
              <button className="fixed bg-[#FFA500] p-4 rounded-full text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-[#ff8c00] ">
                <Badge badgeContent={totalQuantity} color="success">
                  <AddShoppingCartIcon />
                </Badge>
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
