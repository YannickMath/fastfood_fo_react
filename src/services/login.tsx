import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://127.0.0.1:8000/api/user/login",
  }),
  endpoints: (build) => ({
    postLogin: build.mutation({
      query: (credentials) => ({
        url: "",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { usePostLoginMutation } = loginApi;
