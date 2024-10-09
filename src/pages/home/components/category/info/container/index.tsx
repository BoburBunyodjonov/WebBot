import { CategoryInfoContextProvider } from "../services/categoryInfoContext";
import CategoryInfo from "./CategoryInfo";

const index = () => {
  return (
    <CategoryInfoContextProvider>
      <CategoryInfo />
    </CategoryInfoContextProvider>
  );
};

export default index;
