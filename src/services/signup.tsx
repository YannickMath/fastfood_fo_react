// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// type Credentials = {
//   name: string;
//   email: string;
//   password: string;
// };

// type SignupResponse = {
//   // Adjust these fields to match your actual API response
//   id: number;
//   name: string;
//   email: string;
//   // Add other fields as needed
// };

// export const signupApi = createApi({
//   reducerPath: "signupApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://127.0.0.1:8000/api/user/register/",
//   }),
//   endpoints: (build) => ({
//     postSignup: build.query<Post, Credentials>({

// export const { usePostSignupMutation } = signupApi;
