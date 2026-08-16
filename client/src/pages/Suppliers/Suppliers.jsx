import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SupplierCard from "../../components/SupplierCard/SupplierCard";
import { getSupplierList } from "../../api/supplierApi";
import { useAuth } from "../../context/authContext";
import "./Suppliers.css";

const Suppliers = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [message, setMessage] = useState();
  const [suppliers, setSupplier] = useState([]);

  const getSupplierHandler = async () => {
    getSupplierList(setSupplier, setMessage);
  };

  useEffect(() => {
    getSupplierHandler();
  }, []);

  const handleClick = () => {
    navigate("/supplier/add");
  };

  return (
    <div className="suppliers-page-container">

      {/* HEADER */}
      <div className="suppliers-header">

        <h2 className="page-title">
          Suppliers
        </h2>

        <button
            className="add-supplier-btn"
            onClick={handleClick}
          >
            Add New Supplier
          </button>

      </div>

      {/* SUPPLIERS */}
      <SupplierCard
        suppliers={suppliers}
        setSupplier={setSupplier}
      />

      {/* MESSAGE */}
      {message && (
        <p className="error-message">
          {message}
        </p>
      )}

    </div>
  );
};

export default Suppliers;