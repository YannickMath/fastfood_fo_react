import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Category {
  id: number;
  type: string;
}
export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://127.0.0.1:8000/api/categories/",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "",
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
