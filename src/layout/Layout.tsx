import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/elements/navbar/Navbar";
import { Badge } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CartItem } from "../common/types/cart";
import { Link } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const cartitems = useSelector((state: RootState) => state.cart) as CartItem[];
  const showButton =
    location.pathname === "/" ||
    location.pathname.startsWith("/products") ||
    location.pathname.startsWith("/product/");

  const totalQuantity = cartitems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <>
      <Navbar />
      <div className="md:max-w-[500px] px-4 md:px-0 container overflow-scroll h-[91.5vh] mx-auto relative">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
        <Outlet />
        {showButton && (
          <div className="absolute bottom-28 right-20">
            <Link to="/cart">
              <button className="fixed bg-[#FFA500] p-4 rounded-full text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-[#ff8c00]">
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
