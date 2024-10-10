import React, { FC, createContext, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../../../common/api";
import { useNavigate } from "react-router-dom";

export type Product = {
  product_id: string;
  amount: number;
};

export type OrderType = {
  products: Product[];
};

interface ErrorInfo {
  errors?: { message: string }[];
}

interface CartContextProps {
  formMethods: UseFormReturn<OrderType>;
  actions: {
    onFinish: (values: OrderType) => Promise<void>;
    onFinishFailed: (errorInfo: ErrorInfo) => void;
  };
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};

export const CartContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const formMethods = useForm<OrderType>({
    defaultValues: {
      products: [],
    },
  });
  const navigate = useNavigate();

  const onFinish = async (values: OrderType) => {
    try {
      const response = await api.orderCreate.order(values);
      if (response.data) {
        navigate("/");
      }
    } catch (err: any) {
      const errors = err.response?.data?.errors || [
        { message: "An unexpected error occurred. Please try again." },
      ];
      errors.forEach((error: { message: string }) => {
        toast.error(error.message);
      });
      console.error("Order creation error:", err);
    }
  };

  const onFinishFailed = (errorInfo: ErrorInfo) => {
    console.error("Form submission failed:", errorInfo);
    if (errorInfo.errors) {
      errorInfo.errors.forEach((error) => {
        toast.error(error.message);
      });
    }
  };

  return (
    <CartContext.Provider
      value={{ formMethods, actions: { onFinish, onFinishFailed } }}
    >
      {children}
    </CartContext.Provider>
  );
};
