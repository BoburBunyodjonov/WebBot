import { CategoryChildContextProvider } from "../services/categoryChildContext";
import CategorySecond from "./CategoryChild";

const index = () => {
  return (
    <>
      <CategoryChildContextProvider>
        <CategorySecond />
      </CategoryChildContextProvider>
    </>
  );
};

export default index;
