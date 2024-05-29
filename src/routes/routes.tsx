import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/ProtectedRoute";
import AddProduct from "../pages/AddProduct";
import CreateVariant from "../pages/CreateVariant";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SalesHistory from "../pages/SalesHistory";
import UpdateProduct from "../pages/UpdateProduct";

const router = createBrowserRouter([
   {
      path: "/",
      element: (
         <ProtectedRoute>
            <App />
         </ProtectedRoute>
      ),
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/dashboard",
            element: <Dashboard />,
         },
         {
            path: "/sales-history",
            element: <SalesHistory />,
         },
         {
            path: "/add-product",
            element: <AddProduct />,
         },
         {
            path: "/update-product/:id",
            element: <UpdateProduct />,
         },
         {
            path: "/create-variant/:id",
            element: <CreateVariant />,
         },
      ],
   },
   {
      path: "/login",
      element: <Login />,
   },
]);

export default router;
