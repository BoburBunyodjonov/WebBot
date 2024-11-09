import { CategoryChildContextProvider } from "../services/categoryChildContext";
import CategorySecond from "./CategoryChild";
import { ProductContextProvider } from '../../../products/services/productContext';

const index = () => {
  return (
    <>
      <CategoryChildContextProvider>
        <ProductContextProvider>
          <CategorySecond />
        </ProductContextProvider>
      </CategoryChildContextProvider>
    </>
  );
};

export default index;
