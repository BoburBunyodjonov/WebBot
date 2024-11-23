import React, { ChangeEvent, FC, createContext, useCallback, useContext, useEffect, useState } from "react";
import useQueryParams from "../../../../hooks/useQueryParams";
import { debounce } from "lodash";

const Context = () => {
  const { setParam, getParam } = useQueryParams();
  const [searchInput, setSearchInput] = useState<string>("");



  // const debouncedSetParam = useCallback(
  //   debounce((value: string) => {
  //     setParam({ name: "search", value: value.trim() !== "" ? value : value });
  //   }, 0),
  //   []
  // );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    setParam({ name: "search", value: value.trim() !== "" ? value : undefined });
    // debouncedSetParam(value);
  };

  // const handleInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   // setSearchInput(e.target.value);
  //   setSearchInput(value);
  //   setParam({ name: "search", value: value.trim() !== "" ? value : undefined });
  // }, 300);




  useEffect(() => {
    const searchParam = getParam("search");
    setSearchInput(searchParam || "");
  }, [getParam]);


  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     setSearchInput("");
  //     setParam({ name: "search", value: undefined });
  //   };

  //   window.addEventListener("popstate", handleRouteChange);
  //   return () => window.removeEventListener("popstate", handleRouteChange);
  // }, [getParam]);

  return {
    state: { searchInput },
    actions: { handleInputChange },
  };
};

const SearchContext = createContext<any>({ state: {}, actions: {} });

export const SearchContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = Context();
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export default function useSearchContext() {
  return useContext<ReturnType<typeof Context>>(SearchContext);
}
