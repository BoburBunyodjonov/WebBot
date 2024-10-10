import React, { FC, createContext, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import api from "../../../../../common/api"; 
import { toast } from "react-toastify"; 
import useAuth from "../../../../../hooks/useAuth";
import useUser from "../../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";

export type FieldType = {
  phone_number: string; 
  login: string; 
  password: string;
  chat_id: number;
};

interface ErrorInfo {
  errors?: { message: string }[];
}

interface LoginContextProps {
  formMethods: UseFormReturn<FieldType>;
  actions: {
    onFinish: (values: FieldType) => Promise<void>;
    onFinishFailed: (errorInfo: ErrorInfo) => void;
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
      const formData = {
        ...values,
        chat_id: Number(values.chat_id), 
      };
  
      const response = await api.account.login(formData);
      if (response.data.token) {
        setAuth(response.data.token);
        setUser(response.data);
        window.location.href = "/"; 
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        err.response.data.errors.forEach((error: { message: string }) => {
          toast.error(error.message);
        });
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.log(err);
    }
  };
  

  const onFinishFailed = (errorInfo: ErrorInfo) => {
    console.error("Failed:", errorInfo);
    if (errorInfo.errors) {
      errorInfo.errors.forEach((error) => {
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
