import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const checkAuthenticationApi = createApi({
  reducerPath: "checkAuthenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://127.0.0.1:8000",
    prepareHeaders: (headers) => {
      console.log("on passe par prepareHeaders");

      // ⚠️ Déplacé ici : sera relu à chaque requête
      const token = localStorage.getItem("jwt");
      console.log("Token from localStorage:", token);

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
