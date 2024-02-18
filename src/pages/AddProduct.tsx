import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateProductMutation } from "../redux/features/product/productApi";

const AddProduct = () => {
   const { register, handleSubmit } = useForm();
   const [addProduct] = useCreateProductMutation();

   const onSubmit = async (data: FieldValues) => {
      const res = await addProduct(data);
      if ("error" in res && res.error) {
         toast.error("Error adding product", {
            duration: 2000,
         });
         return;
      } else {
         toast.success("Product added successfully!", {
            duration: 2000,
         });
      }
   };

   return (
      <div className="hero min-h-screen bg-base-200">
         <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
               <h1 className="text-5xl font-bold">Add Product!</h1>
               <p className="py-6">
                  Please fill out the form to add a new item to the inventory.
               </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
               <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Name</span>
                     </label>
                     <input
                        {...register("name")}
                        type="text"
                        placeholder="name"
                        className="input input-bordered"
                        required
                     />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Price</span>
                     </label>
                     <input
                        {...register("price")}
                        type="number"
                        step="0.01"
                        placeholder="price"
                        className="input input-bordered"
                        required
                     />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Quantity</span>
                     </label>
                     <input
                        {...register("quantity")}
                        type="number"
                        placeholder="quantity"
                        className="input input-bordered"
                        required
                     />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Image</span>
                     </label>
                     <input
                        {...register("image")}
                        type="text"
                        placeholder="image"
                        className="input input-bordered"
                        required
                     />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Type</span>
                     </label>
                     <input
                        {...register("type")}
                        type="text"
                        placeholder="type"
                        className="input input-bordered"
                        required
                     />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Manufacturer</span>
                     </label>
                     <input
                        {...register("manufacturer")}
                        type="text"
                        placeholder="manufacturer"
                        className="input input-bordered"
                        required
                     />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Size</span>
                     </label>
                     <input
                        {...register("size")}
                        type="text"
                        placeholder="size"
                        className="input input-bordered"
                        required
                     />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Material</span>
                     </label>
                     <input
                        {...register("material")}
                        type="text"
                        placeholder="material"
                        className="input input-bordered"
                        required
                     />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Color</span>
                     </label>
                     <input
                        {...register("color")}
                        type="text"
                        placeholder="color"
                        className="input input-bordered"
                        required
                     />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Condition</span>
                     </label>

                     <div className="flex justify-around">
                        <label className="flex justify-center items-center">
                           <input
                              {...register("condition")}
                              type="radio"
                              name="condition"
                              value="new"
                              className="radio radio-primary"
                           />
                           New
                        </label>

                        <label className="flex justify-center items-center">
                           <input
                              {...register("condition")}
                              type="radio"
                              name="condition"
                              value="used"
                              className="radio radio-primary"
                           />
                           Used
                        </label>
                     </div>
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn btn-primary">Submit</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default AddProduct;
