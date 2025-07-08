import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://127.0.0.1:8000/api/products/",
  }),
  endpoints: (builder) => ({
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `category/${category}`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
