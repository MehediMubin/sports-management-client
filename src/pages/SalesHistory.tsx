import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import useSalesHistory from "../hooks/useSalesHistory"; // new custom hook
import { TUser } from "../redux/features/auth/authSlice";
import { useGetBranchQuery } from "../redux/features/user/userApi";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import AuthorizedView from "../components/AuthorizedView";
import UnauthorizedView from "../components/UnauthorizedView";

const SalesHistory = () => {
   const [filterSales, setFilterSales] = useState("all-time");
   const [filter, setFilter] = useState("All Branches");

   const user = useAppSelector((state: RootState) => state.auth.user);
   const { role, username }: TUser = user!;
   const { data: branchData } = useGetBranchQuery(username);

   useEffect(() => {
      if (filter === "All Branches") {
         setFilter("all-branches");
      }

      if (role === "branchManager") {
         setFilter(branchData?.data || "all-branches");
      }
   }, [filter, role, branchData]);

   const { totalQuantity, totalSellAmount, isLoading } = useSalesHistory(
      filter,
      filterSales
   );

   if (isLoading) return <LoadingSpinner />;

   return (
      <div className="w-8/12 mx-auto mt-3">
         {role === "seller" ? (
            <UnauthorizedView />
         ) : (
            <AuthorizedView
               role={role}
               filterSales={filterSales}
               setFilterSales={setFilterSales}
               filter={filter}
               setFilter={setFilter}
               branchData={branchData}
               totalQuantity={totalQuantity}
               totalSellAmount={totalSellAmount}
            />
         )}
      </div>
   );
};



export default SalesHistory;
