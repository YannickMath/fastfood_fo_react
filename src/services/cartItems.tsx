import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CartItem } from "../reducer/slices/cartSlice";

export const cartItemsApi = createApi({
  reducerPath: "cartItemsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://127.0.0.1:8000/api/cart/",
  }),
  tagTypes: ["CartItem"],
  endpoints: (builder) => ({
    getCartItems: builder.query<CartItem[], void>({
      query: () => "",
    }),
    addCartItem: builder.mutation<CartItem, Partial<CartItem>>({
      query: (newItem) => ({
        url: "",
        method: "POST",
        body: newItem,
      }),
    }),
    updateCartItem: builder.mutation<CartItem, Partial<CartItem>>({
      query: (updatedItem) => ({
        url: `/${updatedItem.id}`,
        method: "PUT",
        body: updatedItem,
      }),
    }),
    removeCartItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} = cartItemsApi;
