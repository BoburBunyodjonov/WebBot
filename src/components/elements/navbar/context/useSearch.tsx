import React, { ChangeEvent, FC, createContext, useContext, useEffect, useState } from "react";
import useQueryParams from "../../../../hooks/useQueryParams";
import { debounce } from "lodash";

const Context = () => {
  const { setParam, getParam } = useQueryParams();
  const [searchInput, setSearchInput] = useState<string>("");

  // Debounce input changes to avoid frequent updates
  const handleInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }, 300);

  // Trigger search when the button is clicked
  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      setParam({ name: "search", value: searchInput });
    } else {
      setParam({ name: "search", value: undefined });
    }
  };

  useEffect(() => {
    getParam("search");
  }, [getParam("search")]);

  return {
    state: { searchInput },
    actions: { handleInputChange, handleSearch },
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
