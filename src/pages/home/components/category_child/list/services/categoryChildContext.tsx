import React, { FC, createContext, useContext, useEffect, useState } from "react";
import api from "../../../../../../common/api";
import { ICategory } from "../../../../../../common/types/category";
import useQueryParams from "../../../../../../hooks/useQueryParams";
import { useLocation } from "react-router-dom";

const Context = () => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { getParam, setParam } = useQueryParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const productIdParam = query.get('parent_id');

  const productId = productIdParam;

  const initialPage = getParam("page") ? Number(getParam("page")) : 1;
  const [page, setPageState] = useState<number>(initialPage);

  const getPaging = async (currentPage: number, search?: string, is_infinity: boolean = true) => {
    try {
      setLoading(true);
      const response = await api.category.getPaging({
        limit: getParam("limit") ? Number(getParam("limit")) : 20,
        // limit: 20,
        page: currentPage,
        search,
        parent_id: productId
      });
      const newItems = response.data.data;

      setCategory(prev => {
        if (is_infinity) {
          const uniqueItems = newItems.filter(
            item => !prev.some(existingItem => existingItem._id === item._id)
          );
          return [...prev, ...uniqueItems];
        } else {
          return newItems;
        }
      });
      setTotal(response.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const search = getParam("search");
    getPaging(page, search, page > 1); 
  }, [page, getParam("search")]);


  const updatePage = (newPage: number | ((prevPage: number) => number)) => {
    if (typeof newPage === 'function') {
      setPageState(prevPage => {
        const updatedPage = newPage(prevPage);
        // setParam({ name: "page", value: updatedPage }); 
        return updatedPage;
      });
    } else {
      setPageState(newPage);
      // setParam({ name: "page", value: newPage }); 
    }
  };

  return {
    state: { category, total, loading },
    actions: {
      setPage: updatePage,
    },
  };
};

const CategoryChildContext = createContext<any>({ state: {}, actions: {} });

export const CategoryChildContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = Context();
  return <CategoryChildContext.Provider value={value}>{children}</CategoryChildContext.Provider>;
};

export default function useCategoryChildContext() {
  return useContext<ReturnType<typeof Context>>(CategoryChildContext);
}
