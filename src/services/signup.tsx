import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Credentials = {
  username: string;
  email: string;
  password: string;
};

type SignupResponse = {
  token: string;
  id: number;
  username: string;
  email: string;
};

export const signupApi = createApi({
  reducerPath: "signupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://127.0.0.1:8000/api/user/register",
  }),
  endpoints: (build) => ({
    postSignup: build.mutation<SignupResponse, Credentials>({
      query: (credentials) => ({
        url: "",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { usePostSignupMutation } = signupApi;
