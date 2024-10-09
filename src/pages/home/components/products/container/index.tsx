import { ProductContextProvider } from "../services/productContext";
import Product from "./Product";

const index = () => {
  return (
    <>
      <ProductContextProvider>
        <Product />
      </ProductContextProvider>
    </>
  );
};

export default index;
