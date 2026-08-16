import { useAuth } from "../../context/authContext";
import "./SupplierCard.css";
import { API_URL } from "../../api/apiUrl";

const SupplierCard = ({ suppliers, setSupplier }) => {
  const {user}=useAuth()
  const handleDelete = async (supplierId) => {
  const res = await fetch(
    `${API_URL}/supplier/delete/${supplierId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await res.json();

  if (res.ok) {
    setSupplier((prev) =>
      prev.filter((supplier) => supplier._id !== supplierId)
    );
  } else {
    console.log(data.message);
  }
};
  return (
    <div className="supplier-card-container">
      <div className="supplier-header">
        <span>Supplier Name</span>
        <span>Address</span>
        <span>Phone</span>
        <span>Email</span>
        <span className="action-column">Actions</span>
      </div>

      <ol className="supplier-list">
        {suppliers.map((supplier) => (
          <li key={supplier._id} className="supplier-row">
            <span className="supplier-data">{supplier.name}</span>
            <span className="supplier-data">{supplier.address}</span>
            <span className="supplier-data">{supplier.contact?.phone || "N/A"}</span>
            <span className="supplier-data">{supplier.contact?.email || "N/A"}</span>
            <span className="action-column">
              {user?.role==='admin' &&
              <>
              <button 
                className="supplier-delete-btn" 
                onClick={() => handleDelete(supplier._id)}
              >
                Delete
              </button>
              </>
              }
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default SupplierCard;