import Layout from "../components/Layout/Layout"; // Adjust path to where you saved Layout.jsx
import Dashboard from "../pages/Dashboard/Dashboard";
import Products from "../pages/Products/Products";
import Suppliers from "../pages/Suppliers/Suppliers";
import Transaction from "../pages/Transaction/Transaction";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import SupplierForm from "../pages/SupplierForm/SupplierForm";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";
import CreateProduct from "../pages/CreateProduct/CreateProduct";
import EditProduct from "../pages/EditProduct/EditProduct";
import SellProduct from "../pages/SellProduct/SellProduct";
import EnterOtp from "../pages/EnterOtp/EnterOtp";
import SendOtp from "../pages/SendOtp/SendOtp";
import ResetPassword from "../pages/Resetpassword/ResetPassword";
import Settings from "../pages/Settings/Settings";
import Purchase from "../pages/Purchase/Purchase";

const routes = [
  {
    // Parent route containing the Navbar and spacing
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/suppliers",
        element: <Suppliers />,
      },
      {
        path: "/transaction",
        element: <Transaction />,
      },
      {
        path: "/supplier/add",
        element: <SupplierForm />,
      },
      {
        path: "/product/add",
        element: <CreateProduct />,
      },
      {
        path: "/product/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "/supplier/edit/:id",
        element: <SupplierForm />,
      },
      {
        path: "/product/sell/:id",
        element: <SellProduct />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/purchase",
        element: <Purchase />,
      },
    ],
  },
  
  // Standalone routes without the Navbar layout
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/enter-otp",
    element: <EnterOtp />,
  },
  {
    path: "/send-Otp",
    element: <SendOtp />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
];

export default routes;