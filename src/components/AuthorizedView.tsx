import FilterBranch from "./FilterBranch";
import FilterSales from "./FilterSales";
import SalesCard from "./SalesCard";
import { DownloadSalesReportButton } from "./SalesReport";

const AuthorizedView = ({
   role,
   filterSales,
   setFilterSales,
   filter,
   setFilter,
   branchData,
   totalQuantity,
   totalSellAmount,
}) => (
   <>
      <div className="flex justify-between">
         <div className="flex space-x-4">
            <FilterSales filter={filterSales} setFilter={setFilterSales} />
            {role === "branchManager" ? (
               <select disabled>
                  <option>{branchData?.data || "all-branches"}</option>
               </select>
            ) : (
               <FilterBranch filter={filter} setFilter={setFilter} />
            )}
         </div>
         <DownloadSalesReportButton
            salesReport={{ totalQuantity, totalSellAmount }}
         />
      </div>
      <div className="flex justify-between gap-2 lg:gap-0">
         <SalesCard Title={"Total Quantity"} description={totalQuantity} />
         <SalesCard
            Title={"Total Sell Amount"}
            description={`$${totalSellAmount}`}
         />
      </div>
   </>
);

export default AuthorizedView;
