/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import FilterProducts from "../components/FilterProducts";
import Product from "../components/Product";
import {
   useDeleteAllProductsMutation,
   useDeleteMultipleProductsMutation,
   useGetAllProductsQuery,
} from "../redux/features/product/productApi";

const Dashboard = () => {
   const [filterData, setFilterData] = useState({});
   const { data } = useGetAllProductsQuery(filterData);
   const products = data?.data;
   const [deleteAllProducts, { isError }] = useDeleteAllProductsMutation();

   const deleteAllProductsHandler = async () => {
      await deleteAllProducts(undefined);
      if (isError) {
         toast.error("Something went wrong", {
            duration: 2000,
         });
      } else {
         toast.success("Product Deleted Successfully", {
            duration: 2000,
         });
      }
   };

   const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

   const handleCheckboxChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      productId: string
   ) => {
      if (e.target.checked) {
         setSelectedProducts([...selectedProducts, productId]);
      } else {
         setSelectedProducts(selectedProducts.filter((id) => id !== productId));
      }
   };

   const [deleteMultipleProducts] = useDeleteMultipleProductsMutation();

   const deleteMultipleProductsHandler = async () => {
      console.log(selectedProducts);
      const res = await deleteMultipleProducts(selectedProducts);
      console.log(res);
      if ("error" in res && res.error) {
         toast.error("Something went wrong", {
            duration: 2000,
         });
      } else {
         toast.success("Products Deleted Successfully", {
            duration: 2000,
         });
      }
   };

   const [searchTerm, setSearchTerm] = useState("");
   const [displayedProducts, setDisplayedProducts] = useState(products);

   useEffect(() => {
      setDisplayedProducts(products);
   }, [products]);

   return (
      <div className="w-11/12 mx-auto">
         <form
            className="w-full md:w-1/2 lg:w-1/3 mx-auto mt-3"
            onSubmit={(e) => {
               e.preventDefault();
               setDisplayedProducts(
                  products.filter((product: typeof Product) =>
                     product.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
               );
            }}
         >
            <input
               type="text"
               placeholder="Search Product"
               className="input input-bordered input-primary w-full max-w-xs"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-success ml-4">Search</button>
         </form>
         <div className="flex flex-col sm:flex-row my-3 mr-5 justify-end">
            <div className="flex flex-col sm:flex-row">
               <Link
                  to={"/add-product"}
                  className="btn btn-primary mb-2 sm:mb-0 sm:mr-4"
               >
                  Add Product
               </Link>
               {selectedProducts.length > 0 && (
                  <button
                     onClick={deleteMultipleProductsHandler}
                     className="btn btn-error mb-2 sm:mb-0 sm:mr-4"
                  >
                     Delete Selected Products
                  </button>
               )}
               <button
                  onClick={deleteAllProductsHandler}
                  className="btn btn-error mb-2 sm:mb-0"
               >
                  Delete All Products
               </button>
            </div>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-8">
            <div className="lg:col-span-1">
               <FilterProducts setFilterData={setFilterData} />
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
               {displayedProducts &&
                  displayedProducts.map(
                     (product: {
                        _id: any;
                        name?: string;
                        price?: number;
                        quantity?: number;
                        image?: string;
                     }) => (
                        <div key={product._id} className="relative">
                           <input
                              className="form-checkbox h-4 w-4 text-gray-600 absolute top-0 right-0 z-10"
                              type="checkbox"
                              onChange={(e) =>
                                 handleCheckboxChange(e, product._id)
                              }
                           />
                           <Product product={product}></Product>
                        </div>
                     )
                  )}
               {displayedProducts?.length === 0 && (
                  <h1 className="text-2xl text-center">No Products Found</h1>
               )}
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
