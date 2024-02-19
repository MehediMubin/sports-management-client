import { useState } from "react";
import FilterBranch from "../components/FilterBranch";
import FilterSales from "../components/FilterSales";
import SalesCard from "../components/SalesCard";
import {
   useGetHistoryDailyQuery,
   useGetHistoryMonthlyQuery,
   useGetHistoryQuery,
   useGetHistoryWeeklyQuery,
   useGetHistoryYearlyQuery,
} from "../redux/features/sales/salesApi";

const SalesHistory = () => {
   const { data, isLoading, isSuccess } = useGetHistoryQuery(undefined);
   const [filter, setFilter] = useState("all-time");

   const {
      data: dailyData,
      isLoading: dailyIsLoading,
      isSuccess: dailyIsSuccess,
   } = useGetHistoryDailyQuery(undefined);

   const {
      data: weeklyData,
      isLoading: weeklyIsLoading,
      isSuccess: weeklyIsSuccess,
   } = useGetHistoryWeeklyQuery(undefined);

   const {
      data: monthlyData,
      isLoading: monthlyIsLoading,
      isSuccess: monthlyIsSuccess,
   } = useGetHistoryMonthlyQuery(undefined);

   const {
      data: yearlyData,
      isLoading: yearlyIsLoading,
      isSuccess: yearlyIsSuccess,
   } = useGetHistoryYearlyQuery(undefined);

   if (isLoading) return <div>Loading...</div>;

   let totalQuantity = 0,
      totalSellAmount = 0,
      name = "";

   switch (filter) {
      case "daily":
         if (dailyIsLoading) return <div>Loading...</div>;
         if (dailyIsSuccess) {
            totalQuantity = dailyData?.data?.totalQuantity;
            totalSellAmount = dailyData?.data?.totalSellAmount;
            name = dailyData?.data?.name;
         }
         break;
      case "weekly":
         if (weeklyIsLoading) return <div>Loading...</div>;
         if (weeklyIsSuccess) {
            totalQuantity = weeklyData?.data?.totalQuantity;
            totalSellAmount = weeklyData?.data?.totalSellAmount;
            name = weeklyData?.data?.name;
         }
         break;
      case "monthly":
         if (monthlyIsLoading) return <div>Loading...</div>;
         if (monthlyIsSuccess) {
            totalQuantity = monthlyData?.data?.totalQuantity;
            totalSellAmount = monthlyData?.data?.totalSellAmount;
            name = monthlyData?.data?.name;
         }
         break;
      case "yearly":
         if (yearlyIsLoading) return <div>Loading...</div>;
         if (yearlyIsSuccess) {
            totalQuantity = yearlyData?.data?.totalQuantity;
            totalSellAmount = yearlyData?.data?.totalSellAmount;
            name = yearlyData?.data?.name;
         }
         break;
      case "all-time":
         if (isSuccess) {
            totalQuantity = data?.data?.totalQuantity;
            totalSellAmount = data?.data?.totalSellAmount;
            name = data?.data?.name;
         }
         break;
      default:
         break;
   }

   return (
      <div className="w-11/12 mx-auto mt-3">
         <div className="flex space-x-5">
            <FilterSales filter={filter} setFilter={setFilter} />
            <FilterBranch filter={filter} setFilter={setFilter} />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SalesCard Title={"Total Quantity"} description={totalQuantity} />
            <SalesCard
               Title={"Total Sell Amount"}
               description={`$${totalSellAmount}`}
            />
            <SalesCard Title={"Most Sold Product"} description={name} />
         </div>
      </div>
   );
};

export default SalesHistory;
