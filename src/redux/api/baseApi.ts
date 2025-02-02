/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
   baseUrl: "https://level2-assignment-6-server.vercel.app/api/v1",
   credentials: "include",
   prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
         headers.set("authorization", token);
      }
      return headers;
   },
});

const baseQueryWithRefreshToken = async (
   args: any,
   api: any,
   extraOptions: any
) => {
   let result = await baseQuery(args, api, extraOptions);
   if (result.error?.status === 401) {
      const res = await fetch(
         "https://level2-assignment-6-server.vercel.app/api/v1/auth/refresh-token",
         {
            method: "POST",
            credentials: "include",
         }
      );
      const data = await res.json();

      if (data?.data?.accessToken) {
         const user = api.getState().auth.user;
         api.dispatch(setUser({ user, token: data.data.accessToken }));

         result = await baseQuery(args, api, extraOptions);
      } else {
         api.dispatch(logout());
      }
   }
   return result;
};

export const baseApi = createApi({
   reducerPath: "baseApi",
   baseQuery: baseQueryWithRefreshToken,
   tagTypes: ["Products", "Sales"],
   endpoints: () => ({}),
});
