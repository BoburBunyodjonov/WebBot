import React, { FC, createContext, useContext, useEffect, useState } from "react";
import { ICategory } from "../../../../../common/types/category";
import useQueryParams from "../../../../../hooks/useQueryParams";
import api from "../../../../../common/api";

const Context = () => {
  const [product, setProduct] = useState<ICategory[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { getParam, setParam } = useQueryParams();

  const initialPage = getParam("page") ? Number(getParam("page")) : 1;
  const [page, setPageState] = useState<number>(initialPage);

  const getPaging = async (currentPage: number, search?: string, is_infinity: boolean = true) => {
    try {
      setLoading(true);
      const response = await api.product.getPaging({
        limit: getParam("limit") ? Number(getParam("limit")) : 20,
        page: currentPage,
        search
      });
      if(is_infinity){
        setProduct(prev => [...prev, ...response.data.data]);   
      }else{
        setProduct(prev => response.data.data); 
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
    state: { product, total, loading },
    actions: {
      setPage: updatePage, 
    },
  };
};

const ProductContext = createContext<any>({ state: {}, actions: {} });

export const ProductContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = Context();
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export default function useProductContext() {
  return useContext<ReturnType<typeof Context>>(ProductContext);
}
