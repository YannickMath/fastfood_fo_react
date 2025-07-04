import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}
export const productsByCategoryApi = createApi({
  reducerPath: "productsByCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://127.0.0.1:8000/api/products/",
  }),
  endpoints: (builder) => ({
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `category/${category}`,
    }),
  }),
});

export const { useGetProductsByCategoryQuery } = productsByCategoryApi;
