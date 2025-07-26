import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CartItem } from "../types/cartItem";

export const cartApi = createApi({
  reducerPath: "cartItemsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://127.0.0.1:8000/api/cart",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("jwt");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCartItems: builder.query<{ items: CartItem[] }, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    addCartItem: builder.mutation<CartItem, Partial<CartItem>>({
      query: (newItem) => ({
        url: "items",
        method: "POST",
        body: newItem,
      }),
    }),
    syncCart: builder.mutation<{ items: CartItem[] }, CartItem[]>({
      query: (payload) => ({
        url: "",
        method: "POST",
        body: { items: payload },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCartItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    updateCartItemQuantity: builder.mutation<void, { productId: number }>({
      query: ({ productId }) => ({
        url: "item",
        method: "PUT",
        body: { productId },
      }),
      invalidatesTags: ["Cart"],
    }),
    mergeCart: builder.mutation<void, { items: CartItem[] }>({
      query: (body) => ({
        url: "/merge",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: "",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useAddCartItemMutation,
  useRemoveCartItemMutation,
  useSyncCartMutation,
  useClearCartMutation,
  useUpdateCartItemQuantityMutation,
} = cartApi;
