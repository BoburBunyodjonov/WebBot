import React, { FC, createContext, useContext } from "react";

const Context = () => {
  return {
    state: {},
    actions: {},
  };
};

const AuthContext = createContext<any>({ state: {}, actions: {} });

export const AuthContextProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = Context();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default function useAuthContext() {
  return useContext<ReturnType<typeof Context>>(AuthContext);
}