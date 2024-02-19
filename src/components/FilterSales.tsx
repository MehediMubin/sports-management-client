const FilterSales = ({
   filter,
   setFilter,
}: {
   filter: string;
   setFilter: (value: string) => void;
}) => {
   return (
      <div className="my-4">
         <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-auto bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
         >
            <option value="all-time">All Time</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
         </select>
      </div>
   );
};

export default FilterSales;
