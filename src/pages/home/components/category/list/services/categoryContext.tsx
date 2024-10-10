import React, { FC, createContext, useContext, useEffect, useState } from "react";
import api from "../../../../../../common/api";
import { ICategory } from "../../../../../../common/types/category";
import useQueryParams from "../../../../../../hooks/useQueryParams";

const Context = () => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { getParam, setParam } = useQueryParams();

  const initialPage = getParam("page") ? Number(getParam("page")) : 1;
  const [page, setPageState] = useState<number>(initialPage);

  const getPaging = async (currentPage: number, search?: string, is_infinity: boolean = true) => {
    try {
      setLoading(true);
      const response = await api.category.getPaging({
        limit: getParam("limit") ? Number(getParam("limit")) : 20,
        page: currentPage,
        search
      });
      if(is_infinity){
        setCategory(prev => [...prev, ...response.data.data]);   
      }else{
        setCategory(prev => response.data.data); 
      }
      setTotal(response.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPaging(page); 
  }, [page]); 

  useEffect(() => {
    getPaging(1, getParam("search"), false)
  }, [getParam("search")])


  const updatePage = (newPage: number | ((prevPage: number) => number)) => {
    if (typeof newPage === 'function') {
      setPageState(prevPage => {
        const updatedPage = newPage(prevPage);
        setParam({ name: "page", value: updatedPage }); 
        return updatedPage;
      });
    } else {
      setPageState(newPage);
      setParam({ name: "page", value: newPage }); 
    }
  };

  return {
    state: { category, total, loading },
    actions: {
      setPage: updatePage, 
    },
  };
};

const CategoryContext = createContext<any>({ state: {}, actions: {} });

export const CategoryContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = Context();
  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};

export default function useCategoryContext() {
  return useContext<ReturnType<typeof Context>>(CategoryContext);
}
