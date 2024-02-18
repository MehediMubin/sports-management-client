import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterMutation } from "../redux/features/auth/authApi";

const Register = () => {
   const { register, handleSubmit, reset } = useForm();
   const [registerUser] = useRegisterMutation();
   const navigate = useNavigate();

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      // change password to string
      console.log(data);
      const res = await registerUser(data);
      if ("data" in res) {
         reset();
         navigate("/login");
         toast.success("User registered successfully! Please login.", {
            duration: 2000,
         });
      } else {
         toast.error("Username already exists!,", {
            duration: 2000,
         });
      }
   };

   return (
      <div className="hero min-h-screen bg-base-200">
         <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
               <h1 className="text-5xl font-bold">Please Register!</h1>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
               <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Username</span>
                     </label>
                     <input
                        {...register("username")}
                        type="text"
                        placeholder="username"
                        className="input input-bordered"
                        required
                     />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <input
                        {...register("password")}
                        type="password"
                        placeholder="password"
                        className="input input-bordered"
                        required
                     />
                     <label className="label">
                        <Link
                           to="/login"
                           className="label-text-alt link link-hover"
                        >
                           Already have an account? Login here!
                        </Link>
                     </label>
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn btn-primary">Register</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Register;
