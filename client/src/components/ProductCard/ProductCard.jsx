import { useAuth } from "../../context/AuthContext";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api/apiUrl";

const ProductCard = ({ products, setProduct, showActions }) => {
  const {user}=useAuth()
  const navigate = useNavigate();

  const handleDelete = async (productId) => {
    const res = await fetch(`${API_URL}/product/delete/${productId}`, {
      method: "DELETE",
      credentials: "include",
    });
    
    const data = await res.json();
    
    if (res.ok) {
      setProduct((prev) => prev.filter((product) => product._id !== productId));
    } else {
      console.log(data.message);
    }
  };

  const handleUpdate = (productId) => {
    navigate(`/product/edit/${productId}`);
  };

  const handleSell = (productId) => {
    navigate(`/product/sell/${productId}`);
  };

  return (
    <div className="products-container">
      {products.map((product) => (
        <div className="product-card" key={product._id}>

          {/* COLUMN 1: Product Image */}
          <div className="product-image">
            <img src={product.image} alt={product.productname} />
          </div>

          {/* COLUMN 2: Product Information */}
          <div className="product-content">
            <h2>{product.productname}</h2>
            
            <p>
              <strong>Supplier:</strong> {product.supplier?.name || "N/A"}
            </p>
            
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            
            <p>
              <strong>Price:</strong> ৳{product.price}
            </p>
            <p>
              <strong>SKU</strong> {product.sku}
            </p>
          </div>

          {/* COLUMN 3: Warehouse Stock */}
          <div className="warehouse-stock-list">
            
            {/* NEW TWO-COLUMN HEADER */}
            <div className="warehouse-stock-header">
              <span>Warehouse</span>
              <span>Stock</span>
            </div>
            
            {product.warehouses?.map((warehouse) => (
              <div key={warehouse._id || warehouse.name} className="warehouse-stock">
                <span>{warehouse.name}</span>
                <span className={warehouse.stock === 0 ? "stock-out" : warehouse.stock <= 10 ? "stock-low" : "stock-good"}>
                  {warehouse.stock}
                </span>
              </div>
            ))}
          </div>

          {/* COLUMN 4: Actions */}
          {showActions && (
            <div className="product-actions">
              {user.role==='admin' &&
          <>
         <button className="edit-btn" onClick={() => handleUpdate(product._id)}>
                Edit
              </button>
          </>
        }
              {user.role==='admin' &&
          <>
         <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                Delete
              </button>
          </>
        }
              
              <button className="sell-btn" onClick={() => handleSell(product._id)}>
                Make Sale
              </button>
              
              
            </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default ProductCard;