import React, { FC, createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../../../../../common/api"; // Adjust the import path accordingly
import { ICategory } from "../../../../../../common/types/category"; // Adjust the import path accordingly
import useQueryParams from "../../../../../../hooks/useQueryParams"; // Adjust the import path accordingly

const Context = () => {
  const { search } = useLocation();
  const [category, setCategory] = useState<ICategory[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { getParam, setParam } = useQueryParams();

  // Initialize page state from query param or default to 1
  const initialPage = getParam("page") ? Number(getParam("page")) : 1;
  const [page, setPageState] = useState<number>(initialPage);

  // Fetch categories based on the current page
  const getPaging = async (currentPage: number) => {
    try {
      setLoading(true);
      const response = await api.category.getPaging({
        limit: getParam("limit") ? Number(getParam("limit")) : 20,
        page: currentPage,
      });
      console.log("API Response:", response.data); // Debug API response
      setCategory(prev => [...prev, ...response.data.data]); // Append new categories
      setTotal(response.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPaging(page); // Fetch data for the current page
  }, [page]); // Fetch data whenever the page changes

  // Function to update page number
  const updatePage = (newPage: number | ((prevPage: number) => number)) => {
    if (typeof newPage === 'function') {
      setPageState(prevPage => {
        const updatedPage = newPage(prevPage);
        setParam({ name: "page", value: updatedPage }); // Update query param
        return updatedPage;
      });
    } else {
      setPageState(newPage);
      setParam({ name: "page", value: newPage }); // Update query param
    }
  };

  return {
    state: { category, total, loading },
    actions: {
      setPage: updatePage, // Update the page function
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
