import React, { FC, createContext, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import api from "../../../../../common/api"; 
import { toast } from "react-toastify"; 
import useAuth from "../../../../../hooks/useAuth";
import useUser from "../../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";

export type FieldType = {
  phone_number: string; 
  password: string;
};


interface LoginContextProps {
  formMethods: UseFormReturn<FieldType>;
  actions: {
    onFinish: (values: FieldType) => Promise<void>;
    onFinishFailed: (errorInfo: any) => void;
  };
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const useLoginContext = () => {
  const context = useContext(LoginContext);
 

  if (!context) {
    throw new Error("useLoginContext must be used within a LoginContextProvider");
  }
  return context;
};

export const LoginContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const formMethods = useForm<FieldType>({});
  const { setAuth } = useAuth();
  const { setUser } = useUser();
  const onFinish = async (values: FieldType) => {
    try {
      const response = await api.account.login(values);
      if (response.data.token) {
        console.log('success', response.data.token);
        setAuth(response.data.token);
        setUser(response.data);
        window.location.href = "/"
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
    if (errorInfo.errors) {
      errorInfo.errors.forEach((error: { message: string }) => {
        toast.error(error.message); 
      });
    }
  };

  return (
    <LoginContext.Provider value={{ formMethods, actions: { onFinish, onFinishFailed } }}>
      {children}
    </LoginContext.Provider>
  );
};
