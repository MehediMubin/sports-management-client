/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
   const { register, handleSubmit, reset } = useForm();
   const [loginUser] = useLoginMutation();
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      try {
         const userInfo = {
            username: data.username,
            password: data.password,
         };
         const res = await loginUser(userInfo).unwrap();
         navigate("/");
         const user = verifyToken(res!.data.accessToken);
         dispatch(
            setUser({
               user,
               token: res!.data.accessToken,
            })
         );
         toast.success("Login successful!", {
            duration: 2000,
         });
         reset();
      } catch (error) {
         toast.error((error as any)?.data?.message, {
            duration: 2000,
         });
      }
   };

   return (
      <div className="hero min-h-screen bg-base-200">
         <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
               <h1 className="text-5xl font-bold">Login now!</h1>
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
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn btn-primary">Login</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Login;
