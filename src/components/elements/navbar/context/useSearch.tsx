import React, { ChangeEvent, ChangeEventHandler, FC, createContext, useContext, useEffect } from "react";
import useQueryParams from "../../../../hooks/useQueryParams";
import {debounce} from "lodash"

const Context = () => {
  const { setParam, getParam } = useQueryParams();

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value !== ""){
      setParam({name:"search", value: e.target.value})
    }else{
      setParam({name:"search", value: undefined})
    }
  }, 300);

  useEffect(() => {
    console.log(getParam("search"))
  }, [getParam("search")]);

  return {
    state: {},
    actions: { handleSearch },
  };
};

const SearchContext = createContext<any>({ state: {}, actions: {} });

export const SearchContextProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = Context();
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default function useSearchContext() {
  return useContext<ReturnType<typeof Context>>(SearchContext);
}