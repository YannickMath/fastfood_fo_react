import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: number;
  image?: string;
}

interface ProductsState {
  items: Product[];
}

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
