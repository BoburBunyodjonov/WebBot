import React, {
    FC,
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { useLocation } from "react-router-dom";
import { ICategory } from "../../../../../../common/types/category";
import api from "../../../../../../common/api";
import Category from '../../list/container/Category';
  
  const Context = () => {
    const { state } = useLocation();
    const [category, setCategory] = useState<ICategory>();
    const [otherCategory, setOtherCategory] = useState<ICategory[]>();
    const [loading, setLaoading] = useState(true);
  
    const getById = async () => {
      try {
        setLaoading(true);
        const response = await api.category.getById(state.id);
        setCategory(response.data);
        setLaoading(false);
        console.log(response.data)
      } catch (err) {
        console.log(err);
      }
    };
  
    const getPaging = async () => {
      try {
        const response = await api.category.getPaging({ limit: 10, page: 1 });
        setOtherCategory(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getById();
      getPaging();
    }, []);
  
    return {
      state: { category, otherCategory, loading },
      actions: {},
    };
  };
  
  const CategoryInfoContext = createContext<any>({ state: {}, actions: {} });
  
  export const CategoryInfoContextProvider: FC<{
    children: React.ReactNode;
  }> = ({ children }) => {
    const value = Context();
    return (
      <CategoryInfoContext.Provider value={value}>
        {children}
      </CategoryInfoContext.Provider>
    );
  };
  
  export default function useCategoryInfoContext() {
    return useContext<ReturnType<typeof Context>>(CategoryInfoContext);
  }