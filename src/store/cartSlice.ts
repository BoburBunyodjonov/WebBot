import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  quantity: number;
  [key: string]: any;
}

type CartState = CartItem[];

const loadCartFromLocalStorage = (): CartState => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const saveCartToLocalStorage = (cart: CartState) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState: CartState = loadCartFromLocalStorage();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action: PayloadAction<CartItem>) {
      const existingItem = state.find(
        (item) => item._id === action.payload._id
      );
      const availableStock = action.payload.quantity;

      if (existingItem) {
        const totalQuantity = existingItem.quantity + action.payload.quantity;
        if (totalQuantity <= availableStock) {
          existingItem.quantity += action.payload.quantity;
        } else {
          existingItem.quantity = availableStock;
        }
      } else {
        const quantityToAdd =
          action.payload.quantity <= availableStock
            ? action.payload.quantity
            : availableStock;
        state.push({ ...action.payload, quantity: quantityToAdd });
      }

      saveCartToLocalStorage(state);
    },
    increaseQuantity(
      state,
      action: PayloadAction<{ _id: string; availableStock: number }>
    ) {
      const { _id, availableStock } = action.payload;
      const item = state.find((item) => item._id === _id);
      if (item && item.quantity < availableStock) {
        item.quantity += 1;
      }
      saveCartToLocalStorage(state);
    },
    increaseBox(
      state,
      action: PayloadAction<{ _id: string; availableStock: number }>
    ) {
      const { _id, availableStock } = action.payload;
      const item = state.find((item) => item._id === _id);
      if (item && item.quantity < availableStock) {
        item.quantity += 2;
      }
      saveCartToLocalStorage(state);
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const itemIndex = state.findIndex((item) => item._id === action.payload);
      if (itemIndex !== -1 && state[itemIndex].quantity > 0) {
        state[itemIndex].quantity -= 1;
        if (state[itemIndex].quantity === 0) {
          state.splice(itemIndex, 1);
        }
      }
      saveCartToLocalStorage(state);
    },
    decreaseBox(state, action: PayloadAction<string>) {
      const itemIndex = state.findIndex((item) => item._id === action.payload);
      if (itemIndex !== -1 && state[itemIndex].quantity > 0) {
        state[itemIndex].quantity -= 2;
        if (state[itemIndex].quantity === 0) {
          state.splice(itemIndex, 1);
        }
      }
      saveCartToLocalStorage(state);
    },
    clearCart(state) {
      state.length = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { add, increaseQuantity, decreaseQuantity, increaseBox, decreaseBox, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
