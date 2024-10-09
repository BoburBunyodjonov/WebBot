import { CategoryContextProvider } from "../services/categoryContext";
import Category from "./Category";

const index = () => {
  return (
    <>
      <CategoryContextProvider>
        <Category />
      </CategoryContextProvider>
    </>
  );
};

export default index;
