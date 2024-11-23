import React, { FC, createContext, useContext, useEffect, useState } from "react";
import { ICategory } from "../../../../../common/types/category";
import useQueryParams from "../../../../../hooks/useQueryParams";
import api from "../../../../../common/api";
import { useLocation } from "react-router-dom";

const Context = () => {
  const [product, setProduct] = useState<ICategory[]>([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [loading, setLoading] = useState(true);
  const { getParam, setParam } = useQueryParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const productIdParam = query.get('id');
  const productId = productIdParam ? productIdParam.split(',') : [];
  

  const initialPage = getParam("page") ? Number(getParam("page")) : 1;
  const [page, setPageState] = useState<number>(initialPage);

  const getPaging = async (currentPage: number, search?: string, is_infinity: boolean = true) => {
    try {
      setLoading(true);
      const response = await api.product.getPaging({
        limit: getParam("limit") ? Number(getParam("limit")) : 20,
        // limit: 20,
        page: currentPage,
        search,
        category_ids: productId,
      });
      const newItems = response.data.data;
      setProduct(prev => {
        if (is_infinity) {
          const uniqueItems = newItems.filter(
            item => !prev.some(existingItem => existingItem._id === item._id)
          );
          return [...prev, ...uniqueItems];
        } else {
          return newItems;
        }
      });
      setTotalProduct(response.data.total);
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
    state: { product, totalProduct, loading },
    actions: {
      setPageProduct: updatePage, 
      getPaging
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
