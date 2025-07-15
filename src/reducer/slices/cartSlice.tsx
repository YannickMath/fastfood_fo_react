import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: JSON.parse(sessionStorage.getItem("cartItems") || "[]"),
  total: 0,
};

const calculateTotal = (items: CartItem[]) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0);

const saveToSession = (items: CartItem[]) => {
  const auth = JSON.parse(sessionStorage.getItem("auth") || "null");
  const isAuthenticated = auth?.isAuthenticated;
  if (!isAuthenticated) {
    sessionStorage.setItem("cartItems", JSON.stringify(items));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    ...initialState,
    total: calculateTotal(initialState.items),
  },
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = calculateTotal(state.items);
      saveToSession(state.items);
    },

    removeOneItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
        state.total = calculateTotal(state.items);
        saveToSession(state.items);
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = calculateTotal(state.items);
      saveToSession(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveToSession(state.items);
    },
  },
});

export const { addItem, removeOneItem, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
