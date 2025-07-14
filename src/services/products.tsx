import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: number;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://127.0.0.1:8000/api/products/",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "",
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
