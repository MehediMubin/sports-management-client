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
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="this-year">This Year</option>
         </select>
      </div>
   );
};

export default FilterSales;
