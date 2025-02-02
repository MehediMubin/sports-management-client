import { useGetAllProductsQuery } from "../redux/features/product/productApi";

interface Product {
   _id: string;
   name: string;
   price: number;
   quantity: number;
   image: string;
   type: string;
   manufacturer: string;
   size: string;
   material: string;
   color: string;
   condition: string;
   branch: string;
}

const FilterBranch = ({
   filter,
   setFilter,
}: {
   filter: string;
   setFilter: (value: string) => void;
}) => {
   const { data, isLoading } = useGetAllProductsQuery(undefined);
   const products = data?.data;

   if (isLoading) return null;

   let uniqueBranches = [
      ...new Set(products.map((product: Product) => product.branch)),
   ];
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
