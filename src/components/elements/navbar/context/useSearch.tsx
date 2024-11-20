import React, { ChangeEvent, FC, createContext, useCallback, useContext, useEffect, useState } from "react";
import useQueryParams from "../../../../hooks/useQueryParams";
import { debounce } from "lodash";

const Context = () => {
  const { setParam, getParam } = useQueryParams();
  const [searchInput, setSearchInput] = useState<string>("");



  const debouncedSetParam = useCallback(
    debounce((value: string) => {
      setParam({ name: "search", value: value.trim() !== "" ? value : undefined });
    }, 0),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSetParam(value);
  };



  useEffect(() => {
    const searchParam = getParam("search");
    setSearchInput(searchParam || "");
  }, [getParam]);


  useEffect(() => {
    const handleRouteChange = () => {
      setSearchInput("");
      setParam({ name: "search", value: undefined });
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, [getParam]);

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
