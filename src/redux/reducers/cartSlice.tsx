import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/cartItem";

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const calculateTotal = (items: CartItem[]) =>
  items.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

const saveToSession = (items: CartItem[], isAuthenticated: boolean) => {
  if (!isAuthenticated) {
    sessionStorage.setItem("cart", JSON.stringify(items));
  } else {
    sessionStorage.removeItem("cart"); // nettoyage si connecté
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
        (item) => item.productId === action.payload.productId
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = calculateTotal(state.items);
      saveToSession(state.items, true);
    },

    removeOneItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (i) => i.productId !== action.payload
          );
        }
        state.total = calculateTotal(state.items);
        saveToSession(state.items, true);
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      state.total = calculateTotal(state.items);
      saveToSession(state.items, true);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveToSession(state.items, true);
    },
  },
});

export const { addItem, removeOneItem, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
