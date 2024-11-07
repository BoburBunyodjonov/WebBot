import React, { createContext, FC, useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../../../../../common/api";
import useAuth from "../../../../../hooks/useAuth";
import useQueryParams from "../../../../../hooks/useQueryParams";
import useUser from "../../../../../hooks/useUser";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export type FieldType = {
  phone_number: string; 
  login: string; 
  password: string;
  chat_id: number;
};

interface ErrorInfo {
  errors?: { message: string }[];
}

const Context = () => {
  const formMethods = useForm<FieldType>({});
  const { setAuth } = useAuth();
  const { setUser } = useUser();
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(Number(storedUserId)); 
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      localStorage.setItem("userId", userId.toString());
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  useEffect(() => {
    if ((window as any).Telegram?.WebApp) {
      const initDataUnsafe = (window as any).Telegram.WebApp.initDataUnsafe;

      if (initDataUnsafe?.user) {
        setUserId(initDataUnsafe.user.id);
      }
    }
    if(params.get("chat_id")) setUserId(Number(params.get("chat_id")));
  }, [params]);

  const onFinish = async (values: FieldType) => {
    try {
      const formData = {
        ...values,
        chat_id: userId,
      };
      const response = await api.account.login(formData);
      if (response.data.token) {
        setAuth(response.data.token);
        setUser(response.data);
        navigate("/");  
      }
    } catch (err: any) {
      if (err.response.data.code === 401) {
        localStorage.clear();
        navigate(`/login${search}`);  
      }
      if (err.response && err.response.data && err.response.data.errors) {
        err.response.data.errors.forEach((error: { message: string }) => {
          toast.error(error.message);
        });
      }
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
  return {
    formMethods,
    state: {userId},
    actions: {onFinish, onFinishFailed},
  };
};

const LoginContext = createContext<any>({ formMethods: {}, state: {}, actions: {} });

export const LoginContextProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = Context();
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export default function useLoginContext() {
  return useContext<ReturnType<typeof Context>>(LoginContext);
}
