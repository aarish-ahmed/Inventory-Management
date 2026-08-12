import Navbar from "../components/Navbar/Navbar";
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

const routes = [
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Dashboard />
      </>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Navbar />
        <Products />
      </>
    ),
  },
  {
    path: "/suppliers",
    element: (
      <>
        <Navbar />
        <Suppliers />
      </>
    ),
  },
  {
    path: "/transaction",
    element: (
      <>
        <Navbar />
        <Transaction />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Signup />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/supplier/add",
    element: (
      <>
        <Navbar />
        <SupplierForm />
      </>
    ),
  },
  {
    path: "/product/add",
    element: (
      <>
        <Navbar />
        <CreateProduct />
      </>
    ),
  },
  {
    path: "/product/edit/:id",
    element: (
      <>
        <Navbar />
        <EditProduct />
      </>
    ),
  },
  {
    path: "/supplier/edit/:id",
    element: (
      <>
        <Navbar />
        <SupplierForm />
      </>
    ),
  },
  {
    path: "/product/sell/:id",
    element: (
      <>
        <Navbar />
        <SellProduct />
      </>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <>
        <VerifyEmail />
      </>
    ),
  },{
    path: "/enter-otp",
    element: (
      <>
        <EnterOtp/>
      </>
    ),
  },{
    path: "/send-Otp",
    element: (
      <>
        <SendOtp/>
      </>
    ),
  },{
    path: "/reset-password",
    element: (
      <>
        <ResetPassword/>
      </>
    ),
  },
];

export default routes;
