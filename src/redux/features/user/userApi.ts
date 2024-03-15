import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getBranch: builder.query({
         query: (username) => ({
            url: `/users/branch/${username}`,
            method: "GET",
         }),
      }),
   }),
});

export const { useGetBranchQuery } = userApi;
