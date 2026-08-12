import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SupplierCard from "../../components/SupplierCard/SupplierCard";
import { getSupplierList } from "../../api/supplierApi";
import { useAuth } from "../../context/authContext";
import "./Suppliers.css"; // Added CSS import

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
    navigate('/supplier/add');
  };

  return (
    <div className="suppliers-page-container">
      <h2 className="page-title">Suppliers</h2>
      
      <SupplierCard suppliers={suppliers} setSupplier={setSupplier} />
      
      {user && (
        <div className="suppliers-actions-wrapper">
          <button className="add-supplier-btn" onClick={handleClick}>
            Add New Supplier
          </button>
        </div>
      )}
      
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default Suppliers;