import { useEffect, useState } from "react";
import FilterBranch from "../components/FilterBranch";
import FilterSales from "../components/FilterSales";
import SalesCard from "../components/SalesCard";
import {
   useGetSalesHistoryAllTimeQuery,
   useGetSalesHistoryThisMonthQuery,
   useGetSalesHistoryThisWeekQuery,
   useGetSalesHistoryThisYearQuery,
   useGetSalesHistoryTodayQuery,
} from "../redux/features/sales/salesApi";
import { useGetBranchQuery } from "../redux/features/user/userApi";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

const SalesHistory = () => {
   const [filterSales, setFilterSales] = useState("all-time");
   const [filter, setFilter] = useState("All Branches");

   const user = useAppSelector((state: RootState) => state.auth.user);
   const { role, username } = user;
   const { data: branchData, isLoading: branchNameLoading } =
      useGetBranchQuery(username);

   useEffect(() => {
      if (filter === "All Branches") {
         setFilter("all-branches");
      }

      if (role === "branchManager") {
         setFilter(branchData?.data || "all-branches");
      }
   }, [filter, role, branchData]);

   const { data, isLoading, isSuccess } = useGetSalesHistoryAllTimeQuery({
      branchName: filter,
   });

   const {
      data: dailyData,
      isLoading: dailyIsLoading,
      isSuccess: dailyIsSuccess,
   } = useGetSalesHistoryTodayQuery({ branchName: filter });

   const {
      data: weeklyData,
      isLoading: weeklyIsLoading,
      isSuccess: weeklyIsSuccess,
   } = useGetSalesHistoryThisWeekQuery({ branchName: filter });

   const {
      data: monthlyData,
      isLoading: monthlyIsLoading,
      isSuccess: monthlyIsSuccess,
   } = useGetSalesHistoryThisMonthQuery({ branchName: filter });

   const {
      data: yearlyData,
      isLoading: yearlyIsLoading,
      isSuccess: yearlyIsSuccess,
   } = useGetSalesHistoryThisYearQuery({ branchName: filter });

   if (isLoading) return <div>Loading...</div>;

   let totalQuantity = 0,
      totalSellAmount = 0;

   switch (filterSales) {
      case "today":
         if (dailyIsLoading) return <div>Loading...</div>;
         if (dailyIsSuccess) {
            totalQuantity = dailyData?.data?.totalQuantity || 0;
            totalSellAmount = dailyData?.data?.totalSellAmount || 0;
         }
         break;
      case "this-week":
         if (weeklyIsLoading) return <div>Loading...</div>;
         if (weeklyIsSuccess) {
            totalQuantity = weeklyData?.data?.totalQuantity || 0;
            totalSellAmount = weeklyData?.data?.totalSellAmount || 0;
         }
         break;
      case "this-month":
         if (monthlyIsLoading) return <div>Loading...</div>;
         if (monthlyIsSuccess) {
            totalQuantity = monthlyData?.data?.totalQuantity || 0;
            totalSellAmount = monthlyData?.data?.totalSellAmount || 0;
         }
         break;
      case "this-year":
         if (yearlyIsLoading) return <div>Loading...</div>;
         if (yearlyIsSuccess) {
            totalQuantity = yearlyData?.data?.totalQuantity || 0;
            totalSellAmount = yearlyData?.data?.totalSellAmount || 0;
         }
         break;
      case "all-time":
         if (isSuccess) {
            totalQuantity = data?.data?.totalQuantity || 0;
            totalSellAmount = data?.data?.totalSellAmount || 0;
         }
         break;
      default:
         break;
   }

   return (
      <div className="w-8/12 mx-auto mt-3">
         <div className="flex space-x-5">
            <FilterSales filter={filterSales} setFilter={setFilterSales} />
            {role === "branchManager" ? (
               <select disabled>
                  <option>{branchData?.data || "all-branches"}</option>
               </select>
            ) : (
               <FilterBranch filter={filter} setFilter={setFilter} />
            )}
         </div>
         <div className="flex justify-between gap-2 lg:gap-0">
            <SalesCard Title={"Total Quantity"} description={totalQuantity} />
            <SalesCard
               Title={"Total Sell Amount"}
               description={`$${totalSellAmount}`}
            />
         </div>
      </div>
   );
};

export default SalesHistory;
