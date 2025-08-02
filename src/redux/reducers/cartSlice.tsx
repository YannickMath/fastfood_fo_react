import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/cartItem";
import type { CartState } from "../../types/cartSlice";

const initialState: CartState = {
  items: [],
  total: 0,
};

const calculateTotal = (items: CartItem[]) =>
  items.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    ...initialState,
    total: calculateTotal(initialState.items),
  },
  reducers: {
    setItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.total = calculateTotal(state.items);
    },
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
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      state.total = calculateTotal(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeOneItem, removeItem, clearCart, setItems } =
  cartSlice.actions;

export default cartSlice.reducer;
