import { useGetAllProductsQuery } from "../redux/features/product/productApi";

const FilterBranch = ({
   filter,
   setFilter,
}: {
   filter: string;
   setFilter: (value: string) => void;
}) => {
   const { data, isLoading } = useGetAllProductsQuery(undefined);
   const products = data?.data;

   if (isLoading) return <div>Loading...</div>;

   let uniqueBranches = [...new Set(products.map((product) => product.branch))];
   uniqueBranches.push("All Branches");
   uniqueBranches = uniqueBranches.sort();

   return (
      <div className="my-4">
         <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-auto bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
         >
            {uniqueBranches.map((branch, index) => (
               <option key={index} value={String(branch)}>
                  {String(branch)}
               </option>
            ))}
         </select>
      </div>
   );
};

export default FilterBranch;
