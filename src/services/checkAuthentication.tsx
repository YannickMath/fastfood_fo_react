import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const checkAuthenticationApi = createApi({
  reducerPath: "checkAuthenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://127.0.0.1:8000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("jwt");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["CheckAuthentication"],
  endpoints: (build) => ({
    checkAuthentication: build.query<boolean, void>({
      query: () => ({
        url: "/api/user/checkAuthentication",
        method: "GET",
      }),
      providesTags: ["CheckAuthentication"],
    }),
  }),
});

export const { useCheckAuthenticationQuery } = checkAuthenticationApi;
