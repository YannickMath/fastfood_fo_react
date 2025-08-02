import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";
import type { ProductsState } from "../../types/productSlice";

const initialState: ProductsState = {
  items: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    clearProducts: (state) => {
      state.items = [];
    },
  },
});

export const { setProducts, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
