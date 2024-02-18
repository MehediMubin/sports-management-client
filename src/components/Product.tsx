import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteProductMutation } from "../redux/features/product/productApi";
import SellProduct from "./SellProduct";

import React from "react";

interface ProductProps {
   product: {
      _id: string;
      name?: string;
      price?: number;
      quantity?: number;
      image?: string;
   };
}

const Product: React.FC<ProductProps> = ({ product }) => {
   const { name, price, quantity, image } = product;
   const [deleteProduct, { isError }] = useDeleteProductMutation();

   const handleDelete = () => {
      deleteProduct(product._id);
      if (isError) {
         toast.error("Error deleting product", {
            duration: 2000,
         });
      } else {
         toast.success("Product deleted successfully!", {
            duration: 2000,
         });
      }
   };

   return (
      <div className="card w-auto bg-base-100 shadow-xl">
         <figure>
            <img src={image} alt="Shoes" />
         </figure>
         <div className="card-body">
            <h2 className="text-2xl font-bold text-gray-700">{name}</h2>
            <p className="text-2xl font-semibold text-orange-600">${price}</p>
            <p className="text-base font-medium text-green-700">
               Quantity: {quantity}
            </p>
            <div className="card-actions justify-end">
               <SellProduct productId={product._id} />
               <Link
                  to={`/create-variant/${product._id}`}
                  className="btn btn-success"
               >
                  Create Variant
               </Link>
               <Link
                  to={`/update-product/${product._id}`}
                  className="btn btn-primary"
               >
                  Edit
               </Link>
               <button onClick={handleDelete} className="btn btn-error">
                  Delete
               </button>
            </div>
         </div>
      </div>
   );
};

export default Product;
