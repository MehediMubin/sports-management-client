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
      getSalesHistoryAllTime: builder.query({
         query: (queryParams) => ({
            url: "/sales/history-all-time",
            method: "GET",
            params: queryParams,
         }),
         providesTags: ["Sales"],
      }),
      getSalesHistoryToday: builder.query({
         query: (queryParams) => ({
            url: "/sales/history-today",
            method: "GET",
            params: queryParams,
         }),
         providesTags: ["Sales"],
      }),
      getSalesHistoryThisWeek: builder.query({
         query: (queryParams) => ({
            url: "/sales/history-weekly",
            method: "GET",
            params: queryParams,
         }),
         providesTags: ["Sales"],
      }),
      getSalesHistoryThisMonth: builder.query({
         query: (queryParams) => ({
            url: "/sales/history-monthly",
            method: "GET",
            params: queryParams,
         }),
         providesTags: ["Sales"],
      }),
      getSalesHistoryThisYear: builder.query({
         query: (queryParams) => ({
            url: "/sales/history-yearly",
            method: "GET",
            params: queryParams,
         }),
         providesTags: ["Sales"],
      }),
   }),
});

export const {
   useCreateSaleMutation,
   useGetSalesHistoryAllTimeQuery,
   useGetSalesHistoryTodayQuery,
   useGetSalesHistoryThisWeekQuery,
   useGetSalesHistoryThisMonthQuery,
   useGetSalesHistoryThisYearQuery,
} = salesApi;
