import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar"; // Adjust path if needed
import "./Layout.css";

const Layout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;