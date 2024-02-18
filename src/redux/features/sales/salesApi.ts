import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      createSale: builder.mutation({
         query: (data) => ({
            url: "/sales/sell-product",
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["Sales", "Products"],
      }),
      getHistory: builder.query({
         query: () => ({
            url: "/sales/history",
            method: "GET",
         }),
         providesTags: ["Sales"],
      }),
      getHistoryDaily: builder.query({
         query: () => ({
            url: "/sales/history-daily",
            method: "GET",
         }),
         providesTags: ["Sales"],
      }),
      getHistoryWeekly: builder.query({
         query: () => ({
            url: "/sales/history-weekly",
            method: "GET",
         }),
         providesTags: ["Sales"],
      }),
      getHistoryMonthly: builder.query({
         query: () => ({
            url: "/sales/history-monthly",
            method: "GET",
         }),
         providesTags: ["Sales"],
      }),
      getHistoryYearly: builder.query({
         query: () => ({
            url: "/sales/history-yearly",
            method: "GET",
         }),
         providesTags: ["Sales"],
      }),
   }),
});

export const {
   useCreateSaleMutation,
   useGetHistoryQuery,
   useGetHistoryDailyQuery,
   useGetHistoryWeeklyQuery,
   useGetHistoryMonthlyQuery,
   useGetHistoryYearlyQuery,
} = salesApi;
