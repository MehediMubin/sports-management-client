import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      register: builder.mutation({
         query: (credentials) => ({
            url: "/users/create-user",
            method: "POST",
            body: credentials,
         }),
      }),
      login: builder.mutation({
         query: (credentials) => ({
            url: "/auth/login",
            method: "POST",
            body: credentials,
         }),
      }),
   }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
