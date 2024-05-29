/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
   useGetSalesHistoryAllTimeQuery,
   useGetSalesHistoryThisMonthQuery,
   useGetSalesHistoryThisWeekQuery,
   useGetSalesHistoryThisYearQuery,
   useGetSalesHistoryTodayQuery,
} from "../redux/features/sales/salesApi";

const useSalesHistory = (filter: string, filterSales: string) => {
   const [totalQuantity, setTotalQuantity] = useState(0);
   const [totalSellAmount, setTotalSellAmount] = useState(0);
   const [isLoading, setIsLoading] = useState(true);

   const salesHistoryQueries: Record<string, any> = {
      "all-time": useGetSalesHistoryAllTimeQuery,
      today: useGetSalesHistoryTodayQuery,
      "this-week": useGetSalesHistoryThisWeekQuery,
      "this-month": useGetSalesHistoryThisMonthQuery,
      "this-year": useGetSalesHistoryThisYearQuery,
   };

   const SalesHistoryQuery = salesHistoryQueries[filterSales];
   const { data, isLoading: queryIsLoading } = SalesHistoryQuery({
      branchName: filter,
   });

   useEffect(() => {
      if (data?.data) {
         setTotalQuantity(data.data.totalQuantity);
         setTotalSellAmount(data.data.totalSellAmount);
      } else {
         setTotalQuantity(0);
         setTotalSellAmount(0);
      }
      setIsLoading(queryIsLoading);
   }, [data, queryIsLoading]);

   return { totalQuantity, totalSellAmount, isLoading };
};

export default useSalesHistory;
