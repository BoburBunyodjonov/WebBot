import { CartContextProvider } from "../services/cartContext";
import Cart from "./Cart";

const index = () => {
  return (
    <>
      <CartContextProvider>
        <Cart />
      </CartContextProvider>
    </>
  );
};

export default index;
