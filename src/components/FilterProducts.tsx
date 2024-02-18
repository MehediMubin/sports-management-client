/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const FilterProducts = ({
   setFilterData,
}: {
   setFilterData: (data: FieldValues) => void;
}) => {
   const [isFormVisible, setIsFormVisible] = useState(false);

   const { register, handleSubmit } = useForm();

   const onSubmit = (data: FieldValues) => {
      const filteredData = Object.fromEntries(
         Object.entries(data).filter(([_key, value]) => value !== "")
      );
      setFilterData(filteredData);
   };

   const handleFilterButtonClick = () => {
      setIsFormVisible(!isFormVisible);
   };

   return (
      <div className="w-full md:max-w-xs">
         <button
            onClick={handleFilterButtonClick}
            className="md:hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
         >
            Filter
         </button>

         <form
            onSubmit={handleSubmit(onSubmit)}
            className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col ${
               isFormVisible ? "block" : "hidden"
            } md:flex`}
         >
            <div className="mb-4 md:mb-0 md:mr-2 flex-1">
               <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="sportType"
               >
                  Sport Type
               </label>
               <select
                  {...register("type")}
                  name="type"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               >
                  <option value="">Select Sport Type</option>
                  <option value="soccer">Soccer</option>
                  <option value="basketball">Basketball</option>
                  <option value="tennis">Tennis</option>
               </select>
            </div>

            <div className="mb-4 md:mb-0 md:ml-2 flex-1">
               <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="brand"
               >
                  Brand
               </label>
               <select
                  {...register("manufacturer")}
                  name="manufacturer"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               >
                  <option value="">Select Brand</option>
                  <option value="puma">Puma</option>
                  <option value="adidas">Adidas</option>
               </select>
            </div>
            <div className="mb-4 md:mb-0 md:ml-2 flex-1">
               <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="size"
               >
                  Size
               </label>
               <input
                  {...register("size")}
                  name="size"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               />
            </div>

            <div className="mb-4 md:mb-0 md:ml-2 flex-1">
               <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
               >
                  Price Range
               </label>
               <div className="grid grid-cols-2 gap-2">
                  <input
                     {...register("minPrice")}
                     name="minPrice"
                     placeholder="Min Price"
                     type="number"
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <input
                     {...register("maxPrice")}
                     name="maxPrice"
                     placeholder="Max Price"
                     type="number"
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
               </div>
            </div>

            <div className="mb-4 md:mb-0 md:ml-2 flex-1">
               <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="material"
               >
                  Material
               </label>
               <select
                  {...register("material")}
                  name="material"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               >
                  <option value="">Select Material</option>
                  <option value="cotton">Cotton</option>
                  <option value="leather">Leather</option>
                  <option value="polyester">Polyester</option>
                  <option value="jersey">Jersey</option>
               </select>
            </div>

            <div className="mb-4 md:mb-0 md:ml-2 flex-1">
               <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="color"
               >
                  Color
               </label>
               <input
                  {...register("color")}
                  name="color"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               />
            </div>

            <div className="mb-4 md:mb-0 md:ml-2 flex-1">
               <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="condition"
               >
                  Condition
               </label>
               <select
                  {...register("condition")}
                  name="condition"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               >
                  <option value="">Select Condition</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
               </select>
            </div>

            <div className="mt-4">
               <button
                  type="submit"
                  className="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
               >
                  Submit
               </button>
            </div>
         </form>
      </div>
   );
};

export default FilterProducts;
