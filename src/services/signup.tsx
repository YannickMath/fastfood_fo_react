import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Credentials = {
  username: string;
  email: string;
  password: string;
};

type SignupResponse = {
  // Adjust these fields to match your actual API response
  id: number;
  username: string;
  email: string;
  // Add other fields as needed
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
